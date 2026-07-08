"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import FooterNav from "@/components/FooterNav";
import BackToTools from "@/components/BackToTools";
import { CV_SNIPPETS } from "@/lib/cv-snippets";

export default function SnippetsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <SiteHeader />
      
      <main style={{ flex: 1, maxWidth: 800, width: "100%", margin: "0 auto", padding: "32px 24px 64px" }}>
        <BackToTools />
        
        <div style={{ marginBottom: 32 }} className="anim-fade-in-up">
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            CV Section Snippets
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
            Copy and paste formatted Markdown sections directly into the{" "}
            <Link href="/cv" style={{ color: "var(--accent)", textDecoration: "underline" }}>
              CV Builder
            </Link>{" "}
            to bootstrap your layout.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {(["Core", "Optional"] as const).map((category) => (
            <div key={category} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {category} Sections
              </span>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {CV_SNIPPETS.filter((s) => s.category === category).map((snippet) => (
                  <div
                    key={snippet.id}
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      background: "var(--surface)",
                      padding: 20,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 8 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: 0 }}>
                        {snippet.title}
                      </h3>
                      
                      <button
                        type="button"
                        onClick={() => copyToClipboard(snippet.markdown, snippet.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 10px",
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 600,
                          color: copiedId === snippet.id ? "var(--success)" : "var(--text-muted)",
                          border: "1px solid var(--border)",
                          background: copiedId === snippet.id ? "rgba(22, 163, 74, 0.08)" : "transparent",
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          if (copiedId !== snippet.id) {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                            (e.currentTarget as HTMLElement).style.color = "var(--text)";
                            (e.currentTarget as HTMLElement).style.background = "var(--surface-raised)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (copiedId !== snippet.id) {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                          }
                        }}
                      >
                        {copiedId === snippet.id ? (
                          <>
                            <svg width={12} height={12} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          "Copy"
                        )}
                      </button>
                    </div>

                    <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 16px" }}>
                      {snippet.description}
                    </p>

                    <pre style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: 12,
                      background: "var(--surface-raised)",
                      padding: 16,
                      borderRadius: 6,
                      overflowX: "auto",
                      color: "var(--text)",
                      whiteSpace: "pre-wrap",
                      border: "1px solid var(--border)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}>
                      {snippet.markdown}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          border: "1px solid var(--border)",
          borderRadius: 8,
          background: "var(--surface-raised)",
          padding: 24,
          textAlign: "center",
          marginTop: 40,
        }}>
          <p style={{ fontSize: 13.5, color: "var(--text-muted)", margin: "0 0 16px" }}>
            Ready to design your full profile?
          </p>
          <Link
            href="/cv"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 20px",
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
            Build your CV
          </Link>
        </div>

        <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 0", background: "var(--surface)", marginTop: 48 }}>
          <FooterNav />
        </footer>
      </main>
    </div>
  );
}