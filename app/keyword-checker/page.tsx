"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import FooterNav from "@/components/FooterNav";
import BackToTools from "@/components/BackToTools";
import { checkKeywords } from "@/lib/keyword-check";

type Result = ReturnType<typeof checkKeywords>;

function getScoreMeta(pct: number): { label: string; text: string; bg: string } {
  if (pct >= 75) return { label: "Strong Match", text: "var(--success)", bg: "rgba(22, 163, 74, 0.08)" };
  if (pct >= 50) return { label: "Good Match",   text: "var(--accent)",  bg: "var(--accent-bg)" };
  if (pct >= 25) return { label: "Fair Match",   text: "var(--warning)", bg: "rgba(217, 119, 6, 0.08)" };
  return              { label: "Weak Match",   text: "var(--danger)",  bg: "rgba(220, 38, 38, 0.08)" };
}

function ResultsPanel({ result }: { result: Result }) {
  const total = result.inCv.length + result.missing.length;
  const score = total > 0 ? Math.round((result.inCv.length / total) * 100) : 0;
  const { label, text, bg } = getScoreMeta(score);
  const hasPhrase = result.phrasesInCv.length > 0 || result.phrasesMissing.length > 0;

  return (
    <div
      className="anim-slide-down"
      style={{
        marginTop: 24,
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: 0 }}>Analysis Results</h2>

      {/* Score + stats */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: text, lineHeight: 1 }}>{score}%</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: text, background: bg, padding: "2px 6px", borderRadius: 4, marginTop: 6 }}>
            {label}
          </span>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 32px", fontSize: 13 }}>
          <div>
            <span style={{ color: "var(--text-muted)", display: "block", marginBottom: 2 }}>Job Posting</span>
            <span style={{ fontWeight: 600, color: "var(--text)" }}>{result.jobWordCount} words</span>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)", display: "block", marginBottom: 2 }}>Your CV</span>
            <span style={{ fontWeight: 600, color: "var(--text)" }}>{result.cvWordCount} words</span>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)", display: "block", marginBottom: 2 }}>Keywords Found</span>
            <span style={{ fontWeight: 600, color: "var(--success)" }}>{result.inCv.length} / {total}</span>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)", display: "block", marginBottom: 2 }}>Keywords Missing</span>
            <span style={{ fontWeight: 600, color: result.missing.length > 0 ? "var(--danger)" : "var(--text-muted)" }}>
              {result.missing.length} / {total}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div style={{ width: "100%", height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", background: text, width: `${score}%`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Key Phrases */}
      {hasPhrase && (
        <div style={{ border: "1px solid var(--border)", borderRadius: 6, background: "var(--surface-raised)", padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Key Phrases (Multi-Word)
          </span>
          
          {result.phrasesInCv.length > 0 && (
            <div>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)", display: "block", marginBottom: 6 }}>
                Phrases Found ({result.phrasesInCv.length})
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {result.phrasesInCv.map((ph) => (
                  <span key={ph} style={{ fontSize: 11, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 4, padding: "2px 8px", color: "var(--text-muted)" }}>
                    {ph}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.phrasesMissing.length > 0 && (
            <div>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)", display: "block", marginBottom: 6 }}>
                Phrases Missing ({result.phrasesMissing.length})
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {result.phrasesMissing.map((ph) => (
                  <span key={ph} style={{ fontSize: 11, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 4, padding: "2px 8px", color: "var(--accent)" }}>
                    {ph}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Single Keywords Found */}
      {result.inCv.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)", display: "block" }}>
            Keywords Found ({result.inCv.length})
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {result.inCv.map((w) => (
              <span key={w} style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 4, padding: "2px 8px", color: "var(--text-muted)" }}>
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Single Keywords Missing */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)", display: "block" }}>
          Keywords Missing ({result.missing.length})
        </span>
        {result.missing.length > 0 ? (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {result.missing.map((w) => (
                <span key={w} style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 4, padding: "2px 8px", color: "var(--accent)" }}>
                  {w}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "8px 0 0" }}>
              Try inserting these terms naturally into your CV in the{" "}
              <Link href="/cv" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                CV Builder
              </Link>
              .
            </p>
          </>
        ) : (
          <p style={{ fontSize: 12.5, color: "var(--success)", fontWeight: 500, margin: 0 }}>
            ✓ Perfect! Your CV includes all targeted single keywords.
          </p>
        )}
      </div>
    </div>
  );
}

export default function KeywordCheckerPage() {
  const [jobAd, setJobAd] = useState("");
  const [cvText, setCvText] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const runCheck = () => {
    if (!jobAd.trim() || !cvText.trim()) return;
    setResult(checkKeywords(jobAd, cvText));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <SiteHeader />
      
      <main style={{ flex: 1, maxWidth: 800, width: "100%", margin: "0 auto", padding: "32px 24px 64px" }}>
        <BackToTools />
        
        <div style={{ marginBottom: 32 }} className="anim-fade-in-up">
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            CV Keyword Checker
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
            Compare your CV plain text against a target job posting to isolate missing credentials, technical terms, and industry jargon.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginBottom: 20 }} className="md:grid-cols-2">
          {/* Job description input */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="job-ad" style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>
              Job description
            </label>
            <textarea
              id="job-ad"
              value={jobAd}
              onChange={(e) => setJobAd(e.target.value)}
              placeholder="Paste the job listing requirements here..."
              style={{
                width: "100%",
                minHeight: 180,
                fontSize: 13,
                padding: 12,
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
                outline: "none",
                resize: "vertical",
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* CV plain text input */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="cv-text" style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>
              Your CV (Plain Text)
            </label>
            <textarea
              id="cv-text"
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Copy and paste your plain CV text here..."
              style={{
                width: "100%",
                minHeight: 180,
                fontSize: 13,
                padding: 12,
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
                outline: "none",
                resize: "vertical",
                lineHeight: 1.5,
              }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={runCheck}
          disabled={!jobAd.trim() || !cvText.trim()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 20px",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 600,
            color: "#ffffff",
            background: "var(--accent)",
            border: "none",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => {
            if (jobAd.trim() && cvText.trim()) {
              (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--accent)";
          }}
        >
          Check Keywords
        </button>

        {result && <ResultsPanel result={result} />}

        <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 0", background: "var(--surface)", marginTop: 48 }}>
          <FooterNav />
        </footer>
      </main>
    </div>
  );
}