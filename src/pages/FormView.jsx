import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { esc, attr } from "../utils.js";

export default function FormView() {
  const { t, lang } = useI18n();
  const { username, formId } = useParams();
  const [state, setState] = useState("loading"); // loading | form | success | error
  const [schema, setSchema] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!username || !formId) return;
    loadForm();
  }, [username, formId, lang]);

  function applyTheme(theme) {
    if (!theme) return;
    const r = document.documentElement;
    if (theme.colors) {
      r.style.setProperty(
        "--bg",
        theme.page_background || theme.colors.background_hex || "#fffafa",
      );
      r.style.setProperty(
        "--text",
        theme.colors.text_hex || theme.colors.text_hsl || "#1c1414",
      );
      r.style.setProperty("--accent", theme.colors.primary_hex || "#4a7cf7");
      r.style.setProperty(
        "--surface",
        theme.form_background || theme.colors.card_bg_hex || "#ffffff",
      );
      // Agregar variables faltantes para descripciones y bordes en modo oscuro
      const textColor = theme.colors.text_hex || theme.colors.text_hsl || "#1c1414";
      r.style.setProperty("--text-2", "rgba(240, 246, 252, 0.7)");
      r.style.setProperty("--text-3", "rgba(240, 246, 252, 0.5)");
      r.style.setProperty("--border", "rgba(255,255,255,0.1)");
      r.style.setProperty("--surface-2", "rgba(255,255,255,0.05)");
    } else {
      r.style.setProperty(
        "--bg",
        theme.page_background || theme.background || "#fffafa",
      );
      r.style.setProperty("--text", theme.text || "#1c1414");
      r.style.setProperty("--accent", theme.accent || "#4a7cf7");
      r.style.setProperty(
        "--surface",
        theme.form_background || theme.card_bg || "#ffffff",
      );
    }
  }

  async function loadForm() {
    setState("loading");
    const encUser = encodeURIComponent(username);
    const encForm = encodeURIComponent(formId);
    const userRepo = `https://raw.githubusercontent.com/${encUser}/jform/master/forms/${encUser}/${encForm}`;
    const centralRepo = `https://raw.githubusercontent.com/livrasand/jform/master/forms/${encUser}/${encForm}`;

    try {
      let res;
      // En desarrollo, intentar cargar localmente primero
      if (import.meta.env.DEV) {
        try {
          res = await fetch(`/forms/${username}/${formId}.jform`);
          if (res.ok) {
            const s = await res.json();
            const elems = s.elements || s.fields;
            if ((s.title || s.header?.title) && elems && Array.isArray(elems)) {
              applyTheme(s.theme);
              document.title = (s.header?.title || s.title) + " - JFORM";
              setSchema(s);
              setState("form");
              return;
            }
          }
        } catch (e) {
          // Fall through to GitHub
        }
      }

      res = await fetch(userRepo + "." + lang + ".jform");
      if (!res.ok) res = await fetch(userRepo + ".jform");
      if (!res.ok) res = await fetch(centralRepo + "." + lang + ".jform");
      if (!res.ok) res = await fetch(centralRepo + ".jform");
      if (!res.ok) throw new Error(t("form_notfound"));

      const s = await res.json();
      const fields = s.elements || s.fields;
      if ((!s.title && !s.header?.title) || !fields || !Array.isArray(fields))
        throw new Error(t("form_invalid"));

      applyTheme(s.theme);
      document.title = (s.header?.title || s.title) + " - JFORM";

      setSchema(s);
      const hasEndpoint =
        s.endpoint || (s.transport && s.transport.type === "email");
      if (!hasEndpoint) {
        setErrorMsg(t("form_noendpoint"));
        setState("error");
      } else {
        setState("form");
      }
    } catch (err) {
      setErrorMsg(err.message);
      setState("error");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    setSending(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      let r;
      if (schema.transport && schema.transport.type === "email") {
        // Email relay - enviar a /api/send
        fd.append("owner", schema.transport.destination);
        fd.append("form_title", schema.title || schema.header?.title || "Form");
        r = await fetch("/api/send", {
          method: "POST",
          body: fd,
          signal: controller.signal,
        });
      } else if (schema.transport && schema.transport.type === "webhook") {
        // Webhook directo
        r = await fetch(schema.transport.destination, {
          method: "POST",
          body: fd,
          signal: controller.signal,
        });
      } else if (schema.endpoint) {
        // Schema v1 - endpoint directo
        r = await fetch(schema.endpoint, {
          method: "POST",
          body: fd,
          signal: controller.signal,
        });
      } else {
        throw new Error(t("form_noendpoint"));
      }

      if (r.ok) {
        setState("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const errText = await r.text();
        throw new Error(
          t("form_err_http") +
            r.status +
            t("form_err_suffix") +
            (errText ? ": " + errText : ""),
        );
      }
    } catch (err) {
      if (err.name === "AbortError") {
        alert(
          t("form_err_prefix") +
            "La solicitud tardó demasiado. Verifica tu conexión o intenta de nuevo.",
        );
      } else {
        alert(t("form_err_prefix") + err.message);
      }
    } finally {
      clearTimeout(timeout);
      setSending(false);
    }
  }

  if (state === "loading") {
    return (
      <div className="form-wrap">
        <div className="loading">
          <div className="spinner"></div>
          <p>{t("form_loading")}</p>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div
        className="form-wrap"
        style={{ textAlign: "center", padding: "48px 32px" }}
      >
        <p className="error-msg">{esc(errorMsg)}</p>
        {errorMsg === t("form_notfound") && (
          <p
            style={{
              color: "var(--text-2)",
              fontSize: "0.85rem",
              marginTop: 12,
            }}
          >
            <span
              dangerouslySetInnerHTML={{ __html: t("form_notfound_msg") }}
            />
            {esc(username)}/{esc(formId)}
            <span
              dangerouslySetInnerHTML={{ __html: t("form_notfound_suffix") }}
            />
          </p>
        )}
        {errorMsg === t("form_noendpoint") && (
          <p
            style={{
              color: "var(--text-2)",
              fontSize: "0.85rem",
              marginTop: 12,
            }}
          >
            {errorMsg}
          </p>
        )}
      </div>
    );
  }

  if (state === "success") {
    const confirmMsg = schema?.settings?.confirmation_message;
    const formBgSuccess =
      schema?.theme?.form_background || "var(--surface, #ffffff)";
    const formBorderSuccess = schema?.theme?.colors?.border_cmyk
      ? undefined
      : "1px solid var(--border)";
    return (
      <div
        className="form-wrap"
        style={{
          textAlign: "center",
          padding: "48px 32px",
          background: formBgSuccess,
          border: formBorderSuccess,
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>✓</div>
        <h3
          style={{
            color: "var(--accent)",
            fontSize: "1.2rem",
            marginBottom: 8,
          }}
        >
          {confirmMsg ? esc(confirmMsg) : t("form_ok_title")}
        </h3>
        <p style={{ color: "var(--text-2)", lineHeight: 1.6 }}>
          {t("form_ok_desc")}
        </p>
      </div>
    );
  }

  const formBg = schema.theme?.form_background || "var(--surface, #ffffff)";
  const formBorder = schema.theme?.colors?.border_cmyk
    ? undefined
    : "1px solid var(--border)";

  return (
    <>
      <div
        className="form-wrap"
        style={{ background: formBg, border: formBorder }}
      >
        {schema.header && schema.header.title ? (
          <h2>{esc(schema.header.title)}</h2>
        ) : (
          <h2>{esc(schema.title)}</h2>
        )}
        {(schema.header && schema.header.subtitle) || schema.description ? (
          <p>{esc(schema.header?.subtitle || schema.description)}</p>
        ) : null}
        <form id="f" encType="multipart/form-data" onSubmit={handleSubmit}>
          {(schema.elements || schema.fields).map((f) => {
            if (!f.id || !f.type) return null;

            // Salto / separador
            if (f.type === "divider") {
              return (
                <hr
                  key={f.id}
                  style={{
                    border: "none",
                    borderTop: `${f.thickness || 1}px solid ${f.color || "var(--border)"}`,
                    margin: `${f.spacing || 16}px 0`,
                  }}
                />
              );
            }

            // Espacio en blanco
            if (f.type === "spacer") {
              return <div key={f.id} style={{ height: f.height || 24 }} />;
            }

            // Título de sección
            if (f.type === "section") {
              return (
                <div
                  key={f.id}
                  style={{ marginBottom: 8, marginTop: f.margin_top || 8 }}
                >
                  {f.label && (
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        margin: "0 0 4px",
                      }}
                    >
                      {esc(f.label)}
                    </h3>
                  )}
                  {f.description && (
                    <p
                      style={{
                        fontSize: "0.83rem",
                        color: "var(--text-2)",
                        margin: 0,
                      }}
                    >
                      {esc(f.description)}
                    </p>
                  )}
                </div>
              );
            }

            if (f.type === "image" || f.type === "video") {
              return (
                <div className="field-group" key={f.id}>
                  {f.type === "image" ? (
                    <img
                      src={f.url}
                      alt={f.alt_text || ""}
                      style={{ maxWidth: "100%", borderRadius: 8 }}
                    />
                  ) : (
                    <iframe
                      src={f.url}
                      style={{
                        width: "100%",
                        minHeight: 300,
                        borderRadius: 8,
                        border: "none",
                      }}
                      allowFullScreen
                    />
                  )}
                  {f.caption && (
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-2)",
                        marginTop: 8,
                      }}
                    >
                      {esc(f.caption)}
                    </p>
                  )}
                </div>
              );
            }

            // Bordes por lado opcionales
            const borderStyle =
              f.border_top || f.border_bottom || f.border_left || f.border_right
                ? {
                    borderTop: f.border_top || "none",
                    borderBottom: f.border_bottom || "none",
                    borderLeft: f.border_left || "none",
                    borderRight: f.border_right || "none",
                    paddingLeft: f.border_left ? 12 : undefined,
                  }
                : {};

            return (
              <div className="field-group" key={f.id} style={borderStyle}>
                <label htmlFor={f.id}>
                  {esc(f.label)}
                  {f.required ? <span className="required-mark">*</span> : ""}
                </label>
                {f.description && (
                  <span className="description">{esc(f.description)}</span>
                )}
                {renderField(f)}
              </div>
            );
          })}
          <button type="submit" disabled={sending}>
            {sending
              ? t("form_sending")
              : schema.settings?.submit_button_text || t("form_submit")}
          </button>
        </form>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "24px 16px 32px",
          fontSize: "0.78rem",
          color: "var(--text-2)",
          lineHeight: 2,
        }}
      >
        <p style={{ margin: "0 0 6px" }}>
          {t("footer_disclaimer")}
          {" · "}
          <a
            href="/terms"
            style={{ color: "var(--text)", textDecoration: "underline" }}
          >
            {t("footer_terms")}
          </a>
          {" · "}
          <a
            href="/privacy"
            style={{ color: "var(--text)", textDecoration: "underline" }}
          >
            {t("footer_privacy")}
          </a>
        </p>
        <p style={{ margin: "0 0 16px" }}>
          {t("footer_suspicious")}{" "}
          <a
            href="https://github.com/livrasand/jform/issues"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(0,0,0,0.55)", textDecoration: "underline" }}
          >
            {t("footer_report")}
          </a>
        </p>
        <img
          src="/jform-logo.svg"
          alt="JFORM"
          style={{
            height: 32,
            opacity: 0.5,
            filter: "invert(1)",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
    </>
  );
}

