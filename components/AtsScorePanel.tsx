"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { checkKeywords } from "@/lib/keyword-check";

type Props = {
  cvMarkdown: string;
  onInsertKeyword?: (keyword: string) => void;
};

type ScoreMeta = { label: string; bg: string; text: string; border: string };

function getScoreMeta(pct: number): ScoreMeta {
  if (pct >= 75) return { label: "Strong Match", bg: "rgba(22, 163, 74, 0.08)", text: "var(--success)", border: "rgba(22, 163, 74, 0.2)" };
  if (pct >= 50) return { label: "Good Match",   bg: "var(--accent-bg)", text: "var(--accent)", border: "rgba(225, 29, 72, 0.2)" };
  if (pct >= 25) return { label: "Fair Match",   bg: "rgba(217, 119, 6, 0.08)", text: "var(--warning)", border: "rgba(217, 119, 6, 0.2)" };
  return              { label: "Weak Match",   bg: "rgba(220, 38, 38, 0.08)", text: "var(--danger)", border: "rgba(220, 38, 38, 0.2)" };
}

const PLACEHOLDER = `Paste the job description / requirements here...`;

export default function AtsScorePanel({ cvMarkdown, onInsertKeyword }: Props) {
  const [open, setOpen] = useState(false);
  const [jobAd, setJobAd] = useState("");
  const [result, setResult] = useState<ReturnType<typeof checkKeywords> | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runCheck = useCallback(
    (jd: string, cv: string) => {
      if (!jd.trim() || !cv.trim()) {
        setResult(null);
        return;
      }
      setResult(checkKeywords(jd, cv));
    },
    []
  );

  // Debounce analysis
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runCheck(jobAd, cvMarkdown), 600);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [cvMarkdown, jobAd, runCheck]);

  const total = result ? result.inCv.length + result.missing.length : 0;
  const pct   = total > 0 ? Math.round((result!.inCv.length / total) * 100) : 0;
  const { label, bg, text, border } = getScoreMeta(pct);
  const topMissing = result?.missing.slice(0, 10) ?? [];

  return (
    <section
      style={{
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        overflow: "hidden",
        marginTop: 16,
      }}
      aria-label="ATS score panel"
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
        aria-expanded={open}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--surface-raised)"}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "none"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
            ATS Keyword Matcher
          </span>
          {result && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: text,
                background: bg,
                border: `1px solid ${border}`,
                padding: "2px 8px",
                borderRadius: 4,
              }}
            >
              {pct}% — {label}
            </span>
          )}
          {!result && (
            <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
              Analyze CV against a job description
            </span>
          )}
        </div>
        <svg
          style={{
            width: 14,
            height: 14,
            color: "var(--text-muted)",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.15s",
          }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expandable Body */}
      {open && (
        <div
          className="anim-slide-down"
          style={{
            borderTop: "1px solid var(--border)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Textarea */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Job Requirements
            </span>
            <textarea
              value={jobAd}
              onChange={(e) => setJobAd(e.target.value)}
              placeholder={PLACEHOLDER}
              rows={4}
              style={{
                width: "100%",
                fontSize: 13,
                padding: 10,
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--surface-raised)",
                color: "var(--text)",
                outline: "none",
                resize: "none",
                lineHeight: 1.5,
              }}
            />
          </div>

          {result && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Progress bar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>
                  <span>Match Rate</span>
                  <span style={{ fontWeight: 600, color: "var(--text)" }}>{pct}% ({result.inCv.length} / {total} keywords)</span>
                </div>
                <div style={{ width: "100%", height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      background: text,
                      width: `${pct}%`,
                      transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>
              </div>

              {/* Missing keywords */}
              {topMissing.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Missing Keywords (Click to add)
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {topMissing.map((kw) => (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => onInsertKeyword?.(kw)}
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: 4,
                          padding: "2px 8px",
                          fontSize: 11,
                          fontFamily: "ui-monospace, monospace",
                          color: "var(--text-muted)",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 3,
                          transition: "all 0.1s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                          (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                          (e.currentTarget as HTMLElement).style.background = "var(--accent-bg)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                          (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                          (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                        }}
                      >
                        <span style={{ opacity: 0.6 }}>+</span>
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: 12, color: "var(--success)", fontWeight: 500 }}>
                  ✓ All targeted keywords detected in your CV!
                </p>
              )}

              {/* Matched phrases */}
              {result.phrasesInCv.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Matched Phrases
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {result.phrasesInCv.slice(0, 8).map((ph) => (
                      <span
                        key={ph}
                        style={{
                          background: "var(--surface-raised)",
                          border: "1px solid var(--border)",
                          borderRadius: 4,
                          padding: "2px 8px",
                          fontSize: 11,
                          color: "var(--text-muted)",
                        }}
                      >
                        {ph}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}