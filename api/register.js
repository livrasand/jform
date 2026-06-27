// JForm Registration API
// Genera un token opaco (jf_xxxx) y lo almacena en Neon Postgres
import { neon } from "@neondatabase/serverless";
import { randomBytes } from "crypto";

const ORIGIN = process.env.APP_ORIGIN || "https://jform.vercel.app";

function getDb() {
  return neon(process.env.DATABASE_URL);
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

  const { email, github, pgp_public_key } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const sql = await getDb();

    // Si el email ya tiene token, devolverlo (idempotente)
    const existing = await sql`
            SELECT token FROM jform_tokens WHERE email = ${email} LIMIT 1
        `;
    if (existing.length > 0) {
      return res.status(200).json({
        token: existing[0].token,
        email,
        github: github || null,
        pgp_enabled: !!pgp_public_key,
        message: "Token existente recuperado.",
      });
    }

    // Generar token opaco: jf_ + 16 bytes hex
    const token = "jf_" + randomBytes(16).toString("hex");

    await sql`
            INSERT INTO jform_tokens (token, email, github, pgp_public_key)
            VALUES (${token}, ${email}, ${github || null}, ${pgp_public_key || null})
        `;

    return res.status(200).json({
      token,
      email,
      github: github || null,
      pgp_enabled: !!pgp_public_key,
      message:
        "Agrega este token a tu archivo .jform como 'destination_id' para usar el relay de email de JForm.",
    });
  } catch (err) {
    console.error("JForm register error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
