import Nav from "../components/Nav.jsx";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { useState } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [showRegister, setShowRegister] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  function handleKeyDown(e) {
    if (e.key === "Escape") closeModals();
  }
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [pgpPublicKey, setPgpPublicKey] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regToken, setRegToken] = useState(null);
  const [copied, setCopied] = useState(false);

  async function handleRegister() {
    if (!email.trim()) {
      alert(t("register_email_required"));
      return;
    }
    setRegLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          github: github || null,
          pgp_public_key: pgpPublicKey || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setRegToken(data.token);
    } catch (err) {
      alert(err.message);
    } finally {
      setRegLoading(false);
    }
  }

  function closeModals() {
    setShowRegister(false);
    setShowInstructions(false);
  }

  const modalOverlay = {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  };

  const modalBox = {
    background: "rgba(255, 250, 250, 0.5)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: 18,
    padding: "10px",
    maxWidth: 600,
    width: "min(92vw,600px)",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.18)",
    border: "1px solid rgba(200,200,210,0.5)",
    color: "#111",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  };

  const closeBtn = {
    background: "rgba(0,0,0,0.07)",
    border: "none",
    color: "#444",
    fontSize: 15,
    cursor: "pointer",
    fontFamily: "inherit",
    lineHeight: 1,
    padding: "5px 8px",
    borderRadius: 8,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalTitle = {
    fontSize: "1.05rem",
    fontWeight: 700,
    marginBottom: 4,
    color: "#111",
  };

  const modalSub = {
    fontSize: "0.92rem",
    color: "rgba(0,0,0,0.55)",
    marginBottom: 18,
    lineHeight: 1.5,
  };

  const fieldLabel = {
    display: "block",
    fontSize: "0.88rem",
    color: "rgba(0,0,0,0.65)",
    marginBottom: 8,
    fontWeight: 600,
  };

  const fieldInput = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    color: "#111",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  };

  const submitBtn = {
    width: "100%",
    padding: "12px 0",
    borderRadius: 12,
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    marginTop: 8,
    opacity: regLoading ? 0.6 : 1,
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
  };

  const stepCard = {
    background: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    border: "1px solid rgba(0,0,0,0.07)",
    color: "#111",
  };

  const stepNum = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "#111",
    color: "#fff",
    fontSize: "0.78rem",
    fontWeight: 700,
    marginRight: 12,
    flexShrink: 0,
  };

  const codeBlock = {
    background: "#f0f0f2",
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: "0.86rem",
    fontFamily: '"SF Mono", "Fira Code", monospace',
    color: "#444",
    marginTop: 8,
    overflowX: "auto",
    whiteSpace: "nowrap",
    border: "1px solid rgba(0,0,0,0.07)",
  };

  const modalHeader = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 20px",
    background: "#f5f5f7",
    borderBottom: "1px solid rgba(0,0,0,0.07)",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  };

  const headerIcon = {
    background: "rgba(0,0,0,0.06)",
    border: "none",
    color: "#555",
    fontSize: 15,
    cursor: "pointer",
    padding: "5px 8px",
    borderRadius: 8,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const recipientsRow = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 20px",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  };

  const chip = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#fff",
    color: "#111",
    padding: "5px 10px 5px 5px",
    borderRadius: 22,
    boxShadow: "0 2px 8px rgba(0,0,0,0.09)",
    border: "1px solid rgba(0,0,0,0.08)",
    fontSize: "0.88rem",
  };

  const chipAvatar = {
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: "#ffdca8",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#5a3a10",
    fontWeight: 700,
    fontSize: "0.8rem",
    flexShrink: 0,
  };

  const chipText = {
    fontSize: "0.87rem",
    color: "#222",
  };

  const contentArea = {
    padding: "16px 20px",
    color: "#111",
    background: "#f5f5f7",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  };

  const attachmentsRow = {
    display: "flex",
    gap: 10,
    padding: "8px 20px 14px",
    marginTop: 0,
  };

  const attachmentCard = {
    background: "#fff",
    color: "#111",
    borderRadius: 12,
    padding: "8px 12px",
    minWidth: 150,
    display: "flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  };

  const footerBar = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    marginTop: 0,
  };

  const footerIconBtn = {
    background: "transparent",
    border: "none",
    color: "rgba(0,0,0,0.5)",
    fontSize: 18,
    cursor: "pointer",
    padding: 8,
    borderRadius: 8,
  };

  const primaryBtn = {
    background: "#111",
    color: "#fff",
    borderRadius: 12,
    padding: "9px 18px",
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
    fontFamily: "inherit",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
    boxShadow: "0 4px 14px rgba(0,0,0,0.28)",
  };

  const secondaryBtn = {
    background: "#fff",
    color: "#222",
    borderRadius: 10,
    padding: "8px 14px",
    border: "1px solid rgba(0,0,0,0.1)",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "clamp(0.8rem, 1.5vw, 0.92rem)",
    fontFamily: "inherit",
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
  };

  return (
    <>
      <style>{`
:focus-visible {
  outline: 2px solid #8d7dca;
  outline-offset: 2px;
}

@media (max-width: 640px) {
  .hero-container {
    left: 16px !important;
    right: 16px !important;
    max-width: 100% !important;
    top: 64px !important;
  }
  .hero-container h1 {
    font-size: clamp(1.5rem, 6vw, 2.2rem) !important;
  }
  .hero-buttons {
    flex-direction: column !important;
    gap: 8px !important;
  }
  .hero-buttons .nav-cta {
    width: 100% !important;
    text-align: center !important;
    box-sizing: border-box !important;
    white-space: normal !important;
  }
  .hero-buttons .nav-cta--outline {
    width: 100% !important;
    text-align: center !important;
    box-sizing: border-box !important;
  }
  .hero-buttons .nav-cta--primary {
    width: 100% !important;
    text-align: center !important;
    box-sizing: border-box !important;
  }
  .modal-content {
    padding: 12px 14px !important;
  }
  .modal-box {
    padding: 6px !important;
  }
  /* Register modal en mobile */
  .field-group textarea {
    font-size: 16px !important;
  }
  .field-group input {
    font-size: 16px !important;
  }
}
`}</style>
      <Nav />

      {/* Texto grande tipo hero — agregado sin tocar el diseño existente */}
      <div
        className="hero-container"
        style={{
          position: "fixed",
          top: "92px", // por debajo del nav
          left: "32px",
          right: "32px",
          maxWidth: "80%",
          zIndex: 0, // por debajo de .hero-center (que tiene z-index:1)
          pointerEvents: "none", // evitar bloquear clicks al centro
        }}
      >
        <h1
          style={{
            margin: 0,
            fontWeight: 700,
            lineHeight: 1.08,
            color: "rgba(255,255,255,0.97)",
            fontSize: "clamp(1.9rem, 4vw, 4.2rem)",
            letterSpacing: "-0.03em",
            marginBottom: 14,
            maxWidth: "22ch",
          }}
        >
          {t("hero_headline")}
        </h1>

        <p
          style={{
            margin: 0,
            fontWeight: 400,
            lineHeight: 1.55,
            color: "rgba(226,232,240,0.85)",
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            maxWidth: "48ch",
            marginBottom: 8,
          }}
        >
          {t("hero_desc")}
        </p>

        <p
          style={{
            margin: 0,
            color: "rgba(255,250,250,0.55)",
            fontSize: "clamp(0.85rem, 1.1vw, 0.97rem)",
            lineHeight: 1.65,
            maxWidth: "50ch",
            marginBottom: 24,
          }}
        >
          {t("hero_sub")}
        </p>

        <div
          className="hero-buttons"
          style={{
            display: "flex",
            gap: 12,
            pointerEvents: "auto",
          }}
        >
          <button
            type="button"
            className="nav-cta nav-cta--primary"
            onClick={() => setShowRegister(true)}
          >
            {t("nav_cta")}
          </button>
          <button
            type="button"
            className="nav-cta nav-cta--outline"
            onClick={() => navigate("/livrasand/contact")}
          >
            {t("nav_demo")}
          </button>
          <a
            className="nav-cta"
            href="https://github.com/livrasand/jform/blob/master/DOCS.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("nav_register")}
          </a>
        </div>
      </div>

      <ShaderGradientCanvas
        style={{
          width: "100%",
          height: "100dvh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <ShaderGradient
          animate="on"
          axesHelper="off"
          bgColor1="#000000"
          bgColor2="#000000"
          brightness={0.18}
          cAzimuthAngle={180}
          cDistance={2.8}
          cPolarAngle={80}
          cameraZoom={9.1}
          color1="#606080"
          color2="#8d7dca"
          color3="#212121"
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="on"
          lightType="3d"
          pixelDensity={1}
          positionX={0}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          shader="defaults"
          type="waterPlane"
          uAmplitude={0}
          uDensity={3}
          uFrequency={0}
          uSpeed={0.15}
          uStrength={1.5}
          uTime={8}
          wireframe={false}
        />
      </ShaderGradientCanvas>

      {/* Modal: Registro / Relay de email */}
      {showRegister && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("register_title")}
          style={modalOverlay}
          onKeyDown={handleKeyDown}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModals();
          }}
        >
          <div className="modal-box" style={modalBox}>
            <div style={modalHeader}>
              <div
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#111",
                }}
              >
                {t("register_title")}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button type="button" aria-label="Cerrar" style={closeBtn} onClick={closeModals}>
                  ✕
                </button>
              </div>
            </div>

            <div className="modal-content" style={contentArea}>
              {regToken ? (
                <>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      {t("register_token_title")}
                    </div>
                    <p style={modalSub}>{t("register_token_how")}</p>
                    <div
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        borderRadius: 10,
                        padding: "14px 16px",
                        border: "1px solid rgba(255,255,255,0.04)",
                        marginBottom: 12,
                      }}
                    >
                      <code
                        style={{
                          color: "#8d7dca",
                          fontFamily: '"SF Mono", "Fira Code", monospace',
                          fontSize: "0.88rem",
                        }}
                      >
                        {`  "destination": "${regToken}"`}
                      </code>
                    </div>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "rgba(255,250,250,0.5)",
                        lineHeight: 1.5,
                      }}
                    >
                      {t("register_token_remove")}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      {t("register_title")}
                    </div>
                    <p style={modalSub}>{t("register_sub")}</p>
                  </div>

                  <div className="field-group" style={{ marginBottom: 16 }}>
                    <label style={fieldLabel}>
                      {t("register_email_label")} *
                    </label>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(0,0,0,0.5)",
                        marginTop: -4,
                        marginBottom: 8,
                        lineHeight: 1.4,
                      }}
                    >
                      {t("register_email_desc")}
                    </p>
                    <input
                      style={fieldInput}
                      type="email"
                      placeholder={t("register_email_plh")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRegister();
                      }}
                    />
                  </div>

                  <div className="field-group" style={{ marginBottom: 20 }}>
                    <label style={fieldLabel}>
                      {t("register_github_label")}
                    </label>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(0,0,0,0.5)",
                        marginTop: -4,
                        marginBottom: 8,
                        lineHeight: 1.4,
                      }}
                    >
                      {t("register_github_desc")}
                    </p>
                    <input
                      style={fieldInput}
                      type="text"
                      placeholder={t("register_github_plh")}
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRegister();
                      }}
                    />
                  </div>

                  <div className="field-group" style={{ marginBottom: 20 }}>
                    <label style={fieldLabel}>{t("register_pgp_label")}</label>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(0,0,0,0.5)",
                        marginTop: -4,
                        marginBottom: 8,
                        lineHeight: 1.4,
                      }}
                    >
                      {t("register_pgp_desc")}
                    </p>
                    <textarea
                      style={{
                        ...fieldInput,
                        minHeight: 80,
                        fontFamily: '"SF Mono", "Fira Code", monospace',
                        fontSize: "0.8rem",
                      }}
                      placeholder={t("register_pgp_plh")}
                      value={pgpPublicKey}
                      onChange={(e) => setPgpPublicKey(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            <div style={footerBar}>
              <div
                style={{ display: "flex", gap: 4, alignItems: "center" }}
              ></div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {regToken ? (
                  <button
                    type="button"
                    style={primaryBtn}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(regToken);
                      } catch {
                        const el = document.createElement("textarea");
                        el.value = regToken;
                        document.body.appendChild(el);
                        el.select();
                        document.execCommand("copy");
                        document.body.removeChild(el);
                      }
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    {copied ? t("register_copied") : t("register_copy")}
                  </button>
                ) : (
                  <button
                    type="button"
                    style={primaryBtn}
                    onClick={handleRegister}
                    disabled={regLoading}
                  >
                    {regLoading ? t("register_loading") : t("register_btn")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Instrucciones para crear un formulario */}
      {showInstructions && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Crear formulario"
          style={modalOverlay}
          onKeyDown={handleKeyDown}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModals();
          }}
        >
          <div className="modal-box" style={modalBox}>
            <div style={modalHeader}>
              <div
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#111",
                }}
              >
                Crear formulario
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button type="button" aria-label="Cerrar" style={closeBtn} onClick={closeModals}>
                  ✕
                </button>
              </div>
            </div>

            <div className="modal-content" style={contentArea}>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#111",
                  marginBottom: 4,
                }}
              >
                Crea tu formulario en 4 pasos
              </div>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "rgba(0,0,0,0.5)",
                  marginTop: 0,
                  marginBottom: 16,
                }}
              >
                Sin servidores, sin configuración compleja. Solo GitHub.
              </p>

              {[
                {
                  n: "1",
                  title: "Haz Fork del repositorio",
                  desc: (
                    <>
                      Ve a{" "}
                      <code
                        style={{
                          background: "#f0f0f2",
                          padding: "1px 5px",
                          borderRadius: 4,
                        }}
                      >
                        github.com/livrasand/jform
                      </code>{" "}
                      y pulsa <strong>Fork</strong> para copiarlo a tu cuenta.
                    </>
                  ),
                },
                {
                  n: "2",
                  title: "Crea tu carpeta",
                  desc: (
                    <>
                      Dentro de tu fork, navega a{" "}
                      <code
                        style={{
                          background: "#f0f0f2",
                          padding: "1px 5px",
                          borderRadius: 4,
                        }}
                      >
                        /forms/
                      </code>{" "}
                      y crea una carpeta con tu nombre, ej.{" "}
                      <code
                        style={{
                          background: "#f0f0f2",
                          padding: "1px 5px",
                          borderRadius: 4,
                        }}
                      >
                        /forms/tudominio/
                      </code>
                      .
                    </>
                  ),
                },
                {
                  n: "3",
                  title: "Escribe tu archivo .jform",
                  desc: (
                    <>
                      Crea un archivo{" "}
                      <code
                        style={{
                          background: "#f0f0f2",
                          padding: "1px 5px",
                          borderRadius: 4,
                        }}
                      >
                        contacto.jform
                      </code>{" "}
                      con tus campos y cómo quieres recibir las respuestas.
                    </>
                  ),
                },
                {
                  n: "4",
                  title: "Abre un Pull Request",
                  desc: (
                    <>
                      Haz commit y abre un PR. Al aprobarse, tu formulario queda
                      en vivo en{" "}
                      <code
                        style={{
                          background: "#f0f0f2",
                          padding: "1px 5px",
                          borderRadius: 4,
                        }}
                      >
                        jform.app/tudominio/contacto
                      </code>
                      .
                    </>
                  ),
                },
              ].map((step) => (
                <div
                  key={step.n}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    marginBottom: 14,
                  }}
                >
                  <div style={stepNum}>{step.n}</div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.92rem",
                        color: "#111",
                        marginBottom: 3,
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.87rem",
                        color: "rgba(0,0,0,0.6)",
                        lineHeight: 1.5,
                      }}
                    >
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ ...stepCard, marginTop: 6 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    marginBottom: 10,
                    color: "#111",
                  }}
                >
                  Estructura básica de un{" "}
                  <code
                    style={{
                      background: "#f0f0f2",
                      padding: "1px 5px",
                      borderRadius: 4,
                    }}
                  >
                    .jform
                  </code>
                </div>
                <pre style={codeBlock}>{`{
  "title": "Mi Formulario",
  "fields": [
    { "name": "nombre", "type": "text", "required": true },
    { "name": "email",  "type": "email", "required": true }
  ],
  "transport": { "type": "email", "destination_id": "tu_token" }
}`}</pre>
              </div>

              <div style={{ marginTop: 14 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    color: "#111",
                    marginBottom: 8,
                  }}
                >
                  ¿Cómo quieres recibir las respuestas?
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {[
                    {
                      icon: "📧",
                      label: "Email (sin backend)",
                      desc: "JFORM envía las respuestas a tu correo. Solo necesitas tu token.",
                      code: `"transport": { "type": "email", "destination_id": "tu_token" }`,
                    },
                    {
                      icon: "🔗",
                      label: "Webhook (tu servidor)",
                      desc: "Las respuestas van directo a tu endpoint vía POST.",
                      code: `"transport": { "type": "webhook", "destination": "https://tuapi.com/endpoint" }`,
                    },
                    {
                      icon: "⚡",
                      label: "Third-Party (Formspree, Zapier…)",
                      desc: "Delega a servicios externos. Cero código requerido.",
                      code: `"transport": { "type": "webhook", "destination": "https://formspree.io/f/xxxx" }`,
                    },
                  ].map((m) => (
                    <div
                      key={m.label}
                      style={{
                        background: "#fff",
                        border: "1px solid rgba(0,0,0,0.07)",
                        borderRadius: 10,
                        padding: "10px 14px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 4,
                        }}
                      >
                        <span style={{ fontSize: 16 }}>{m.icon}</span>
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: "0.88rem",
                            color: "#111",
                          }}
                        >
                          {m.label}
                        </span>
                      </div>
                      <p
                        style={{
                          margin: "0 0 6px",
                          fontSize: "0.83rem",
                          color: "rgba(0,0,0,0.55)",
                        }}
                      >
                        {m.desc}
                      </p>
                      <pre
                        style={{
                          ...codeBlock,
                          marginTop: 0,
                          fontSize: "0.78rem",
                        }}
                      >
                        {m.code}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                  marginTop: 16,
                }}
              >
                <button
                  type="button"
                  style={primaryBtn}
                  onClick={() => {
                    /* next: generate workflow */
                  }}
                >
                  Generar workflow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
