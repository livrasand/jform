import { useI18n } from "../i18n.jsx";

export default function Privacy() {
  const { t } = useI18n();
  return (
    <div style={{ maxWidth: 720, margin: "60px auto", padding: "0 24px 80px" }}>
      <a href="/" style={{ fontSize: "0.85rem", color: "var(--text-2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
        ← JFORM
      </a>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: "var(--text-2)", fontSize: "0.9rem", marginBottom: 40 }}>Last updated: June 2026</p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>1. Overview</h2>
        <p>JFORM is a privacy-first, open-source form protocol. This policy explains what data we handle, how, and why — in plain language.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>2. Data We Do NOT Collect</h2>
        <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
          <li>We do not store form responses.</li>
          <li>We do not use tracking cookies or analytics.</li>
          <li>We do not build user profiles.</li>
          <li>We do not sell or share data with third parties.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>3. Email Relay</h2>
        <p>When you register to use the email relay feature, we store your email address and a generated token in our database (Neon/PostgreSQL hosted on Vercel). This is used solely to route form responses to your inbox.</p>
        <p style={{ marginTop: 12 }}>Form responses that pass through our relay are processed in memory and immediately forwarded via Resend. They are never persisted to disk or logged.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>4. File Attachments</h2>
        <p>If a form includes a file upload field, the file is included as an email attachment and forwarded directly to the form owner. JFORM does not retain copies of uploaded files.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>5. PGP Encryption (Optional)</h2>
        <p>If you register a PGP public key, form responses will be encrypted client-side before being relayed. Only you — with your private key — can decrypt them. JFORM never has access to your private key.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>6. Form Content Responsibility</h2>
        <p>Forms are created and owned by third-party developers who fork this repository. JFORM is not responsible for the data collected by individual forms. Always review a form before submitting your data. If a form looks suspicious, <a href="https://github.com/livrasand/jform/issues" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>report it here</a>.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>7. Data Deletion</h2>
        <p>To delete your email relay registration, open an issue at <a href="https://github.com/livrasand/jform" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>github.com/livrasand/jform</a> with your registered email address. We will remove your record within 7 days.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>8. Infrastructure</h2>
        <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
          <li><strong>Hosting:</strong> Vercel (serverless functions + static site)</li>
          <li><strong>Database:</strong> Neon (PostgreSQL) — stores only email relay tokens</li>
          <li><strong>Email delivery:</strong> Resend — used only to forward relay emails</li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>9. Contact</h2>
        <p>Questions about this policy? Open an issue at <a href="https://github.com/livrasand/jform" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>github.com/livrasand/jform</a>.</p>
      </section>
    </div>
  );
}
