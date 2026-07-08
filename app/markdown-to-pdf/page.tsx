"use client";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import FooterNav from "@/components/FooterNav";
import JsonLdWebPage from "@/components/JsonLdWebPage";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

const HOW_IT_WORKS = [
  {
    n: "1",
    title: "Paste or upload your .md file",
    body: "Open the CV builder and paste your Markdown content directly, or use the Upload .md button to load your file. The editor accepts any standard Markdown — headings, lists, bold text.",
  },
  {
    n: "2",
    title: "Preview your CV live",
    body: "As you type or paste, a live preview renders your CV in real time. You can check structure, headings, and formatting before downloading.",
  },
  {
    n: "3",
    title: "Download ATS-friendly PDF",
    body: 'Click "Download ATS PDF" to generate a single-column, scannable PDF from your Markdown. The PDF is optimised for applicant tracking systems (ATS) used by recruiters.',
  },
];

const FAQ = [
  {
    q: "What Markdown syntax does the PDF converter support?",
    a: "CVEngine supports standard Markdown: # H1, ## H2, ### H3 for headings, - or * for bullet lists, **bold**, *italic*, [links](url), and --- for horizontal rules. This covers everything you need for a professional CV.",
  },
  {
    q: "Is the Markdown to PDF conversion really free?",
    a: "Yes — completely free. No signup, no account, no payment. You paste or upload your .md file and download the PDF immediately.",
  },
  {
    q: "Will the PDF pass ATS (applicant tracking system) scanning?",
    a: "Yes. The PDF is single-column, uses plain text (not images), has clear semantic headings, and no complex tables or graphics — all the properties that ATS parsers require.",
  },
  {
    q: "Can I also download a Word (.docx) file from my Markdown?",
    a: "Yes. The CV builder also has a Download Word button that converts your .md content to a .docx file. Useful if a recruiter asks for a Word version.",
  },
  {
    q: "What is the difference between the PDF and the preview?",
    a: "The live preview gives you an instant in-browser view using the same Markdown. The downloaded PDF is generated server-side with ATS-optimised CSS — fonts, margins, and spacing may differ slightly from the preview.",
  },
];

export default function MarkdownToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Markdown to PDF Converter — Free CV & Resume",
    description:
      "Convert Markdown (.md) to a PDF CV or resume instantly. ATS-friendly output. Free — no signup.",
    url: `${siteUrl}/markdown-to-pdf`,
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <JsonLdWebPage data={jsonLd} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <SiteHeader />

      <main style={{ flex: 1, maxWidth: 640, width: "100%", margin: "0 auto", padding: "48px 24px 64px" }} className="anim-fade-in-up">
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", margin: "0 0 12px" }}>
            Markdown to PDF
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 520, margin: "0 auto 24px" }}>
            Convert your <code style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, background: "var(--surface-raised)", border: "1px solid var(--border)", padding: "2px 4px", borderRadius: 4 }}>.md</code> file directly to an ATS-friendly PDF CV or resume. Free, client-side, and private.
          </p>
          <Link
            href="/cv"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 20px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              background: "var(--accent)",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent)"}
          >
            Start Building Free
            <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* How it works */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: "0 0 20px" }}>
            How to Convert Markdown to PDF
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {HOW_IT_WORKS.map((step) => (
              <div key={step.n} style={{ display: "flex", gap: 16 }}>
                <div style={{
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  background: "var(--accent-bg)",
                  color: "var(--accent-text)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 14,
                }}>
                  {step.n}
                </div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 650, color: "var(--text)", margin: "0 0 4px" }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why ATS-friendly matters */}
        <section style={{ border: "1px solid var(--border)", borderRadius: 8, background: "var(--surface)", padding: 20, marginBottom: 48 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>
            Why ATS-Optimized PDF Matters
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 10px" }}>
            Most companies use applicant tracking systems to parse your CV before a recruiter sees it. A Markdown-to-PDF conversion works especially well for ATS because Markdown forces a clean, linear document structure — no multi-column layouts, no embedded images, no complex tables that can break parsing.
          </p>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
            CVEngine&apos;s PDF output uses a single-column layout with plain text headings and lists — exactly what ATS software expects. You get a professional-looking PDF that both machines and humans can read without issue.
          </p>
        </section>

        {/* Supported Markdown */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: "0 0 16px" }}>
            Supported Markdown Syntax
          </h2>
          <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", background: "var(--surface)" }}>
            {[
              ["# Your Name", "H1 — document title"],
              ["## Experience", "H2 — section heading"],
              ["### Job Title", "H3 — sub-section"],
              ["- Bullet point", "Unordered list item"],
              ["**Bold text**", "Bold / emphasis"],
              ["*Italic text*", "Italic"],
              ["[text](url)", "Hyperlink"],
              ["---", "Horizontal rule (divider)"],
            ].map(([syntax, desc], i) => (
              <div
                key={syntax}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "10px 16px",
                  fontSize: 13,
                  background: i % 2 === 0 ? "var(--surface-raised)" : "transparent",
                  borderBottom: i < 7 ? "1px solid var(--border)" : "none",
                }}
              >
                <code style={{ fontFamily: "ui-monospace, monospace", color: "var(--accent)", width: 140, flexShrink: 0 }}>
                  {syntax}
                </code>
                <span style={{ color: "var(--text-muted)" }}>{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: "0 0 16px" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQ.map(({ q, a }) => (
              <div key={q} style={{ border: "1px solid var(--border)", borderRadius: 8, background: "var(--surface)", padding: 16 }}>
                <h3 style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>{q}</h3>
                <p style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ textAlign: "center", borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 16px" }}>
            Also need a Word file?{" "}
            <Link href="/markdown-to-word" style={{ color: "var(--accent)", textDecoration: "underline" }}>
              Markdown to Word →
            </Link>
          </p>
          <Link
            href="/cv"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 20px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              background: "var(--accent)",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent)"}
          >
            Open CV Builder
          </Link>
        </div>

        <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 0", background: "var(--surface)", marginTop: 48 }}>
          <FooterNav />
        </footer>
      </main>
    </div>
  );
}