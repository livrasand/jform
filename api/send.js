// JForm Email Relay API
// Recibe submissions de formularios, resuelve el token en Neon y envia email via Resend
import { neon } from "@neondatabase/serverless";
import * as openpgp from "openpgp";
import Busboy from "busboy";

const ORIGIN = process.env.APP_ORIGIN || "https://jform.vercel.app";

async function resolveToken(token) {
  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`
        SELECT email, pgp_public_key FROM jform_tokens WHERE token = ${token} LIMIT 1
    `;
  return rows.length > 0 ? rows[0] : null;
}

async function encryptWithPgp(plaintext, armoredPublicKey) {
  const publicKey = await openpgp.readKey({ armoredKey: armoredPublicKey });
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: plaintext }),
    encryptionKeys: publicKey,
  });
  return encrypted;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Parsear body (puede llegar como JSON o FormData segun el frontend)
  let owner,
    formData = {},
    formTitle;

  try {
    const ct = req.headers["content-type"] || "";
    if (ct.includes("multipart/form-data")) {
      const attachments = [];
      let hitLimit = false;
      await new Promise((resolve, reject) => {
        const bb = Busboy({
          headers: req.headers,
          limits: {
            fileSize: 10 * 1024 * 1024, // 10 MB por archivo
            files: 5, // max 5 archivos
            fields: 100, // max 100 campos
            fieldSize: 256 * 1024, // 256 KB por campo
          },
        });
        bb.on("limit", (fieldName, type) => {
          if (!hitLimit) {
            hitLimit = true;
            console.warn(`Busboy limit hit: ${type} (${fieldName})`);
          }
        });
        bb.on("field", (name, value) => {
          if (name === "owner") owner = value;
          else if (name === "form_title") formTitle = value;
          else formData[name] = value;
        });
        bb.on("file", (name, stream, info) => {
          const { filename, mimeType } = info;
          const chunks = [];
          stream.on("data", (chunk) => chunks.push(chunk));
          stream.on("end", () => {
            const content = Buffer.concat(chunks);
            if (filename && content.length > 0) {
              attachments.push({
                filename,
                content: content.toString("base64"),
                type: mimeType || "application/octet-stream",
              });
              formData[name] = "[Archivo: " + filename + "]";
            }
          });
        });
        bb.on("close", resolve);
        bb.on("error", reject);
        // Puede llegar como stream o como Buffer pre-leído (dev middleware)
        if (Buffer.isBuffer(req.body)) {
          bb.write(req.body);
          bb.end();
        } else {
          req.pipe(bb);
        }
      });
      if (hitLimit) {
        return res.status(413).json({
          error:
            "Request too large: file, field, or field count limit exceeded",
        });
      }
      req._jformAttachments = attachments;
    } else if (ct.includes("application/json")) {
      // JSON — leer stream si req.body no está pre-parseado
      let parsed = req.body;
      if (!parsed || typeof parsed !== "object") {
        const raw = await new Promise((resolve, reject) => {
          const chunks = [];
          req.on("data", (chunk) => chunks.push(chunk));
          req.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
          req.on("error", reject);
        });
        parsed = JSON.parse(raw);
      }
      owner = parsed.owner;
      formTitle = parsed.form_title;
      const { owner: _, form_title: __, ...rest } = parsed;
      formData = rest;
    } else {
      // URL-encoded u otro — usar req.body si existe
      owner = req.body?.owner;
      formTitle = req.body?.form_title;
      const { owner: _, form_title: __, ...rest } = req.body || {};
      formData = rest;
    }
  } catch (e) {
    console.error("Body parse error:", e);
    return res.status(400).json({ error: "Invalid request body" });
  }

  if (!owner) {
    return res.status(400).json({ error: "Owner token is required" });
  }

  // Resolver token en Neon
  try {
    const record = await resolveToken(owner);

    if (!record) {
      return res.status(403).json({ error: "Invalid owner token" });
    }

    const { email, pgp_public_key } = record;

    // Token valido - enviar email
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      let html;
      if (pgp_public_key) {
        // Cifrar el contenido con la clave pública PGP del dueño
        const plaintext = buildEmailPlaintext(
          formTitle || "Form Submission",
          formData,
        );
        const encrypted = await encryptWithPgp(plaintext, pgp_public_key);
        html = buildEmailHtmlPgp(formTitle || "Form Submission", encrypted);
      } else {
        html = buildEmailHtml(formTitle || "Form Submission", formData);
      }

      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + resendKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "JForm <onboarding@resend.dev>",
          to: email,
          subject: formTitle || "Nueva submission de JForm",
          html: html,
          attachments:
            req._jformAttachments?.length > 0
              ? req._jformAttachments
              : undefined,
        }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        console.error("Resend error:", resp.status, errText);
        return res.status(500).json({ error: "Failed to send email" });
      }
    } else {
      // Modo desarrollo - log
      console.log("[JFORM RELAY] RESEND_API_KEY no configurado.", {
        to: email,
        data: formData,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Form data sent. The owner will receive it via email.",
    });
  } catch (err) {
    console.error("JForm relay error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
}

// Helper: construir HTML del email
export function buildEmailHtml(title, data) {
  var rows = "";
  for (var key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      var val = data[key];
      if (typeof val === "string" && val.length > 500) {
        val = val.substring(0, 500) + "... [truncated]";
      }
      rows +=
        '<tr><td style="padding:10px 14px;border:1px solid #e6dede;font-weight:600;background:#f8f4f4;vertical-align:top;white-space:nowrap;color:#1c1414">' +
        esc(key) +
        '</td><td style="padding:10px 14px;border:1px solid #e6dede;color:#6b6060">' +
        esc(val) +
        "</td></tr>";
    }
  }

  return (
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#fffafa;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif">' +
    '<div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:12px;border:1px solid #e6dede;overflow:hidden">' +
    '<div style="padding:32px;background:linear-gradient(135deg,#5b8def,#4a7ad5);text-align:center">' +
    '<div style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;background:rgba(255,255,255,0.2);font-size:1.2rem;font-weight:800;color:#fff;margin-bottom:8px">J</div>' +
    '<h1 style="margin:0;color:#fff;font-size:1.2rem;font-weight:600">' +
    esc(title) +
    "</h1>" +
    "</div>" +
    '<div style="padding:32px">' +
    '<p style="color:#6b6060;font-size:0.9rem;margin:0 0 20px">Recibiste una nueva submission desde JForm:</p>' +
    '<table style="border-collapse:collapse;width:100%;font-size:0.85rem">' +
    rows +
    "</table>" +
    "</div>" +
    '<div style="padding:16px 32px;border-top:1px solid #e6dede;text-align:center">' +
    '<p style="margin:0;font-size:0.75rem;color:#a09898">Enviado por <strong style="color:#6b6060">JForm</strong> &mdash; Formularios descentralizados y privados</p>' +
    "</div>" +
    "</div></body></html>"
  );
}

