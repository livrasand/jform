import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import { useI18n } from "../i18n.jsx";

export default function Register() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  async function handleRegister() {
    if (!email.trim()) {
      alert(t("register_email_required"));
      return;
    }
    setLoading(true);
    // Simular generacion de token (mismo comportamiento que el original)
    setTimeout(() => {
      const generated =
        "jf_" +
        Math.random().toString(36).substring(2, 10) +
        Date.now().toString(36);
      setToken(generated);
      setLoading(false);
    }, 800);
  }

  if (token) {
    return (
      <>
        <Nav simple />
        <div className="register-wrap">
          <h2>{t("register_token_title")}</h2>
          <p>{t("register_token_how")}</p>
          <div className="token-box">
            <code id="token-code">{t("register_token_code")}</code>
            <p style={{ fontSize: "0.85rem", color: "var(--text-2)" }}>
              {t("register_token_remove")}
            </p>
          </div>
          <Link to="/" className="back-link">
            {t("register_back")}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav simple />
      <div className="register-wrap">
        <h2>{t("register_title")}</h2>
        <p>{t("register_sub")}</p>
        <div className="field-group">
          <label>{t("register_email_label")} *</label>
          <input
            type="email"
            placeholder={t("register_email_plh")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRegister();
            }}
          />
        </div>
        <div className="field-group">
          <label>{t("register_github_label")}</label>
          <input
            type="text"
            placeholder={t("register_github_plh")}
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRegister();
            }}
          />
        </div>
        <button type="submit" onClick={handleRegister} disabled={loading}>
          {loading ? t("register_loading") : t("register_btn")}
        </button>
      </div>
    </>
  );
}
