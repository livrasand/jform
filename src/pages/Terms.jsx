import { useI18n } from "../i18n.jsx";

export default function Terms() {
  const { t } = useI18n();
  return (
    <div style={{ maxWidth: 720, margin: "60px auto", padding: "0 24px 80px" }}>
      <a href="/" style={{ fontSize: "0.85rem", color: "var(--text-2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
        ← JFORM
      </a>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>Terms of Service</h1>
      <p style={{ color: "var(--text-2)", fontSize: "0.9rem", marginBottom: 40 }}>Last updated: June 2026</p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>1. Acceptance of Terms</h2>
        <p>By accessing or using JFORM ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>2. Description of Service</h2>
        <p>JFORM is an open-source, privacy-first form protocol that allows developers to deploy forms using <code>.jform</code> configuration files hosted in their own GitHub repositories. JFORM acts as a rendering and relay engine — it does not store form responses.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>3. User Responsibilities</h2>
        <p>You are solely responsible for the content of the forms you create and distribute. You agree not to use JFORM to collect data in an unlawful manner, deceive respondents, or violate any applicable privacy laws.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>4. Data and Privacy</h2>
        <p>JFORM does not store form responses. Responses are processed in memory and forwarded directly to the email or webhook you configure. See our <a href="/privacy" style={{ color: "var(--primary)" }}>Privacy Policy</a> for full details.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>5. Third-Party Content</h2>
        <p>Forms hosted via JFORM are created by third-party users. JFORM does not review, endorse, or take responsibility for the content of individual forms. If you encounter a suspicious form, please <a href="https://github.com/livrasand/jform/issues" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>report it</a>.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>6. Intellectual Property</h2>
        <p>JFORM is released under the MIT License. You are free to fork, modify, and distribute the code in accordance with the license terms.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>7. Disclaimer of Warranties</h2>
        <p>The Service is provided "as is" without warranties of any kind. JFORM makes no guarantees regarding uptime, accuracy, or fitness for a particular purpose.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>8. Changes to Terms</h2>
        <p>We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>
      </section>

      <section>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>9. Contact</h2>
        <p>For questions about these Terms, open an issue at <a href="https://github.com/livrasand/jform" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>github.com/livrasand/jform</a>.</p>
      </section>
    </div>
  );
}
