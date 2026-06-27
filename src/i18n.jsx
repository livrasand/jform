import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  es: {
    lang: "es",
    htmlLang: "es",
    nav_faq: "faqs",
    nav_demo: "Ver demo",
    nav_cta: "Crear formulario con email relay",
    nav_register: "Crear formulario con webhook",
    nav_home: "inicio",
    nav_about: "acerca",
    hero_headline: "Formularios que viven en GitHub, no en un servidor",
    hero_desc: "una alternativa privada a Google Forms para desarrolladores",
    hero_sub:
      "Describe formularios en JSON, recibe respuestas por email o webhook. Sin servidores, sin tracking, solo Git.",
    nav_faq_title: "Tus preguntas respondidas",
    nav_faq1_q: "Que es JForm?",
    nav_faq1_a:
      "JForm es un Form-as-a-Protocol open-source: defines formularios en JSON y los desplegas al instante sin servidores. Los envios llegan por email o webhook y todo queda versionado en Git.",
    nav_faq2_q: "Como se crea un formulario?",
    nav_faq2_a:
      "Solo necesitas registrarte en /register para obtener tu token API. Luego envias un schema JSON con tus campos a la API y JForm genera el formulario y el endpoint de envio automaticamente.",
    nav_faq3_q: "Como llegan los datos del formulario?",
    nav_faq3_a:
      "Cada formulario tiene un email relay asociado: los datos se envian por email al dueno. Tambien soporta webhooks para integracion con servicios externos.",
    nav_faq4_q: "Es realmente serverless?",
    nav_faq4_a:
      "Si. Los formularios se sirven desde el frontend (React + Vite) y el backend usa funciones serverless. No necesitas provisionar ni mantener servidores.",
    nav_faq5_q: "Donde esta el codigo?",
    nav_faq5_a:
      "Todo el proyecto es open-source en GitHub: github.com/livrasand/jform. Puedes revisar el codigo, hacer fork y contribuir.",
    form_loading: "Cargando formulario...",
    form_notfound: "No se encontro el archivo .jform para este usuario.",
    form_invalid: "El archivo .jform tiene una estructura invalida.",
    form_noendpoint: "El archivo .jform no define un endpoint de envio.",
    form_err_timeout:
      "La solicitud tardó demasiado. Verifica tu conexión o intenta de nuevo.",
    form_submit: "Enviar datos",
    form_sending: "Enviando...",
    form_ok_title: "Enviado con exito",
    form_ok_desc: "",
    footer_disclaimer:
      "Este contenido no ha sido creado ni aprobado por JFORM.",
    footer_terms: "Terminos del Servicio",
    footer_privacy: "Politica de Privacidad",
    footer_suspicious: "Parece sospechoso este formulario?",
    footer_report: "Informe",
    form_err_prefix: "Error: ",
    form_err_http: "El servidor rechazo la peticion (HTTP ",
    form_err_suffix: ").",
    form_notfound_msg: "Asegurate de que el archivo exista en <code>forms/",
    form_notfound_suffix: ".jform</code>",
    register_title: "Configura el relay de email",
    register_sub:
      "Registra tu correo para recibir los envios de tus formularios directamente en tu bandeja de entrada, sin servidor propio.",
    register_email_label: "Tu correo electronico",
    register_email_plh: "tu@correo.com",
    register_email_required: "Email requerido",
    register_email_desc: "Aqui recibiras los envios de tus formularios.",
    register_github_label: "Usuario de GitHub (opcional)",
    register_github_plh: "tu-usuario",
    register_github_desc:
      "Para identificar tu cuenta y facilitar la colaboracion.",
    register_pgp_label: "Clave publica PGP (opcional)",
    register_pgp_plh: "-----BEGIN PGP PUBLIC KEY BLOCK-----",
    register_pgp_desc:
      "Si agregas tu clave PGP publica, los emails que recibas estaran cifrados end-to-end. Solo tu podras descifrarlos con tu clave privada.",
    register_btn: "Generar token",
    register_loading: "Generando...",
    register_token_title: "Tu token de owner",
    register_token_how: "Agrega esto a tu archivo .jform:",
    register_token_remove:
      "Elimina el campo 'endpoint' si lo tenias. JForm se encargara de enviarte los datos por email.",
    register_copy: "Copiar",
    register_copied: "Copiado!",
  },
  en: {
    lang: "en",
    htmlLang: "en",
    nav_faq: "FAQs",
    nav_demo: "See demo",
    nav_cta: "Create form with email relay",
    nav_register: "Create form with webhook",
    nav_home: "home",
    nav_about: "about",
    hero_headline: "Forms that live on GitHub, not on a server",
    hero_desc: "a private, developer-friendly alternative to Google Forms",
    hero_sub:
      "Describe forms in JSON, get responses by email or webhook. No servers, no tracking, just Git.",
    nav_faq_title: "Your questions answered",
    nav_faq1_q: "What is JForm?",
    nav_faq1_a:
      "JForm is an open-source Form-as-a-Protocol: define forms in JSON and deploy them instantly without servers. Submissions arrive by email or webhook, and everything is versioned in Git.",
    nav_faq2_q: "How do I create a form?",
    nav_faq2_a:
      "Register at /register to get your API token. Then send a JSON schema with your fields to the API, and JForm generates the form and submit endpoint automatically.",
    nav_faq3_q: "How do form submissions arrive?",
    nav_faq3_a:
      "Each form has an associated email relay: data is sent via email to the owner. It also supports webhooks for integration with external services.",
    nav_faq4_q: "Is it really serverless?",
    nav_faq4_a:
      "Yes. Forms are served from the frontend (React + Vite) and the backend uses serverless functions. No need to provision or maintain servers.",
    nav_faq5_q: "Where is the code?",
    nav_faq5_a:
      "The entire project is open-source on GitHub: github.com/livrasand/jform. You can review the code, fork it, and contribute.",
    form_loading: "Loading form...",
    form_notfound: "No .jform file found for this user.",
    form_invalid: "The .jform file has an invalid structure.",
    form_noendpoint: "The .jform file does not define a submit endpoint.",
    form_err_timeout:
      "The request took too long. Check your connection and try again.",
    form_submit: "Submit",
    form_sending: "Sending...",
    form_ok_title: "Sent successfully",
    form_ok_desc:
      "Your information was sent directly to the form creator, with no intermediaries.",
    footer_disclaimer: "This content was not created or approved by JFORM.",
    footer_terms: "Terms of Service",
    footer_privacy: "Privacy Policy",
    footer_suspicious: "Does this form look suspicious?",
    footer_report: "Report",
    form_err_prefix: "Error: ",
    form_err_http: "The server rejected the request (HTTP ",
    form_err_suffix: ").",
    form_notfound_msg: "Make sure the file exists at <code>forms/",
    form_notfound_suffix: ".jform</code>",
    register_title: "Set up email relay",
    register_sub:
      "Register your email to receive form submissions directly in your inbox. No server setup required.",
    register_email_label: "Your email",
    register_email_plh: "you@email.com",
    register_email_required: "Email is required",
    register_email_desc: "You will receive form submissions at this address.",
    register_github_label: "GitHub username (optional)",
    register_github_plh: "your-username",
    register_github_desc:
      "To identify your account and facilitate collaboration.",
    register_pgp_label: "PGP public key (optional)",
    register_pgp_plh: "-----BEGIN PGP PUBLIC KEY BLOCK-----",
    register_pgp_desc:
      "If you add your PGP public key, the emails you receive will be end-to-end encrypted. Only you can decrypt them with your private key.",
    register_btn: "Generate token",
    register_loading: "Generating...",
    register_token_title: "Your owner token",
    register_token_how: "Add this to your .jform file:",
    register_token_remove:
      "Remove the 'endpoint' field if you had one. JForm will send submissions to your email.",
    register_copy: "Copy",
    register_copied: "Copied!",
  },
};

const I18nContext = createContext();

function detectLang() {
  const stored = localStorage.getItem("jform-lang");
  if (stored && translations[stored]) return stored;
  const browser = (navigator.language || navigator.userLanguage || "es").split(
    "-",
  )[0];
  return translations[browser] ? browser : "es";
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLang);

  useEffect(() => {
    document.documentElement.lang = translations[lang].htmlLang;
  }, [lang]);

  function switchLang(next) {
    if (!translations[next]) return;
    setLang(next);
    localStorage.setItem("jform-lang", next);
  }

  function t(key) {
    return translations[lang][key] || translations.es[key] || key;
  }

  return (
    <I18nContext.Provider value={{ lang, switchLang, t, translations }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
