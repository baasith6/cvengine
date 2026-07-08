"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { useConsent } from "@/components/CookieConsentContext";
import { trackEvent } from "@/lib/telemetry/track";

export default function HomePage() {
  const { hasConsent } = useConsent();
  const enabled = hasConsent === true;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <SiteHeader />
      
      <div style={{ flex: 1, width: "100%" }}>
        
        {/* ── 1. HERO SECTION ── */}
        <section style={{ maxWidth: 1024, margin: "0 auto", padding: "40px 24px 32px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-6 flex flex-col items-start text-left anim-fade-in-up">
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "var(--accent-bg)",
                border: "1px solid rgba(225, 29, 72, 0.15)",
                color: "var(--accent-text)",
                fontSize: 11,
                fontWeight: 650,
                padding: "3px 10px",
                borderRadius: 99,
                marginBottom: 16,
                letterSpacing: "0.02em"
              }}>
                Free · Privacy First · No Account Required
              </div>
              
              <h1 style={{
                fontSize: "calc(1.8rem + 1vw)",
                fontWeight: 800,
                color: "var(--text)",
                letterSpacing: "-0.035em",
                lineHeight: 1.15,
                marginBottom: 14,
              }}>
                Write your CV in Markdown.<br />
                Export an ATS-ready PDF.
              </h1>
              
              <p style={{
                fontSize: 14,
                color: "var(--text-muted)",
                lineHeight: 1.6,
                marginBottom: 24,
                maxWidth: 480,
              }}>
                Build a clean, recruiter-friendly CV with live preview, Markdown templates, and private browser-only export. Optimized for clean parsing.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
                <Link
                  href="/cv"
                  onClick={() => trackEvent({ name: "cta:click", path: "/", enabled })}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 20px",
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
                  Start building
                  <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <a
                  href="#example"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "9px 18px",
                    borderRadius: 6,
                    border: "1px solid var(--border)",
                    fontSize: 14,
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
                  View example CV
                </a>
              </div>
            </div>

            {/* Right Column: Realistic Product Preview */}
            <div className="lg:col-span-6 anim-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div style={{
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--surface)",
                overflow: "hidden",
                boxShadow: "var(--shadow)",
              }}>
                {/* Mock Browser Header */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  background: "var(--surface-raised)",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 99, background: "#ef4444", display: "inline-block" }} />
                    <span style={{ width: 8, height: 8, borderRadius: 99, background: "#f59e0b", display: "inline-block" }} />
                    <span style={{ width: 8, height: 8, borderRadius: 99, background: "#10b981", display: "inline-block" }} />
                  </div>
                  <span style={{ fontSize: 10, color: "var(--text-faint)", fontFamily: "ui-monospace, monospace" }}>cvengine.space/cv</span>
                  <div style={{ width: 36 }} />
                </div>
                
                {/* Split Workspace */}
                <div className="grid grid-cols-2" style={{ height: 260 }}>
                  {/* Markdown Editor */}
                  <div style={{
                    borderRight: "1px solid var(--border)",
                    background: "var(--surface-raised)",
                    padding: 12,
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 10.5,
                    color: "var(--text-muted)",
                    lineHeight: 1.4,
                    overflow: "hidden",
                    userSelect: "none"
                  }}>
                    <div style={{ color: "var(--text-faint)", marginBottom: 8 }}># John Doe</div>
                    <div style={{ color: "var(--accent)", marginBottom: 8 }}>hello@johndoe.com</div>
                    <div style={{ marginBottom: 4 }}>## Experience</div>
                    <div style={{ color: "var(--text)", fontWeight: "bold" }}>### Senior Engineer</div>
                    <div style={{ color: "var(--text-faint)", fontSize: 9.5 }}>Tech Corp · 2021 - Present</div>
                    <div style={{ paddingLeft: 8, marginTop: 4 }}>
                      - Led React migration<br />
                      - Optimized ATS scoring<br />
                      - Managed team of 4
                    </div>
                  </div>
                  {/* CV Preview */}
                  <div style={{
                    background: "#ffffff",
                    padding: 12,
                    fontSize: 9.5,
                    color: "#111111",
                    lineHeight: 1.35,
                    overflow: "hidden",
                    userSelect: "none"
                  }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", textAlign: "center", borderBottom: "1px solid #eee", paddingBottom: 4, marginBottom: 8 }}>
                      JOHN DOE
                    </div>
                    <div style={{ fontSize: 8, color: "#666", textAlign: "center", marginBottom: 8 }}>
                      hello@johndoe.com · github.com/johndoe
                    </div>
                    <div style={{ fontSize: 9, fontWeight: "bold", textTransform: "uppercase", borderBottom: "0.5px solid #ccc", marginBottom: 4, marginTop: 6 }}>
                      Experience
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: 8.5 }}>
                      <span>Senior Software Engineer</span>
                      <span style={{ fontWeight: "normal", color: "#666" }}>2021 - Present</span>
                    </div>
                    <div style={{ fontSize: 8, color: "#444", marginBottom: 2 }}>Tech Corp</div>
                    <ul style={{ paddingLeft: 10, listStyleType: "disc", fontSize: 8 }}>
                      <li>Led React migration saving 20% bundle size.</li>
                      <li>Optimized ATS keyword scoring pipeline.</li>
                      <li>Managed team of 4 engineers.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 2. TRUST/VALUE STRIP ── */}
        <section style={{ maxWidth: 1024, margin: "0 auto", padding: "16px 24px 24px" }} className="anim-fade-in-up">
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            padding: "12px 20px",
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--surface)",
          }}>
            {[
              "No login required",
              "Runs in your browser",
              "ATS-friendly layout",
              "PDF and Word export"
            ].map((trust) => (
              <div key={trust} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>
                <svg width={14} height={14} fill="none" stroke="var(--success)" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                {trust}
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. TOOLS SECTION (Redesigned Hierarchy) ── */}
        <section style={{ maxWidth: 1024, margin: "0 auto", padding: "40px 24px" }} className="anim-fade-in-up">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Select a Tool
              </span>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", margin: "4px 0 0", letterSpacing: "-0.02em" }}>
                Tools designed for clean parsing
              </h2>
            </div>

            {/* Featured Primary Card: CV Builder */}
            <div style={{
              border: "1px solid var(--border)",
              borderRadius: 8,
              background: "var(--surface)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, width: "100%", justifyContent: "space-between" }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", margin: 0 }}>CV Builder</h3>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  background: "var(--accent-bg)",
                  color: "var(--accent-text)",
                  border: "1px solid rgba(225, 29, 72, 0.15)",
                  padding: "2px 8px",
                  borderRadius: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.03em"
                }}>
                  Primary Tool
                </span>
              </div>
              
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5, margin: 0, maxWidth: 640 }}>
                Write in Markdown, preview live, and export a clean ATS-friendly CV. Simple templates keep columns in single linear flows to ensure recruiters and automated filters read your details correctly.
              </p>

              <div>
                <Link
                  href="/cv"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
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
                  Build CV
                  <span style={{ fontSize: 11 }}>→</span>
                </Link>
              </div>
            </div>

            {/* Responsive Grid: Secondary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  href: "/cover-letter",
                  title: "Cover Letter Builder",
                  desc: "Compose professional cover letters in Markdown following clean formatting guidelines.",
                  cta: "Write Cover Letter"
                },
                {
                  href: "/keyword-checker",
                  title: "Keyword Checker",
                  desc: "Compare your CV against target job ads to discover missing terms.",
                  cta: "Check Keywords"
                },
                {
                  href: "/snippets",
                  title: "CV Snippets",
                  desc: "Ready-to-use Markdown section templates. Quick copy/paste formats.",
                  cta: "Browse Snippets"
                }
              ].map((tool) => (
                <div
                  key={tool.href}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    background: "var(--surface)",
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 160,
                    transition: "border-color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div>
                    <h4 style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text)", margin: "0 0 6px" }}>
                      {tool.title}
                    </h4>
                    <p style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.45, margin: 0 }}>
                      {tool.desc}
                    </p>
                  </div>
                  
                  <Link
                    href={tool.href}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--accent)",
                      textDecoration: "none",
                      marginTop: 16,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--accent-hover)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--accent)"}
                  >
                    {tool.cta}
                    <span style={{ fontSize: 11 }}>→</span>
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── 4. HOW IT WORKS SECTION ── */}
        <section style={{ maxWidth: 1024, margin: "0 auto", padding: "40px 24px" }} className="anim-fade-in-up">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Process
              </span>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", margin: "4px 0 0", letterSpacing: "-0.02em" }}>
                How it works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { n: "1", title: "Write in Markdown", text: "Paste your text or start from a template using simple text formatting." },
                { n: "2", title: "Preview instantly", text: "See changes update in real time side-by-side as you type." },
                { n: "3", title: "Export PDF or Word", text: "Download clean, single-column documents optimized for clean parsing." }
              ].map((step) => (
                <div
                  key={step.n}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    background: "var(--surface)",
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: "var(--accent-bg)",
                    color: "var(--accent-text)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 750,
                    fontSize: 12.5,
                  }}>
                    {step.n}
                  </div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: 0 }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.45, margin: 0 }}>
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. WHY CVENGINE SECTION ── */}
        <section style={{ maxWidth: 1024, margin: "0 auto", padding: "40px 24px" }} className="anim-fade-in-up">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Advantages
              </span>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", margin: "4px 0 0", letterSpacing: "-0.02em" }}>
                Why CVEngine
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "ATS-Optimized Layout",
                  desc: "Single-column formats designed to be readable by machine parsers and recruiters alike."
                },
                {
                  title: "Private by Design",
                  desc: "Your data stays in your browser. We never store your contact details or resume history."
                },
                {
                  title: "Markdown-Based Editing",
                  desc: "Separates content from presentation. No broken columns, jumping text boxes, or margins."
                },
                {
                  title: "Export to PDF and Word",
                  desc: "Generate clean PDF or Word (.docx) files matching common professional templates."
                }
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    background: "var(--surface)",
                    padding: 20,
                  }}
                >
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: "0 0 6px" }}>
                    {benefit.title}
                  </h4>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. EXAMPLE/TEMPLATE PREVIEW SECTION ── */}
        <section id="example" style={{ maxWidth: 1024, margin: "0 auto", padding: "40px 24px" }} className="anim-fade-in-up">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Output Quality
              </span>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", margin: "4px 0 0", letterSpacing: "-0.02em" }}>
                Clean output. No broken formatting.
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 6, margin: 0 }}>
                CVEngine keeps your content structured, readable, and export-ready.
              </p>
            </div>

            {/* Document Preview Card */}
            <div style={{
              maxWidth: 640,
              margin: "0 auto",
              width: "100%",
              border: "1px solid var(--border)",
              borderRadius: 8,
              background: "#ffffff",
              padding: "32px 40px",
              boxShadow: "var(--shadow)",
              color: "#111111",
              fontFamily: "var(--font-geist-sans), 'Inter', sans-serif"
            }}>
              {/* Header */}
              <div style={{ textAlign: "center", borderBottom: "1.5px solid #222222", paddingBottom: 12, marginBottom: 16 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111111", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                  CLARA R. BARNETT
                </h3>
                <p style={{ fontSize: 11, color: "#555555", margin: 0 }}>
                  clara@example.com · +1 (555) 019-2834 · Seattle, WA · linkedin.com/in/clara-barnett
                </p>
              </div>

              {/* Summary */}
              <p style={{ fontSize: 11.5, lineHeight: 1.5, margin: "0 0 16px", color: "#333333" }}>
                Results-driven Software Engineer with 5+ years of experience building secure, scalable cloud web applications. Proficient in React, Node.js, and TypeScript, with a strong focus on API performance optimization and clean, readable codebases.
              </p>

              {/* Experience */}
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", borderBottom: "0.5px solid #aaaaaa", paddingBottom: 2, marginBottom: 8, letterSpacing: "0.05em" }}>
                  PROFESSIONAL EXPERIENCE
                </h4>
                
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, fontWeight: 700 }}>
                    <span>Software Engineer II · Cloud Solutions Inc.</span>
                    <span style={{ fontWeight: "normal", color: "#555555" }}>Seattle, WA · 2022 – Present</span>
                  </div>
                  <ul style={{ paddingLeft: 16, listStyleType: "disc", fontSize: 11, color: "#333333", marginTop: 4, display: "flex", flexDirection: "column", gap: 3 }}>
                    <li>Designed and implemented serverless REST API endpoints running on AWS Lambda.</li>
                    <li>Migrated legacy web portal to modern React and TypeScript, boosting lighthouse score by 35 points.</li>
                    <li>Developed internal query logging libraries saving 15% compute cost.</li>
                  </ul>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, fontWeight: 700 }}>
                    <span>Junior Web Developer · DevCorp LLC</span>
                    <span style={{ fontWeight: "normal", color: "#555555" }}>Portland, OR · 2020 – 2022</span>
                  </div>
                  <ul style={{ paddingLeft: 16, listStyleType: "disc", fontSize: 11, color: "#333333", marginTop: 4, display: "flex", flexDirection: "column", gap: 3 }}>
                    <li>Maintained customer-facing dashboard interfaces built in vanilla Javascript and React.</li>
                    <li>Authored automated integration unit tests achieving 82% coverage threshold.</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", borderBottom: "0.5px solid #aaaaaa", paddingBottom: 2, marginBottom: 8, letterSpacing: "0.05em" }}>
                  EDUCATION
                </h4>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, fontWeight: 700 }}>
                  <span>B.S. in Computer Science · University of Washington</span>
                  <span style={{ fontWeight: "normal", color: "#555555" }}>Seattle, WA · Class of 2020</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. FINAL CTA BEFORE FOOTER ── */}
        <section style={{ maxWidth: 1024, margin: "0 auto", padding: "48px 24px" }} className="anim-fade-in-up">
          <div style={{
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--surface-raised)",
            padding: "40px 24px",
            textAlign: "center",
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              Ready to build your CV?
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 24px", maxWidth: 440, marginInline: "auto" }}>
              Create a clean ATS-friendly CV in minutes. No account required.
            </p>
            <Link
              href="/cv"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 24px",
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
              Start building
            </Link>
          </div>
        </section>

        {/* ── 8. FOOTER SECTION ── */}
        <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)", padding: "48px 24px" }}>
          <div style={{ maxWidth: 1024, margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
              
              {/* Brand Column */}
              <div className="md:col-span-4 flex flex-col gap-3">
                <span style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>
                  CVEngine
                </span>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                  Private Markdown-based CV and cover letter builder.
                </p>
              </div>

              {/* Links columns */}
              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
                
                {/* Column 1: Tools */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Tools
                  </span>
                  <Link href="/cv" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">CV Builder</Link>
                  <Link href="/cover-letter" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Cover Letter</Link>
                  <Link href="/keyword-checker" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Keyword Checker</Link>
                  <Link href="/snippets" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Snippets</Link>
                </div>

                {/* Column 2: Resources */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Resources
                  </span>
                  <Link href="/markdown-to-pdf" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Markdown to PDF</Link>
                  <Link href="/markdown-to-word" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Markdown to Word</Link>
                  <Link href="/how-it-works" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">How it works</Link>
                  <Link href="/resources" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Resources</Link>
                </div>

                {/* Column 3: Legal */}
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
          </div>
        </footer>

      </div>
    </div>
  );
}