function RatingField({ f }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const stars = f.max_stars || 5;
  const name = attr(f.id);

  return (
    <div className="rating-group">
      {Array.from({ length: stars }, (_, i) => i + 1).map((v) => (
        <label
          key={v}
          className="rating-star"
          style={{
            color:
              v <= (hovered ?? selected ?? 0) ? "#f5a623" : "var(--border)",
          }}
          onMouseEnter={() => setHovered(v)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setSelected(v)}
        >
          <input
            type="radio"
            name={name}
            value={v}
            required={f.required || false}
            checked={selected === v}
            onChange={() => setSelected(v)}
            style={{ display: "none" }}
          />
          ★
        </label>
      ))}
    </div>
  );
}

function renderField(f) {
  const id = attr(f.id);
  const name = attr(f.id);
  const placeholder = attr(f.placeholder || "");

  if (f.type === "select") {
    return (
      <select id={id} name={name} required={f.required || false}>
        {f.options && f.options.length > 0
          ? f.options.map((o, i) => (
              <option key={i} value={attr(o.value)}>
                {esc(o.label)}
              </option>
            ))
          : null}
      </select>
    );
  }
  if (f.type === "textarea") {
    return (
      <textarea
        id={id}
        name={name}
        rows={f.rows || 4}
        placeholder={placeholder}
        required={f.required || false}
      />
    );
  }
  if (f.type === "file") {
    return (
      <input
        type="file"
        id={id}
        name={name}
        accept={f.accept || "*"}
        required={f.required || false}
      />
    );
  }
  if (f.type === "radio") {
    return (
      <div className="option-group">
        {(f.options || []).map((o, i) => (
          <label key={i} className="option-item">
            <input
              type="radio"
              name={name}
              value={attr(o.value)}
              required={f.required || false}
            />
            {esc(o.label)}
          </label>
        ))}
      </div>
    );
  }
  if (f.type === "checkbox") {
    return (
      <div className="option-group">
        {(f.options || []).map((o, i) => (
          <label key={i} className="option-item">
            <input type="checkbox" name={`${name}[]`} value={attr(o.value)} />
            {esc(o.label)}
          </label>
        ))}
      </div>
    );
  }
  if (f.type === "scale") {
    const min = f.min || 1;
    const max = f.max || 5;
    const steps = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    return (
      <div className="scale-group">
        {f.min_label && <span className="scale-label">{esc(f.min_label)}</span>}
        {steps.map((v) => (
          <label key={v} className="scale-option">
            <input
              type="radio"
              name={name}
              value={v}
              required={f.required || false}
            />
            {v}
          </label>
        ))}
        {f.max_label && <span className="scale-label">{esc(f.max_label)}</span>}
      </div>
    );
  }
  if (f.type === "rating") {
    return <RatingField f={f} />;
  }
  if (f.type === "radio_grid" || f.type === "checkbox_grid") {
    const inputType = f.type === "radio_grid" ? "radio" : "checkbox";
    return (
      <div style={{ overflowX: "auto" }}>
        <table className="grid-table">
          <thead>
            <tr>
              <th></th>
              {(f.columns || []).map((col) => (
                <th key={col.id}>{esc(col.label)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(f.rows || []).map((row) => (
              <tr key={row.id}>
                <td>{esc(row.label)}</td>
                {(f.columns || []).map((col) => (
                  <td key={col.id}>
                    <input
                      type={inputType}
                      name={
                        inputType === "radio"
                          ? `${name}_${row.id}`
                          : `${name}_${row.id}[]`
                      }
                      value={col.id}
                      required={(f.required && inputType === "radio") || false}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <input
      type={attr(f.type)}
      id={id}
      name={name}
      placeholder={placeholder}
      required={f.required || false}
    />
  );
}
