import { describe, it, expect } from "vitest";
import { esc, buildEmailHtml, buildEmailPlaintext } from "../api/send.js";

describe("esc()", () => {
  it('escapa & < > " en strings', () => {
    expect(esc('a & b < c > d " e')).toBe("a &amp; b &lt; c &gt; d &quot; e");
  });

  it("devuelve string vacio intacto", () => {
    expect(esc("")).toBe("");
  });

  it("convierte numeros a string", () => {
    expect(esc(42)).toBe("42");
  });

  it("maneja null/undefined como string vacio", () => {
    expect(esc(null)).toBe("null");
    expect(esc(undefined)).toBe("undefined");
  });
});

describe("buildEmailHtml()", () => {
  it("genera tabla con los campos del form", () => {
    const html = buildEmailHtml("Test Form", { name: "Alice", age: "30" });
    expect(html).toContain("Test Form");
    expect(html).toContain("Alice");
    expect(html).toContain("30");
    expect(html).toContain("<table");
    expect(html).toContain("</table>");
  });

  it("trunca valores mayores a 500 chars", () => {
    const long = "x".repeat(600);
    const html = buildEmailHtml("Test", { field: long });
    expect(html).toContain("... [truncated]");
    expect(html).not.toContain(long);
  });

  it("escapa contenido en celdas", () => {
    const html = buildEmailHtml("Test", {
      field: "<script>alert('xss')</script>",
    });
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
  });
});

describe("buildEmailPlaintext()", () => {
  it("genera texto plano con campos", () => {
    const text = buildEmailPlaintext("Test Form", {
      name: "Alice",
      email: "a@b.com",
    });
    expect(text).toContain("Test Form");
    expect(text).toContain("name: Alice");
    expect(text).toContain("email: a@b.com");
    expect(text).toContain("PGP encrypted");
  });

  it("trunca valores mayores a 500 chars (consistente con HTML)", () => {
    const long = "y".repeat(600);
    const text = buildEmailPlaintext("Test", { field: long });
    expect(text).toContain("... [truncated]");
    expect(text).not.toContain(long);
    expect(text).toContain("y".repeat(500) + "... [truncated]");
  });
});
