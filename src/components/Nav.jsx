import { useI18n } from "../i18n.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Nav({ simple, solid }) {
  const { t, lang, switchLang } = useI18n();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (solid) return;
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  // cierra el dropdown de FAQs al hacer click fuera o pulsar Esc
  useEffect(() => {
    if (!faqOpen) return;
    function onDocClick(e) {
      // si el click no fue dentro del dropdown ni en el botón, cerramos
      if (
        !e.target.closest ||
        (!e.target.closest(".nav-faq-dropdown") &&
          !e.target.closest(".nav-faq-toggle"))
      ) {
        setFaqOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setFaqOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [faqOpen]);

  // cierra el dropdown de About al hacer click fuera o pulsar Esc
  useEffect(() => {
    if (!aboutOpen) return;
    function onDocClick(e) {
      // si el click no fue dentro del dropdown ni en el botón, cerramos
      if (
        !e.target.closest ||
        (!e.target.closest(".nav-about-dropdown") &&
          !e.target.closest(".nav-about-toggle"))
      ) {
        setAboutOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setAboutOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [aboutOpen]);

  function scrollTo(id) {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      className={scrolled ? "scrolled" : ""}
      style={
        scrolled
          ? {}
          : simple || solid
          ? {
              "--text": "#1c1414",
              "--text-2": "rgba(28,20,20,0.55)",
              "--text-3": "rgba(28,20,20,0.3)",
              background: "#fffafa",
              borderBottom: "1px solid var(--border, #e5e0e0)",
            }
          : {
              "--text": "#fffafa",
              "--text-2": "rgba(255,250,250,0.8)",
              "--text-3": "rgba(255,250,250,0.4)",
            }
      }
    >
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img
          src="/jform-logo.svg"
          alt="JForm"
          className="logo-img"
          width="25px"
          style={simple || solid || scrolled ? { filter: "invert(1)" } : undefined}
        />
        JFORM
      </div>
      {simple ? (
        <ul className="nav-links" id="nav-links">
          <li>
            <div className="lang-switcher" style={simple ? { background: "#f0f0f2", border: "1px solid #d0d0d5" } : undefined}>
              <button
                className={lang === "es" ? "active" : ""}
                onClick={() => switchLang("es")}
                style={simple ? { color: "#1c1414", background: "transparent", border: "none" } : undefined}
              >
                ES
              </button>
              <span className="sep" style={simple ? { color: "rgba(28,20,20,0.55)" } : undefined}>|</span>
              <button
                className={lang === "en" ? "active" : ""}
                onClick={() => switchLang("en")}
                style={simple ? { color: "#1c1414", background: "transparent", border: "none" } : undefined}
              >
                EN
              </button>
            </div>
          </li>
        </ul>
      ) : (
        <>
          <ul className={`nav-links${menuOpen ? " open" : ""}`} id="nav-links">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                  setMenuOpen(false);
                }}
                style={{ color: "var(--text)" }}
              >
                {t("nav_home")}
              </a>
            </li>
            <li style={{ position: "relative" }}>
              <button
                className="nav-faq-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  setFaqOpen((v) => {
                    if (!v) setAboutOpen(false);
                    return !v;
                  });
                }}
                aria-expanded={faqOpen}
                aria-controls="nav-faq-dropdown"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                }}
              >
                {t("nav_faq")}
              </button>

              {faqOpen && (
                <div
                  id="nav-faq-dropdown"
                  className="nav-faq-dropdown"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    minWidth: 240,
                    maxWidth: 320,
                    background: "#12a0e8",
                    color: "#fff",
                    borderRadius: 12,
                    padding: "16px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    zIndex: 40,
                  }}
                >
                  <style>
                    {
                      ".nav-faq-dropdown details summary::-webkit-details-marker { display: none; } .nav-faq-dropdown details summary { list-style: none; } .nav-faq-dropdown details .faq-icon-open { display: none; } .nav-faq-dropdown details[open] .faq-icon-open { display: inline; } .nav-faq-dropdown details[open] .faq-icon-closed { display: none; }"
                    }
                  </style>
                  <div style={{ fontWeight: 700, marginBottom: 12 }}>
                    {t("nav_faq_title")}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <details
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        padding: 12,
                        borderRadius: 8,
                      }}
                    >
                      <summary
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          cursor: "pointer",
                          listStyle: "none",
                        }}
                      >
                        <svg
                          className="faq-icon-closed"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="m12 8.369l8.968 4.747l-.936 1.768L12 10.632l-8.032 4.252l-.936-1.768z"
                          />
                        </svg>
                        <svg
                          className="faq-icon-open"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="m12 15.632l8.968-4.748l-.936-1.768L12 13.368L3.968 9.116l-.936 1.768z"
                          />
                        </svg>
                        <span>{t("nav_faq1_q")}</span>
                      </summary>
                      <div
                        style={{ marginTop: 8, opacity: 0.95 }}
                        dangerouslySetInnerHTML={{ __html: t("nav_faq1_a") }}
                      />
                    </details>

                    <details
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        padding: 12,
                        borderRadius: 8,
                      }}
                    >
                      <summary
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          cursor: "pointer",
                          listStyle: "none",
                        }}
                      >
                        <svg
                          className="faq-icon-closed"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="m12 8.369l8.968 4.747l-.936 1.768L12 10.632l-8.032 4.252l-.936-1.768z"
                          />
                        </svg>
                        <svg
                          className="faq-icon-open"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="m12 15.632l8.968-4.748l-.936-1.768L12 13.368L3.968 9.116l-.936 1.768z"
                          />
                        </svg>
                        <span>{t("nav_faq2_q")}</span>
                      </summary>
                      <div
                        style={{ marginTop: 8, opacity: 0.95 }}
                        dangerouslySetInnerHTML={{ __html: t("nav_faq2_a") }}
                      />
                    </details>

                    <details
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        padding: 12,
                        borderRadius: 8,
                      }}
                    >
                      <summary
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          cursor: "pointer",
                          listStyle: "none",
                        }}
                      >
                        <svg
                          className="faq-icon-closed"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="m12 8.369l8.968 4.747l-.936 1.768L12 10.632l-8.032 4.252l-.936-1.768z"
                          />
                        </svg>
                        <svg
                          className="faq-icon-open"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="m12 15.632l8.968-4.748l-.936-1.768L12 13.368L3.968 9.116l-.936 1.768z"
                          />
                        </svg>
                        <span>{t("nav_faq3_q")}</span>
                      </summary>
                      <div
                        style={{ marginTop: 8, opacity: 0.95 }}
                        dangerouslySetInnerHTML={{ __html: t("nav_faq3_a") }}
                      />
                    </details>

                    <details
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        padding: 12,
                        borderRadius: 8,
                      }}
                    >
                      <summary
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          cursor: "pointer",
                          listStyle: "none",
                        }}
                      >
                        <svg
                          className="faq-icon-closed"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="m12 8.369l8.968 4.747l-.936 1.768L12 10.632l-8.032 4.252l-.936-1.768z"
                          />
                        </svg>
                        <svg
                          className="faq-icon-open"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="m12 15.632l8.968-4.748l-.936-1.768L12 13.368L3.968 9.116l-.936 1.768z"
                          />
                        </svg>
                        <span>{t("nav_faq4_q")}</span>
                      </summary>
                      <div
                        style={{ marginTop: 8, opacity: 0.95 }}
                        dangerouslySetInnerHTML={{ __html: t("nav_faq4_a") }}
                      />
                    </details>

                    <details
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        padding: 12,
                        borderRadius: 8,
                      }}
                    >
                      <summary
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          cursor: "pointer",
                          listStyle: "none",
                        }}
                      >
                        <svg
                          className="faq-icon-closed"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="m12 8.369l8.968 4.747l-.936 1.768L12 10.632l-8.032 4.252l-.936-1.768z"
                          />
                        </svg>
                        <svg
                          className="faq-icon-open"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="m12 15.632l8.968-4.748l-.936-1.768L12 13.368L3.968 9.116l-.936 1.768z"
                          />
                        </svg>
                        <span>{t("nav_faq5_q")}</span>
                      </summary>
                      <div
                        style={{ marginTop: 8, opacity: 0.95 }}
                        dangerouslySetInnerHTML={{ __html: t("nav_faq5_a") }}
                      />
                    </details>
                  </div>

                  <div style={{ height: 8 }} />
                </div>
              )}
            </li>
            <li style={{ position: "relative" }}>
              <button
                className="nav-about-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  // alterna el dropdown de About y cierra FAQs si se abre
                  setAboutOpen((v) => {
                    if (!v) setFaqOpen(false);
                    return !v;
                  });
                }}
                aria-expanded={aboutOpen}
                aria-controls="nav-about-dropdown"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                }}
              >
                {t("nav_about")}
              </button>

              {aboutOpen && (
                <div
                  id="nav-about-dropdown"
                  className="nav-about-dropdown"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: 320,
                    background: "#111",
                    color: "#fff",
                    borderRadius: 14,
                    padding: "16px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                    zIndex: 40,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 72,
                        height: 72,
                        borderRadius: 12,
                        overflow: "hidden",
                        background: "#222",
                        flex: "0 0 72px",
                      }}
                    >
                      <img
                        src="https://avatars.githubusercontent.com/u/104039397?v=4"
                        alt="profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, marginBottom: 8 }}>
                        👋 Hey there!
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.85)" }}>
                        I'm livrasand, Fullstack developer from 127.0.0.EARTH,
                        I'm coding in Python, JavaScript, TypeScript, Rust, Go
                        and open-source projects that prioritize privacy.
                      </div>
                    </div>
                  </div>

                  <div style={{ height: 12 }} />

                  <hr
                    style={{
                      border: "none",
                      height: 1,
                      background: "rgba(255,255,255,0.06)",
                      margin: "12px 0",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <a
                      href=""
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="medium"
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: "#fffafa",
                          mask: "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/medium.svg) center/contain no-repeat",
                          WebkitMask:
                            "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/medium.svg) center/contain no-repeat",
                        }}
                      />
                    </a>
                    <a
                      href="https://dev.to/livrasand"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="devdotto"
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: "#fffafa",
                          mask: "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/devdotto.svg) center/contain no-repeat",
                          WebkitMask:
                            "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/devdotto.svg) center/contain no-repeat",
                        }}
                      />
                    </a>
                    <a
                      href="https://www.reddit.com/user/livrasand/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="reddit"
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: "#fffafa",
                          mask: "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/reddit.svg) center/contain no-repeat",
                          WebkitMask:
                            "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/reddit.svg) center/contain no-repeat",
                        }}
                      />
                    </a>
                    <a
                      href="https://www.npmjs.com/~livrasand"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="npm"
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: "#fffafa",
                          mask: "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/npm.svg) center/contain no-repeat",
                          WebkitMask:
                            "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/npm.svg) center/contain no-repeat",
                        }}
                      />
                    </a>
                    <a
                      href="https://pypi.org/user/livrasand/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="pypi"
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: "#fffafa",
                          mask: "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/pypi.svg) center/contain no-repeat",
                          WebkitMask:
                            "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/pypi.svg) center/contain no-repeat",
                        }}
                      />
                    </a>
                    <a
                      href="https://news.ycombinator.com/user?id=livrasand"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="ycombinator"
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: "#fffafa",
                          mask: "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/ycombinator.svg) center/contain no-repeat",
                          WebkitMask:
                            "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/ycombinator.svg) center/contain no-repeat",
                        }}
                      />
                    </a>
                    <a
                      href="https://www.vbforums.com/member.php?308703-livrasand"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="vbforums"
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: "#fffafa",
                          mask: "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/dotnet.svg) center/contain no-repeat",
                          WebkitMask:
                            "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/dotnet.svg) center/contain no-repeat",
                        }}
                      />
                    </a>
                    <a
                      href="https://gitlab.com/livrasand"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="gitlab"
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: "#fffafa",
                          mask: "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/gitlab.svg) center/contain no-repeat",
                          WebkitMask:
                            "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/gitlab.svg) center/contain no-repeat",
                        }}
                      />
                    </a>
                    <a
                      href="https://packagecontrol.io/browse/authors/Livr%C3%A4do%20Sandoval"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="sublimetext"
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: "#fffafa",
                          mask: "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/sublimetext.svg) center/contain no-repeat",
                          WebkitMask:
                            "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/sublimetext.svg) center/contain no-repeat",
                        }}
                      />
                    </a>
                    <a
                      href="https://imgur.com/user/livrasand"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="imgur"
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: "#fffafa",
                          mask: "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/imgur.svg) center/contain no-repeat",
                          WebkitMask:
                            "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/imgur.svg) center/contain no-repeat",
                        }}
                      />
                    </a>
                    <a
                      href="https://open.spotify.com/user/livrado_alejandro"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="spotify"
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: "#fffafa",
                          mask: "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/spotify.svg) center/contain no-repeat",
                          WebkitMask:
                            "url(https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/spotify.svg) center/contain no-repeat",
                        }}
                      />
                    </a>
                  </div>

                  <div style={{ height: 8 }} />
                </div>
              )}
            </li>
            <li>
              <a
                href="/preview"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/preview");
                  setMenuOpen(false);
                }}
                style={{ color: "var(--text)" }}
              >
                editor
              </a>
            </li>
            <li>
              <a
                href="https://github.com/livrasand/jform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    fill="currentColor"
                    d="M5.884 18.653c-.3-.2-.558-.455-.86-.816a51 51 0 0 1-.466-.579c-.463-.575-.755-.841-1.056-.95a1 1 0 1 1 .675-1.882c.752.27 1.261.735 1.947 1.588c-.094-.117.34.427.433.539c.19.227.33.365.44.438c.204.137.588.196 1.15.14c.024-.382.094-.753.202-1.095c-2.968-.726-4.648-2.64-4.648-6.396c0-1.24.37-2.356 1.058-3.292c-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.582c.081-.024.127-.035.208-.047c.803-.124 1.937.17 3.415 1.096a11.7 11.7 0 0 1 2.687-.308c.912 0 1.819.104 2.684.308c1.477-.933 2.614-1.227 3.422-1.096q.128.02.218.05a1 1 0 0 1 .616.58c.487 1.216.52 2.296.302 3.19c.691.936 1.058 2.045 1.058 3.293c0 3.757-1.674 5.665-4.642 6.392c.125.415.19.878.19 1.38c0 .665-.002 1.299-.007 2.01c0 .19-.002.394-.005.706a1 1 0 0 1-.018 1.958c-1.14.227-1.984-.532-1.984-1.525l.002-.447l.005-.705c.005-.707.008-1.337.008-1.997c0-.697-.184-1.152-.426-1.361c-.661-.57-.326-1.654.541-1.751c2.966-.333 4.336-1.482 4.336-4.66c0-.955-.312-1.744-.913-2.404A1 1 0 0 1 17.2 6.19c.166-.414.236-.957.095-1.614l-.01.003c-.491.139-1.11.44-1.858.949a1 1 0 0 1-.833.135a9.6 9.6 0 0 0-2.592-.349c-.89 0-1.772.118-2.592.35a1 1 0 0 1-.829-.134c-.753-.507-1.374-.807-1.87-.947c-.143.653-.072 1.194.093 1.607a1 1 0 0 1-.189 1.045c-.597.655-.913 1.458-.913 2.404c0 3.172 1.371 4.328 4.322 4.66c.865.097 1.202 1.177.545 1.748c-.193.168-.43.732-.43 1.364v3.15c0 .985-.834 1.725-1.96 1.528a1 1 0 0 1-.04-1.962v-.99c-.91.061-1.661-.088-2.254-.485"
                  />
                </svg>
              </a>
            </li>
            <li>
              <div className="lang-switcher" style={solid ? { background: "#f0f0f2", border: "1px solid #d0d0d5" } : undefined}>
                <button
                  className={lang === "es" ? "active" : ""}
                  onClick={() => switchLang("es")}
                  style={solid ? { color: "#1c1414", background: "transparent", border: "none" } : undefined}
                >
                  ES
                </button>
                <span className="sep" style={solid ? { color: "rgba(28,20,20,0.55)" } : undefined}>|</span>
                <button
                  className={lang === "en" ? "active" : ""}
                  onClick={() => switchLang("en")}
                  style={solid ? { color: "#1c1414", background: "transparent", border: "none" } : undefined}
                >
                  EN
                </button>
              </div>
            </li>
          </ul>
          <button
            className="nav-mobile-toggle"
            onClick={() => setMenuOpen((v) => !v)}
          >
            &#9776;
          </button>
        </>
      )}
    </nav>
  );
}
