"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { useConsent } from "@/components/CookieConsentContext";

// Import custom motion components
import AnimatedHero from "@/components/motion/AnimatedHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import MotionCard from "@/components/motion/MotionCard";
import WorkflowAnimation from "@/components/motion/WorkflowAnimation";
import OutputPreview from "@/components/motion/OutputPreview";

export default function HomePage() {
  const { hasConsent } = useConsent();
  const enabled = hasConsent === true;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <SiteHeader />
      
      <div style={{ flex: 1, width: "100%" }}>
        
        {/* ── 1. CINEMATIC HERO SECTION ── */}
        <AnimatedHero enabled={enabled} />

        {/* ── 2. TRUST/VALUE STRIP ── */}
        <section style={{ maxWidth: 1024, margin: "0 auto", padding: "16px 24px 24px" }}>
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
            ].map((trust, idx) => (
              <ScrollReveal key={trust} delay={idx * 0.08} direction="up">
                <div 
                  className="hover-btn-lift"
                  style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}
                >
                  <svg width={14} height={14} fill="none" stroke="var(--success)" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  {trust}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── 3. TOOLS SECTION ── */}
        <section style={{ maxWidth: 1024, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <ScrollReveal>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Select a Tool
                </span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", margin: "4px 0 0", letterSpacing: "-0.02em" }}>
                  Tools designed for clean parsing
                </h2>
              </div>
            </ScrollReveal>

            {/* Featured Primary Card: CV Builder */}
            <ScrollReveal delay={0.1}>
              <MotionCard>
                <div style={{
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  textAlign: "left"
                }}>
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
                      className="hover-btn-lift"
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
                      }}
                    >
                      Build CV
                      <span style={{ fontSize: 11 }} className="hover-arrow">→</span>
                    </Link>
                  </div>
                </div>
              </MotionCard>
            </ScrollReveal>

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
              ].map((tool, idx) => (
                <ScrollReveal key={tool.href} delay={idx * 0.1} direction="up" className="h-full">
                  <MotionCard style={{ height: "100%" }}>
                    <div style={{
                      padding: 20,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: 160,
                      height: "100%",
                      textAlign: "left"
                    }}>
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
                      >
                        {tool.cta}
                        <span style={{ fontSize: 11 }} className="hover-arrow">→</span>
                      </Link>
                    </div>
                  </MotionCard>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>

        {/* ── 4. HOW IT WORKS SECTION ── */}
        <section style={{ maxWidth: 1024, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <ScrollReveal>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Process
                </span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", margin: "4px 0 0", letterSpacing: "-0.02em" }}>
                  How it works
                </h2>
              </div>
            </ScrollReveal>

            {/* Interactive Scroll Workflow */}
            <ScrollReveal delay={0.1}>
              <WorkflowAnimation />
            </ScrollReveal>
          </div>
        </section>

        {/* ── 5. WHY CVENGINE SECTION ── */}
        <section style={{ maxWidth: 1024, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <ScrollReveal>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Advantages
                </span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", margin: "4px 0 0", letterSpacing: "-0.02em" }}>
                  Why CVEngine
                </h2>
              </div>
            </ScrollReveal>

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
              ].map((benefit, idx) => (
                <ScrollReveal key={benefit.title} delay={idx * 0.1} direction="up">
                  <MotionCard>
                    <div style={{ padding: 20, textAlign: "left" }}>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: "0 0 6px" }}>
                        {benefit.title}
                      </h4>
                      <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                        {benefit.desc}
                      </p>
                    </div>
                  </MotionCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. EXAMPLE/TEMPLATE PREVIEW SECTION ── */}
        <section id="example" style={{ maxWidth: 1024, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <ScrollReveal>
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
            </ScrollReveal>

            {/* Document Preview Card */}
            <OutputPreview />
          </div>
        </section>

        {/* ── 7. FINAL CTA BEFORE FOOTER ── */}
        <section style={{ maxWidth: 1024, margin: "0 auto", padding: "48px 24px" }}>
          <ScrollReveal>
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
                className="hover-btn-lift"
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
                }}
              >
                Start building
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* ── 8. FOOTER SECTION ── */}
        <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)", padding: "48px 24px" }}>
          <div style={{ maxWidth: 1024, margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
              
              {/* Brand Column */}
              <div className="md:col-span-4 flex flex-col gap-3">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="CVEngine Logo" style={{ width: 28, height: 28, objectFit: "contain" }} />
                  <span style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>
                    CVEngine
                  </span>
                </div>
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