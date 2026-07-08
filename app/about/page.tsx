"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <SiteHeader />
      
      <main style={{ flex: 1, maxWidth: 800, width: "100%", margin: "0 auto", padding: "48px 24px 64px" }} className="anim-fade-in-up">
        
        {/* ── 1. ABOUT HERO SECTION ── */}
        <section style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: "calc(1.8rem + 1vw)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", margin: "0 0 12px", lineHeight: 1.15 }}>
            About CVEngine
          </h1>
          <p style={{ fontSize: 16, fontWeight: 650, color: "var(--text)", margin: "0 0 12px", lineHeight: 1.4 }}>
            A private Markdown-based CV builder for clean, ATS-friendly resumes.
          </p>
          <p style={{ fontSize: 14.5, color: "var(--text-muted)", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 600 }}>
            CVEngine helps you write, preview, and export your CV without accounts, complex editors, or broken formatting.
          </p>
          
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <Link
              href="/cv"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 18px",
                borderRadius: 6,
                fontSize: 13.5,
                fontWeight: 600,
                color: "#ffffff",
                background: "var(--accent)",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent)"}
            >
              Start building
            </Link>
            
            <a
              href="#how-it-works"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "7px 16px",
                borderRadius: 6,
                border: "1px solid var(--border)",
                fontSize: 13.5,
                fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
                background: "var(--surface)",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              See how it works
            </a>
          </div>
        </section>

        {/* ── 2. TRUST STRIP ── */}
        <section style={{ marginBottom: 40 }}>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--surface)",
          }}>
            {["Free to use", "No account required", "Markdown-based", "PDF & Word export"].map((trust) => (
              <div key={trust} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--text-muted)", fontWeight: 500 }}>
                <svg width={14} height={14} fill="none" stroke="var(--success)" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                {trust}
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. PRODUCT FLOW VISUAL ── */}
        <section style={{ marginBottom: 40 }}>
          <div style={{
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--surface-raised)",
            padding: "16px 20px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-muted)"
          }}>
            <span>Markdown Editor</span>
            <span style={{ color: "var(--text-faint)" }}>→</span>
            <span>Live Preview</span>
            <span style={{ color: "var(--text-faint)" }}>→</span>
            <span style={{ color: "var(--text)" }}>ATS-Friendly Export (PDF / Word)</span>
          </div>
        </section>

        {/* ── 4. WHAT CVENGINE DOES (Cards) ── */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: "0 0 16px" }}>
            What CVEngine does
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Write in Markdown", text: "Use simple plain-text formatting for headings, sections, links, and bullet points." },
              { title: "Preview live", text: "See your formatted CV update in real time as you edit." },
              { title: "Export clean files", text: "Download an ATS-friendly PDF or Word document when ready." }
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  background: "var(--surface)",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <h3 style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text)", margin: 0 }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.45, margin: 0 }}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. WHO IT'S FOR ── */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: "0 0 16px" }}>
            Who it&apos;s for
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Technical Professionals", text: "Developers and technical writers comfortable with Markdown editing." },
              { title: "Recent Graduates", text: "Students creating their first CV wanting a clean layout quickly." },
              { title: "Active Job Seekers", text: "Career changers tailoring master CVs for multiple job descriptions." },
              { title: "Efficiency Focused", text: "Anyone who wants a simple ATS-friendly format without fighting layouts or fonts." }
            ].map((audience) => (
              <div
                key={audience.title}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  background: "var(--surface)",
                  padding: 16,
                }}
              >
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", margin: "0 0 4px" }}>
                  {audience.title}
                </h4>
                <p style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.45, margin: 0 }}>
                  {audience.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. HOW IT WORKS (3 Steps) ── */}
        <section id="how-it-works" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: "0 0 16px" }}>
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: "1", title: "Write or upload", text: "Type your CV in Markdown or upload a .md file." },
              { n: "2", title: "Preview live", text: "Check headings, bullet points, spacing, and layout before export." },
              { n: "3", title: "Download", text: "Export your CV as PDF or Word." }
            ].map((step) => (
              <div
                key={step.n}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  background: "var(--surface)",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: 5,
                  background: "var(--accent-bg)",
                  color: "var(--accent-text)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 11,
                }}>
                  {step.n}
                </div>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", margin: 0 }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.4, margin: 0 }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. PRIVACY SECTION ── */}
        <section style={{ marginBottom: 40, border: "1px solid var(--border)", borderRadius: 8, background: "var(--surface)", padding: 20 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>
            Privacy
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 12px" }}>
            Your CV content is temporarily processed only for export and is not stored after generation.
          </p>
          <Link href="/privacy" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "underline", fontWeight: 550 }}>
            Read the full Privacy Policy
          </Link>
        </section>

        {/* ── 8. FINAL CTA ── */}
        <section style={{ marginBottom: 48 }}>
          <div style={{
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--surface-raised)",
            padding: "32px 24px",
            textAlign: "center",
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
              Ready to build your CV?
            </h2>
            <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.4, margin: "0 0 20px" }}>
              Create a clean ATS-friendly CV in minutes. No account required.
            </p>
            <Link
              href="/cv"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 18px",
                borderRadius: 6,
                fontSize: 13.5,
                fontWeight: 600,
                color: "#ffffff",
                background: "var(--accent)",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent)"}
            >
              Start building
            </Link>
          </div>
        </section>

        {/* ── 9. IMPROVED FOOTER ── */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 0 0" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            
            {/* Brand Column */}
            <div className="md:col-span-4 flex flex-col gap-3">
              <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>
                CVEngine
              </span>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                Private Markdown-based CV and cover letter builder.
              </p>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              
              {/* Tools */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Tools
                </span>
                <Link href="/cv" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">CV Builder</Link>
                <Link href="/cover-letter" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Cover Letter</Link>
                <Link href="/keyword-checker" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Keyword Checker</Link>
                <Link href="/snippets" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Snippets</Link>
              </div>

              {/* Resources */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Resources
                </span>
                <Link href="/markdown-to-pdf" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Markdown to PDF</Link>
                <Link href="/markdown-to-word" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Markdown to Word</Link>
                <Link href="/how-it-works" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">How it works</Link>
                <Link href="/resources" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Resources</Link>
              </div>

              {/* Legal */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="col-span-2 sm:col-span-1">
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Legal
                </span>
                <Link href="/privacy" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Privacy</Link>
                <Link href="/terms" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Terms</Link>
                <Link href="/contact" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Contact</Link>
              </div>

            </div>
          </div>
          
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
              &copy; {new Date().getFullYear()} CVEngine. All rights reserved.
            </span>
          </div>
        </footer>

      </main>
    </div>
  );
}