export function esc(s) {
  return typeof s !== "string"
    ? "" + s
    : s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// Construir texto plano para cifrar con PGP
export function buildEmailPlaintext(title, data) {
  var lines = [title, "---"];
  for (var key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      var val = data[key];
      if (typeof val === "string" && val.length > 500) {
        val = val.substring(0, 500) + "... [truncated]";
      }
      lines.push(key + ": " + val);
    }
  }
  lines.push("---");
  lines.push("Sent via JForm email relay (PGP encrypted)");
  return lines.join("\n");
}

// Email HTML para mensajes cifrados con PGP
export function buildEmailHtmlPgp(title, encryptedBlock) {
  return (
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#fffafa;font-family:monospace">' +
    '<div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:12px;border:1px solid #e6dede;overflow:hidden">' +
    '<div style="padding:32px;background:linear-gradient(135deg,#5b8def,#4a7ad5);text-align:center">' +
    '<div style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;background:rgba(255,255,255,0.2);font-size:1.2rem;font-weight:800;color:#fff;margin-bottom:8px">J</div>' +
    '<h1 style="margin:0;color:#fff;font-size:1.2rem;font-weight:600">' +
    esc(title) +
    " (PGP)" +
    "</h1>" +
    "</div>" +
    '<div style="padding:32px">' +
    '<p style="color:#6b6060;font-size:0.85rem;margin:0 0 16px">Este mensaje está cifrado con tu clave PGP pública. Descífralo con tu clave privada.</p>' +
    '<pre style="background:#f4f4f8;border:1px solid #ddd;border-radius:8px;padding:16px;font-size:0.75rem;white-space:pre-wrap;word-break:break-all;color:#333">' +
    esc(encryptedBlock) +
    "</pre>" +
    "</div>" +
    '<div style="padding:16px 32px;border-top:1px solid #e6dede;text-align:center">' +
    '<p style="margin:0;font-size:0.75rem;color:#a09898">Enviado por <strong style="color:#6b6060">JForm</strong> &mdash; Cifrado end-to-end con OpenPGP</p>' +
    "</div>" +
    "</div></body></html>"
  );
}
