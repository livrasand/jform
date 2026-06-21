import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  es: {
    lang: "es",
    htmlLang: "es",
    nav_como: "Como funciona",
    nav_carac: "Caracteristicas",
    nav_usos: "Casos de uso",
    nav_faq: "faqs",
    nav_github: "GitHub",
    nav_demo: "Ver demo",
    nav_cta: "Crear formulario con email relay",
    nav_register: "Crear formulario con webhook",
    nav_home: "inicio",
    nav_about: "acerca",
    hero_desc:
      "es un Form-as-a-Protocol open-source basado en JSON que permite desplegar formularios — sin servidores, ni telemetría, ni bases de datos centralizadas, con envio por email o webhook y versionado nativo en Git.",
    nav_faq_title: "Your questions answered",
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
    hero_badge: "Open source  Sin servidor  Privado",
    hero_title:
      'Tus formularios <span class="highlight">sin base de datos</span>',
    hero_sub:
      "Crea cualquier formulario con un solo archivo JSON en GitHub. Sin servidores, sin tracking, sin vendor lock-in. Los datos van directo a tu backend.",
    hero_btn1: "Crear formulario",
    hero_btn2: "Como funciona",
    hero_btn3: "Ver en GitHub",
    hero_search_plh: "usuario/formulario (ej: livrasand/contact)",
    hero_search_btn: "Abrir",
    hero_hint:
      "Escribe <code>usuario/formulario</code>  <code>jform.vercel.app/livrasand/contact</code>",
    hero_stat1: "Cero infraestructura",
    hero_stat2: "Cero tracking",
    hero_stat3: "1 JSON = 1 formulario",
    steps_label: "Proceso",
    steps_title: "Como funciona",
    steps_sub:
      "Tres pasos simples para tener tu formulario online, sin infraestructura.",
    step1_title: "Crea tu archivo .jform",
    step1_desc:
      "Escribi un JSON con los campos de tu formulario, el tema visual y el endpoint donde queres recibir los datos.",
    step2_title: "Fork y publica",
    step2_desc:
      "Hace fork de este repo y crea <code>forms/tuusuario/tuformulario.jform</code>. El motor busca primero en tu fork, luego en el repo central.",
    step3_title: "Comparti el enlace",
    step3_desc:
      "Ya esta. Cualquier persona puede acceder a <code>jform.vercel.app/tuusuario/formulario</code> y completar tu formulario.",
    feat_label: "Caracteristicas",
    feat_title: "Crea, publica y recibilos. Sin infraestructura.",
    feat_sub:
      "JForm convierte un archivo JSON en un formulario funcional. Sin plataformas, sin bases de datos, sin limites.",
    feat1_title: "Sin base de datos",
    feat1_desc:
      "Tu formulario es un archivo JSON en GitHub. No hay servidor central, no hay vendor lock-in. Tu configuracion vive con tu codigo.",
    feat2_title: "Cero tracking",
    feat2_desc:
      "Sin cookies, sin analytics, sin telemetria. Privacidad real desde el primer byte. No almacenamos nada, solo renderizamos.",
    feat3_title: "Subida de archivos",
    feat3_desc:
      "Soporte nativo para archivos adjuntos via <code>multipart/form-data</code>. Los archivos van directo a tu backend, sin intermediarios.",
    feat4_title: "Temas personalizables",
    feat4_desc:
      "Cada formulario tiene su propio tema visual definido en el JSON. Colores, fondos, acentos. Sin CSS, sin esfuerzo.",
    feat5_title: "Sin dependencias",
    feat5_desc:
      "Nada que instalar. Un solo archivo HTML que funciona en cualquier navegador. Sin frameworks, sin npm, sin build steps.",
    feat6_title: "Open source",
    feat6_desc:
      "Codigo 100% publico en GitHub. Auditalo, forkearlo, contribui. Transparencia absoluta, cero caja negra.",
    cases_label: "Usos",
    cases_title: "Ideas para tu formulario",
    cases_sub:
      "Cualquier tipo de formulario que quieras publicar sin atarte a una plataforma.",
    case1_title: "Formulario de contacto",
    case1_desc:
      "Recibi mensajes directamente desde tu sitio web sin servicios de terceros. Los datos llegan a tu propio backend.",
    case2_title: "Encuestas y feedback",
    case2_desc:
      "Recopila opiniones de usuarios sin exponer sus datos a plataformas de terceros con fines publicitarios.",
    case3_title: "Solicitudes y pedidos",
    case3_desc:
      "Recibi solicitudes de presupuesto, pedidos o reservas directamente en tu correo o sistema interno.",
    case4_title: "Registro a eventos",
    case4_desc:
      "Crea un formulario de inscripcion con subida de archivos para CVs, portfolios o documentos adjuntos.",
    faq_label: "Preguntas frecuentes",
    faq_title: "Todo lo que necesitas saber",
    faq_sub: "Respuestas rapidas a las dudas mas comunes.",
    faq1_q: "Como se crea un archivo .jform?",
    faq1_a:
      'Creas un archivo JSON con los campos que quieras (texto, email, select, file, etc.), el tema visual y el endpoint donde recibir los datos. Hace fork de este repo, crea <code>forms/tuusuario/miformulario.jform</code> y enviame un PR. Tambien podes alojarlo en tu propio fork. Usa el <a href="https://github.com/livrasand/jform/blob/main/forms/livrasand/contact.jform" target="_blank">ejemplo .jform</a> como base.',
    faq2_q: "Donde se almacenan los datos del formulario?",
    faq2_a:
      "En ningun lado de JForm. Los datos se envian directamente desde el navegador del usuario al endpoint que definiste en tu archivo .jform. JForm es solo el motor de renderizado, no almacena absolutamente nada.",
    faq3_q: "Quien puede ver mis formularios?",
    faq3_a:
      "Cualquier persona que conozca la URL <code>jform.vercel.app/tuusuario/miformulario</code>. Como el archivo .jform vive en un repositorio publico de GitHub (el tuyo o el central), es accesible publicamente por diseno. No uses JForm para datos sensibles sin el cifrado adecuado en tu backend.",
    faq4_q: "Necesito un servidor para recibir los datos?",
    faq4_a:
      'Si, necesitas un endpoint HTTP que reciba las peticiones POST con los datos. Puede ser un servidor en PythonAnywhere, Railway, tu propio VPS, o incluso una funcion serverless en Vercel, Netlify o Cloudflare Workers. En el repositorio hay un <a href="https://github.com/livrasand/jform/blob/main/backend/receiver.py" target="_blank">ejemplo en Flask</a>.',
    faq5_q: "JForm es realmente gratuito?",
    faq5_a:
      "Si, completamente gratuito y open source. El frontend se sirve desde Vercel en su capa gratuita. Vos solo pagas tu repositorio de GitHub (gratuito) y el backend donde recibas los datos (el que vos elijas). Sin costos ocultos, sin planes premium, sin sorpresas.",
    cta_title: "Crea tu formulario ahora",
    cta_sub:
      "No necesitas registrarte, instalar nada ni pagar. Solo un archivo JSON y GitHub.",
    cta_plh: "Tu usuario de GitHub",
    cta_btn: "Probar gratis",
    footer_brand:
      "Formularios descentralizados, privados y sin servidor. Open source bajo licencia MIT.",
    footer_producto: "Producto",
    footer_recursos: "Recursos",
    footer_comunidad: "Comunidad",
    footer_como: "Como funciona",
    footer_carac: "Caracteristicas",
    footer_usos: "Casos de uso",
    footer_faq: "FAQ",
    footer_schema: "Schema .jform",
    footer_ejemplo: "Ejemplo .jform",
    footer_backend: "Backend ejemplo",
    footer_github: "GitHub",
    footer_bug: "Reportar bug",
    footer_disc: "Discussions",
    footer_copy: "\u00a9 2026 JForm. Software libre y open source.",
    form_loading: "Cargando formulario...",
    form_notfound: "No se encontro el archivo .jform para este usuario.",
    form_invalid: "El archivo .jform tiene una estructura invalida.",
    form_noendpoint: "El archivo .jform no define un endpoint de envio.",
    form_submit: "Enviar datos",
    form_sending: "Enviando...",
    form_ok_title: "Enviado con exito",
    form_ok_desc: "",
    footer_disclaimer: "Este contenido no ha sido creado ni aprobado por JFORM.",
    footer_contact: "Contactar con el propietario del formulario",
    footer_terms: "Términos del Servicio",
    footer_privacy: "Política de Privacidad",
    footer_suspicious: "¿Parece sospechoso este formulario?",
    footer_report: "Informe",
    form_err_prefix: "Error: ",
    form_err_http: "El servidor rechazo la peticion (HTTP ",
    form_err_suffix: ").",
    form_notfound_msg: "Asegurate de que el archivo exista en <code>forms/",
    form_notfound_suffix: ".jform</code>",
    register_title: "Configura el relay de email",
    register_sub:
      "Registra tu correo para recibir los envíos de tus formularios directamente en tu bandeja de entrada, sin servidor propio.",
    register_email_label: "Tu correo electronico",
    register_email_plh: "tu@correo.com",
    register_email_required: "Email requerido",
    register_email_desc: "Aquí recibirás los envíos de tus formularios.",
    register_github_label: "Usuario de GitHub (opcional)",
    register_github_plh: "tu-usuario",
    register_github_desc: "Para identificar tu cuenta y facilitar la colaboración.",
    register_pgp_label: "Clave pública PGP (opcional)",
    register_pgp_plh: "-----BEGIN PGP PUBLIC KEY BLOCK-----",
    register_pgp_desc: "Si agregas tu clave PGP pública, los emails que recibas estarán cifrados end-to-end. Solo tú podrás descifrarlos con tu clave privada.",
    register_btn: "Generar token",
    register_loading: "Generando...",
    register_error: "Error al generar el token. Intenta de nuevo.",
    register_token_title: "Tu token de owner",
    register_token_how: "Agrega esto a tu archivo .jform:",
    register_token_code: '  "owner": "TU_TOKEN_AQUI"',
    register_token_remove:
      "Elimina el campo 'endpoint' si lo tenias. JForm se encargara de enviarte los datos por email.",
    register_back: "Volver al inicio",
    register_copy: "Copiar",
    register_copied: "Copiado!",
  },
  en: {
    lang: "en",
    htmlLang: "en",
    nav_como: "How it works",
    nav_carac: "Features",
    nav_usos: "Use cases",
    nav_faq: "faqs",
    nav_github: "GitHub",
    nav_demo: "See demo",
    nav_cta: "Read the Documentation",
    nav_register: "Create my form",
    nav_home: "home",
    nav_about: "about",
    hero_desc:
      "is an open-source Form-as-a-Protocol based on JSON that lets you deploy forms — no servers, no telemetry, no centralized databases, with email or webhook delivery and native Git versioning.",
    nav_faq_title: "Your questions answered",
    nav_faq1_q: "What is JForm?",
    nav_faq1_a:
      "JForm is an open-source Form-as-a-Protocol: you define forms in JSON and deploy them instantly without servers. Submissions arrive by email or webhook, and everything is versioned in Git.",
    nav_faq2_q: "How do I create a form?",
    nav_faq2_a:
      "Just register at /register to get your API token. Then send a JSON schema with your fields to the API, and JForm generates the form and submit endpoint automatically.",
    nav_faq3_q: "How do form submissions arrive?",
    nav_faq3_a:
      "Each form has an associated email relay: data is sent via email to the owner. It also supports webhooks for integration with external services.",
    nav_faq4_q: "Is it really serverless?",
    nav_faq4_a:
      "Yes. Forms are served from the frontend (React + Vite) and the backend uses serverless functions. No need to provision or maintain servers.",
    nav_faq5_q: "Where is the code?",
    nav_faq5_a:
      "The entire project is open-source on GitHub: github.com/livrasand/jform. You can review the code, fork it, and contribute.",
    hero_badge: "Open source  No server  Private",
    hero_title: 'Your forms <span class="highlight">without a database</span>',
    hero_sub:
      "Create any form with a single JSON file on GitHub. No servers, no tracking, no vendor lock-in. Data goes straight to your backend.",
    hero_btn1: "Create form",
    hero_btn2: "How it works",
    hero_btn3: "View on GitHub",
    hero_search_plh: "user/form (e.g.: livrasand/contact)",
    hero_search_btn: "Open",
    hero_hint:
      "Type <code>user/form</code>  <code>jform.vercel.app/livrasand/contact</code>",
    hero_stat1: "Zero infra",
    hero_stat2: "Zero tracking",
    hero_stat3: "1 JSON = 1 form",
    steps_label: "Process",
    steps_title: "How it works",
    steps_sub:
      "Three simple steps to get your form online, no infrastructure needed.",
    step1_title: "Create your .jform file",
    step1_desc:
      "Write a JSON with your form fields, theme, and the endpoint where you want to receive the data.",
    step2_title: "Fork and publish",
    step2_desc:
      "Fork this repo and create <code>forms/youruser/yourform.jform</code>. The engine looks in your fork first, then the central repo.",
    step3_title: "Share the link",
    step3_desc:
      "Done. Anyone can visit <code>jform.vercel.app/youruser/yourform</code> and fill out your form.",
    feat_label: "Features",
    feat_title: "Create, publish, receive. No infra needed.",
    feat_sub:
      "JForm turns a JSON file into a working form. No platforms, no databases, no limits.",
    feat1_title: "No database",
    feat1_desc:
      "Your form is a JSON file on GitHub. No central server, no vendor lock-in. Your config lives with your code.",
    feat2_title: "Zero tracking",
    feat2_desc:
      "No cookies, analytics, or telemetry. Real privacy from the first byte. We store nothing, we only render.",
    feat3_title: "File uploads",
    feat3_desc:
      "Native file attachment support via <code>multipart/form-data</code>. Files go straight to your backend, no middlemen.",
    feat4_title: "Custom themes",
    feat4_desc:
      "Each form has its own visual theme in the JSON. Colors, backgrounds, accents. No CSS, no effort.",
    feat5_title: "No dependencies",
    feat5_desc:
      "Nothing to install. A single HTML file that works in any browser. No frameworks, no npm, no build steps.",
    feat6_title: "Open source",
    feat6_desc:
      "100% public code on GitHub. Audit it, fork it, contribute. Full transparency, zero black box.",
    cases_label: "Use cases",
    cases_title: "Ideas for your form",
    cases_sub:
      "Any kind of form you want to publish without being tied to a platform.",
    case1_title: "Contact form",
    case1_desc:
      "Receive messages directly from your website without third-party services. Data goes to your own backend.",
    case2_title: "Surveys & feedback",
    case2_desc:
      "Collect user opinions without exposing their data to third-party platforms for advertising purposes.",
    case3_title: "Orders & requests",
    case3_desc:
      "Receive quotes, orders or bookings directly in your email or internal system.",
    case4_title: "Event registration",
    case4_desc:
      "Create a registration form with file uploads for CVs, portfolios, or attachments.",
    faq_label: "FAQ",
    faq_title: "Everything you need to know",
    faq_sub: "Quick answers to the most common questions.",
    faq1_q: "How do I create a .jform file?",
    faq1_a:
      'Create a JSON file with your desired fields (text, email, select, file, etc.), the visual theme, and the endpoint to receive data. Fork this repo, create <code>forms/youruser/myform.jform</code> and send a PR. You can also host it in your own fork. Use the <a href="https://github.com/livrasand/jform/blob/main/forms/livrasand/contact.jform" target="_blank">.jform example</a> as a template.',
    faq2_q: "Where is form data stored?",
    faq2_a:
      "Nowhere in JForm. Data is sent directly from the user's browser to the endpoint you defined in your .jform file. JForm is just the rendering engine and stores absolutely nothing.",
    faq3_q: "Who can see my forms?",
    faq3_a:
      "Anyone with the URL <code>jform.vercel.app/youruser/myform</code>. Since the .jform file lives in a public GitHub repo (yours or the central one), it is publicly accessible by design. Do not use JForm for sensitive data without proper encryption in your backend.",
    faq4_q: "Do I need a server to receive the data?",
    faq4_a:
      'Yes, you need an HTTP endpoint that receives POST requests with the data. It can be a server on PythonAnywhere, Railway, your own VPS, or even a serverless function on Vercel, Netlify, or Cloudflare Workers. The repo includes a <a href="https://github.com/livrasand/jform/blob/main/backend/receiver.py" target="_blank">Flask example</a>.',
    faq5_q: "Is JForm really free?",
    faq5_a:
      "Yes, completely free and open source. The frontend runs on Vercel's free tier. You only pay for your GitHub repo (free) and the backend where you receive data (your choice). No hidden costs, no premium plans, no surprises.",
    cta_title: "Create your form now",
    cta_sub: "No sign-up, no install, no payment. Just a JSON file and GitHub.",
    cta_plh: "Your GitHub username",
    cta_btn: "Try for free",
    footer_brand:
      "Decentralized, private, serverless forms. Open source under MIT license.",
    footer_producto: "Product",
    footer_recursos: "Resources",
    footer_comunidad: "Community",
    footer_como: "How it works",
    footer_carac: "Features",
    footer_usos: "Use cases",
    footer_faq: "FAQ",
    footer_schema: ".jform Schema",
    footer_ejemplo: ".jform example",
    footer_backend: "Backend example",
    footer_github: "GitHub",
    footer_bug: "Report bug",
    footer_disc: "Discussions",
    footer_copy: "\u00a9 2026 JForm. Free and open source software.",
    form_loading: "Loading form...",
    form_notfound: "No .jform file found for this user.",
    form_invalid: "The .jform file has an invalid structure.",
    form_noendpoint: "The .jform file does not define an endpoint.",
    form_submit: "Submit",
    form_sending: "Sending...",
    form_ok_title: "Sent successfully",
    form_ok_desc:
      "Your information was sent directly to the form creator's server, with no intermediaries.",
    footer_disclaimer: "This content was not created or approved by JFORM.",
    footer_contact: "Contact the form owner",
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
      "Register your email to receive form submissions directly in your inbox, no server setup needed.",
    register_email_label: "Your email",
    register_email_plh: "you@email.com",
    register_email_required: "Email is required",
    register_email_desc: "You'll receive form submissions at this address.",
    register_github_label: "GitHub username (optional)",
    register_github_plh: "your-username",
    register_github_desc: "To identify your account and facilitate collaboration.",
    register_pgp_label: "PGP public key (optional)",
    register_pgp_plh: "-----BEGIN PGP PUBLIC KEY BLOCK-----",
    register_pgp_desc: "If you add your PGP public key, the emails you receive will be end-to-end encrypted. Only you can decrypt them with your private key.",
    register_btn: "Generate token",
    register_loading: "Generating...",
    register_error: "Error generating token. Try again.",
    register_token_title: "Your owner token",
    register_token_how: "Add this to your .jform file:",
    register_token_code: '  "owner": "YOUR_TOKEN_HERE"',
    register_token_remove:
      "Remove the 'endpoint' field if you had one. JForm will send submissions to your email.",
    register_back: "Back to home",
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
