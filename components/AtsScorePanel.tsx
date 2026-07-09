"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { checkKeywords } from "@/lib/keyword-check";

type Props = {
  cvMarkdown: string;
  onInsertKeyword?: (keyword: string) => void;
  alwaysOpen?: boolean;
};

type ScoreMeta = { label: string; bg: string; text: string; border: string };

function getScoreMeta(pct: number): ScoreMeta {
  if (pct >= 75) return { label: "Strong Match", bg: "rgba(22, 163, 74, 0.08)", text: "var(--success)", border: "rgba(22, 163, 74, 0.2)" };
  if (pct >= 50) return { label: "Good Match",   bg: "var(--accent-bg)", text: "var(--accent)", border: "rgba(225, 29, 72, 0.2)" };
  if (pct >= 25) return { label: "Fair Match",   bg: "rgba(217, 119, 6, 0.08)", text: "var(--warning)", border: "rgba(217, 119, 6, 0.2)" };
  return              { label: "Weak Match",   bg: "rgba(220, 38, 38, 0.08)", text: "var(--danger)", border: "rgba(220, 38, 38, 0.2)" };
}

const PLACEHOLDER = `Paste the target job description or requirements here...`;

export default function AtsScorePanel({ cvMarkdown, onInsertKeyword, alwaysOpen = false }: Props) {
  const [open, setOpen] = useState(alwaysOpen);
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

  // Sync open state with alwaysOpen prop
  useEffect(() => {
    if (alwaysOpen) setOpen(true);
  }, [alwaysOpen]);

  // Debounce analysis
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runCheck(jobAd, cvMarkdown), 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [cvMarkdown, jobAd, runCheck]);

  const total = result ? result.inCv.length + result.missing.length : 0;
  const pct   = total > 0 ? Math.round((result!.inCv.length / total) * 100) : 0;
  const { label, bg, text, border } = getScoreMeta(pct);
  const topMissing = result?.missing.slice(0, 15) ?? [];
  const topMatched = result?.inCv.slice(0, 15) ?? [];

  return (
    <div
      style={{
        borderRadius: 8,
        border: alwaysOpen ? "none" : "1px solid var(--border)",
        background: alwaysOpen ? "transparent" : "var(--surface)",
        overflow: "hidden",
      }}
    >
      {/* Accordion Header (Only show if not alwaysOpen) */}
      {!alwaysOpen && (
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
      )}

      {/* Main Body */}
      {open && (
        <div
          style={{
            padding: alwaysOpen ? 0 : 16,
            borderTop: alwaysOpen ? "none" : "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Job Description Input */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Job Description
            </span>
            <textarea
              value={jobAd}
              onChange={(e) => setJobAd(e.target.value)}
              placeholder={PLACEHOLDER}
              rows={alwaysOpen ? 6 : 4}
              style={{
                width: "100%",
                fontSize: 13,
                padding: 12,
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
                outline: "none",
                resize: "none",
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* If No Job description entered */}
          {!result && (
            <div style={{
              padding: "32px 16px",
              border: "1px dashed var(--border)",
              borderRadius: 6,
              textAlign: "center",
              background: "var(--surface)"
            }}>
              <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: 0 }}>
                Paste a job description to compare it against your CV.
              </p>
            </div>
          )}

          {result && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              
              {/* ATS Match Score */}
              <div style={{
                padding: 16,
                border: "1px solid var(--border)",
                borderRadius: 6,
                background: "var(--surface)",
                display: "flex",
                flexDirection: "column",
                gap: 8
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)" }}>ATS Match Score</span>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: text,
                    background: bg,
                    border: `1px solid ${border}`,
                    padding: "2px 8px",
                    borderRadius: 4,
                  }}>
                    {pct}% — {label}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div>
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
                  <span style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 6, display: "block" }}>
                    Found {result.inCv.length} of {total} identified keywords in your CV.
                  </span>
                </div>
              </div>

              {/* Matched keywords */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Matched Keywords ({topMatched.length})
                </span>
                {topMatched.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {topMatched.map((kw) => (
                      <span
                        key={kw}
                        style={{
                          background: "var(--surface-raised)",
                          border: "1px solid var(--border)",
                          borderRadius: 4,
                          padding: "2px 8px",
                          fontSize: 11,
                          fontFamily: "ui-monospace, monospace",
                          color: "var(--text-muted)",
                        }}
                      >
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span style={{ fontSize: 12, color: "var(--text-faint)", fontStyle: "italic" }}>
                    No matched keywords yet.
                  </span>
                )}
              </div>

              {/* Missing keywords */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Missing Keywords ({topMissing.length})
                </span>
                {topMissing.length > 0 ? (
                  <div>
                    <span style={{ fontSize: 11, color: "var(--text-faint)", display: "block", marginBottom: 6 }}>
                      Click a keyword to append it to your CV editor.
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
                  <p style={{ fontSize: 12, color: "var(--success)", fontWeight: 600, margin: 0 }}>
                    ✓ All identified keywords are present in your CV!
                  </p>
                )}
              </div>

              {/* Suggestions */}
              <div style={{
                borderLeft: "2px solid var(--accent)",
                paddingLeft: 12,
                marginTop: 8
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 2 }}>
                  Suggestions
                </span>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.45, margin: 0 }}>
                  Add missing keywords naturally inside your experience, project, or skills sections to optimize your match score without stuffing keywords.
                </p>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}