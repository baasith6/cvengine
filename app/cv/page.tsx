"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import DownloadWordButton from "@/components/DownloadWordButton";
import SiteHeader from "@/components/SiteHeader";
import AtsScorePanel from "@/components/AtsScorePanel";
import { SAMPLE_CV } from "@/lib/sample-cv";
import { CV_SNIPPETS } from "@/lib/cv-snippets";

const CV_DRAFT_KEY = "cvengine_cv_draft";
const CV_DRAFTS_KEY = "cvengine_cv_drafts";
const CV_TEMPLATE_KEY = "cvengine_cv_template";

type Draft = { id: string; name: string; content: string; savedAt: number };

const TEMPLATES = [
  { id: "classic", label: "Classic — Single-column ATS-friendly layout" },
];

export type ValidationIssue = {
  id: string;
  type: "warning" | "info";
  message: string;
};

// CV Validation Helper
function validateCv(markdown: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!markdown || markdown.trim() === "") {
    return issues;
  }

  // 1. Broken Markdown links
  const linkRegex = /\[([^\]]+)\]\(([^)]*)\)/g;
  let match;
  while ((match = linkRegex.exec(markdown)) !== null) {
    const text = match[1];
    const url = match[2].trim();
    if (!url || url === "https://" || url === "http://" || url.includes("https://\n")) {
      issues.push({
        id: `broken-link-${text}-${match.index}`,
        type: "warning",
        message: `Broken link detected for "${text}". Please complete the URL target.`
      });
    }
  }

  // 2. Missing email
  if (!/@/.test(markdown)) {
    issues.push({ id: "missing-email", type: "warning", message: "No email address found. Add a contact email." });
  }

  // 3. Missing phone number
  if (!/\+?[\d\s-]{7,15}/.test(markdown) || !/\d/.test(markdown)) {
    issues.push({ id: "missing-phone", type: "warning", message: "No phone number found. Add a contact number." });
  }

  // 4. Missing LinkedIn or portfolio
  if (!/linkedin\.com/i.test(markdown) && !/github\.com/i.test(markdown)) {
    issues.push({ id: "missing-social", type: "info", message: "No LinkedIn or GitHub link detected. Adding one increases recruiter trust." });
  }

  // 5. Missing sections
  const lower = markdown.toLowerCase();
  if (!lower.includes("summary") && !lower.includes("objective")) {
    issues.push({ id: "missing-summary", type: "warning", message: "Missing a 'Professional Summary' or 'Objective' header." });
  }
  if (!lower.includes("experience") && !lower.includes("work")) {
    issues.push({ id: "missing-experience", type: "warning", message: "Missing a 'Work Experience' header." });
  }
  if (!lower.includes("skills")) {
    issues.push({ id: "missing-skills", type: "warning", message: "Missing a 'Skills' section." });
  }

  // 6. Placeholder tags
  const placeholderRegex = /\[(Your Full Name|Email|Phone|City|role|X|industry|Job Title|Company Name|Month YYYY|Degree|Institution|Year|Skill|Tool|Language|Certification Name|Issuer|Project Name|Organisation)\]/i;
  if (placeholderRegex.test(markdown)) {
    issues.push({ id: "placeholder-text", type: "warning", message: "Placeholder tags like [Job Title] or [Degree] are still present." });
  }

  // 7. Word count check
  const words = markdown.trim().split(/\s+/).length;
  if (words < 50) {
    issues.push({ id: "too-short", type: "warning", message: "CV is too short. Recruiter filters prefer more detailed descriptors." });
  } else if (words > 1200) {
    issues.push({ id: "too-long", type: "warning", message: "CV exceeds 1200 words. Try to keep it concise and under 2 A4 pages." });
  }

  return issues;
}

export default function CvBuilderPage() {
  const [markdown, setMarkdown] = useState("");
  const [desktopMode, setDesktopMode] = useState<"editor" | "split" | "preview" | "ats">("split");
  const [mobileTab, setMobileTab] = useState<"editor" | "preview" | "ats">("editor");
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [template, setTemplate] = useState("classic");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [currentName, setCurrentName] = useState("Untitled CV");
  const [showDrafts, setShowDrafts] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [savedMsg, setSavedMsg] = useState(false);
  
  // Resizable split view states
  const [editorWidthPercent, setEditorWidthPercent] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);
  
  // Load saved draft + template
  useEffect(() => {
    if (draftLoaded) return;
    try {
      const saved = localStorage.getItem(CV_DRAFT_KEY);
      // Fallback to SAMPLE_CV if nothing saved
      setMarkdown(saved || SAMPLE_CV);
      
      const savedTemplate = localStorage.getItem(CV_TEMPLATE_KEY);
      if (savedTemplate && TEMPLATES.some((t) => t.id === savedTemplate)) {
        setTemplate(savedTemplate);
      }
      const savedDrafts = localStorage.getItem(CV_DRAFTS_KEY);
      if (savedDrafts) setDrafts(JSON.parse(savedDrafts));
    } catch {
      // ignore
    }
    setDraftLoaded(true);
  }, [draftLoaded]);

  // Auto-save CV draft content
  useEffect(() => {
    if (!draftLoaded) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(CV_DRAFT_KEY, markdown);
      } catch {
        // ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [markdown, draftLoaded]);

  // Save template choice
  useEffect(() => {
    try {
      localStorage.setItem(CV_TEMPLATE_KEY, template);
    } catch {
      // ignore
    }
  }, [template]);

  const persistDrafts = (updated: Draft[]) => {
    setDrafts(updated);
    try {
      localStorage.setItem(CV_DRAFTS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const saveNamedDraft = (name: string) => {
    const trimmed = name.trim() || "Untitled CV";
    const draft: Draft = {
      id: Date.now().toString(),
      name: trimmed,
      content: markdown,
      savedAt: Date.now(),
    };
    const updated = [draft, ...drafts.filter((d) => d.name !== trimmed)].slice(0, 10);
    persistDrafts(updated);
    setCurrentName(trimmed);
    setSaveName("");
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
    setShowDrafts(false);
  };

  const loadDraft = (d: Draft) => {
    setMarkdown(d.content);
    setCurrentName(d.name);
    setShowDrafts(false);
  };

  const deleteDraft = (id: string) => {
    persistDrafts(drafts.filter((d) => d.id !== id));
  };

  // Draggable Mouse events
  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    if (!isResizing) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!workspaceRef.current) return;
      const rect = workspaceRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const pct = Math.round((relativeX / rect.width) * 100);
      // Bound between 25% and 75%
      setEditorWidthPercent(Math.max(25, Math.min(75, pct)));
    };
    const handleMouseUp = () => {
      setIsResizing(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Validation details
  const issues = validateCv(markdown);
  const errorIssues = issues.filter((i) => i.type === "warning");
  const isCvempty = !markdown || markdown.trim() === "";

  const words = markdown.trim() === "" ? 0 : markdown.trim().split(/\s+/).length;
  const pages = words === 0 ? 0 : Math.ceil(words / 320);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)", overflow: "hidden" }}>
      {/* 1. Navbar */}
      <SiteHeader rightAction={null} />

      {/* 2. Workspace Header / Command Bar */}
      <header style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "8px 24px",
        flexShrink: 0,
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          maxWidth: 1400,
          margin: "0 auto",
        }}>
          {/* Left: Backlink & Tool Info */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link
              href="/"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              ← All tools
            </Link>
            <span style={{ height: 12, width: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>CV Builder</span>
          </div>

          {/* Center: Document Title & Draft Manager */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, position: "relative" }}>
            <input
              type="text"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              placeholder="Untitled CV"
              style={{
                background: "transparent",
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text)",
                outline: "none",
                padding: "2px 4px",
                width: 140,
                textAlign: "center",
                borderBottom: "1px solid transparent",
              }}
              onFocus={(e) => (e.target.style.borderBottomColor = "var(--border-strong)")}
              onBlur={(e) => {
                e.target.style.borderBottomColor = "transparent";
                if (currentName.trim()) saveNamedDraft(currentName);
              }}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            />
            <button
              type="button"
              onClick={() => {
                setSaveName(currentName);
                setShowDrafts(true);
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                fontSize: 10,
                cursor: "pointer",
                padding: "4px 6px",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              title="Manage drafts"
            >
              ▼
            </button>
            {savedMsg && (
              <span style={{ position: "absolute", left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 8, fontSize: 10, color: "var(--success)", fontWeight: 600 }} className="anim-fade-in">
                Saved
              </span>
            )}
          </div>

          {/* Right: Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Template Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 12, color: "var(--text-faint)" }}>Template:</span>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text)",
                  padding: "4px 8px 4px 4px",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Buttons + Issue feedback */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {errorIssues.length > 0 && (
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: "var(--accent)",
                    background: "var(--accent-bg)",
                    border: "1px solid rgba(225, 29, 72, 0.12)",
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                  title="Check validation issues before exporting"
                >
                  {errorIssues.length} warning{errorIssues.length > 1 ? "s" : ""}
                </span>
              )}
              <DownloadWordButton markdown={markdown} downloadFilename={`${currentName.toLowerCase().replace(/\s+/g, "-")}.docx`} />
              <DownloadPdfButton markdown={markdown} template={template} downloadFilename={`${currentName.toLowerCase().replace(/\s+/g, "-")}.pdf`} />
            </div>
          </div>
        </div>
      </header>

      {/* 3. CV Health / Status Bar + Desktop segmented controls */}
      <div style={{
        background: "var(--surface-raised)",
        borderBottom: "1px solid var(--border)",
        padding: "6px 24px",
        flexShrink: 0,
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          
          {/* Left: CV health details */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "var(--text-muted)", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--success)" }} />
              Saved locally
            </span>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <span>{words.toLocaleString()} words</span>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <span>{pages === 0 ? "Empty CV" : `~${pages} page${pages > 1 ? "s" : ""}`}</span>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <span style={{ color: errorIssues.length > 0 ? "var(--accent)" : "var(--text-muted)", fontWeight: errorIssues.length > 0 ? 600 : 400 }}>
              {errorIssues.length === 0 ? "✓ Validation passed" : `⚠ ${errorIssues.length} issue${errorIssues.length > 1 ? "s" : ""} found`}
            </span>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <span style={{ fontSize: 10.5, color: "var(--text-faint)" }}>Stored in this browser only</span>
          </div>

          {/* Right: Mode segment buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Quick layout controls (only show on desktop split view) */}
            {desktopMode === "split" && (
              <div className="hidden lg:flex" style={{ gap: 4, marginRight: 12 }}>
                <button
                  type="button"
                  onClick={() => setEditorWidthPercent(50)}
                  style={{
                    background: "none", border: "1px solid var(--border)", borderRadius: 4,
                    padding: "2px 6px", fontSize: 10, cursor: "pointer", color: "var(--text-muted)"
                  }}
                >
                  50/50
                </button>
                <button
                  type="button"
                  onClick={() => setEditorWidthPercent(75)}
                  style={{
                    background: "none", border: "1px solid var(--border)", borderRadius: 4,
                    padding: "2px 6px", fontSize: 10, cursor: "pointer", color: "var(--text-muted)"
                  }}
                >
                  Focus Editor
                </button>
                <button
                  type="button"
                  onClick={() => setEditorWidthPercent(30)}
                  style={{
                    background: "none", border: "1px solid var(--border)", borderRadius: 4,
                    padding: "2px 6px", fontSize: 10, cursor: "pointer", color: "var(--text-muted)"
                  }}
                >
                  Focus Preview
                </button>
              </div>
            )}

            {/* Desktop Mode Tabs */}
            <div className="hidden lg:flex" style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: 2,
              gap: 2,
            }}>
              {[
                { id: "editor", label: "Editor" },
                { id: "split", label: "Split View" },
                { id: "preview", label: "Preview" },
                { id: "ats", label: "ATS Match" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDesktopMode(tab.id as "editor" | "split" | "preview" | "ats")}
                  style={{
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    background: desktopMode === tab.id ? "var(--accent-bg)" : "transparent",
                    color: desktopMode === tab.id ? "var(--accent)" : "var(--text-muted)",
                    transition: "all 0.1s",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile segmented controls */}
          <div className="flex lg:hidden" style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: 2,
            gap: 2,
            width: "100%",
          }}>
            {[
              { id: "editor", label: "Editor" },
              { id: "preview", label: "Preview" },
              { id: "ats", label: "ATS Match" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMobileTab(tab.id as "editor" | "preview" | "ats")}
                style={{
                  flex: 1,
                  border: "none",
                  borderRadius: 4,
                  padding: "6px 0",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: mobileTab === tab.id ? "var(--accent-bg)" : "transparent",
                  color: mobileTab === tab.id ? "var(--accent)" : "var(--text-muted)",
                  transition: "all 0.1s",
                  textAlign: "center",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 4. Validation Issues Alert Banner (only show if warnings exist) */}
      {errorIssues.length > 0 && desktopMode !== "preview" && (
        <div style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "8px 24px",
          flexShrink: 0
        }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 12, overflowX: "auto" }} className="no-scrollbar">
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em", flexShrink: 0 }}>
              CV Validation Warning:
            </span>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {errorIssues.map((issue) => (
                <div key={issue.id} style={{ fontSize: 11.5, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
                  <span style={{ color: "var(--accent)" }}>•</span>
                  {issue.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Main Split Workspace Layout */}
      <main style={{
        flex: 1,
        minHeight: 0,
        position: "relative",
      }}>
        {/* Empty State Overlay */}
        {isCvempty && (
          <div
            className="anim-scale-in"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 8,
              background: "var(--bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <div style={{
              maxWidth: 400,
              width: "100%",
              border: "1px solid var(--border)",
              borderRadius: 12,
              background: "var(--surface)",
              padding: 32,
              textAlign: "center",
              boxShadow: "var(--shadow)"
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", margin: "0 0 8px" }}>
                Empty Workspace
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 24px" }}>
                Start writing your CV in Markdown, upload a .md file, or insert a clean template snippet below.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setMarkdown(SAMPLE_CV)}
                  style={{
                    background: "var(--accent)", color: "#ffffff", border: "none", borderRadius: 6,
                    padding: "8px 16px", fontSize: 13, fontWeight: 650, cursor: "pointer",
                  }}
                >
                  Insert Starter CV
                </button>
                <div style={{ display: "flex", gap: 8 }}>
                  <label
                    style={{
                      flex: 1, border: "1px solid var(--border)", borderRadius: 6,
                      padding: "8px 0", fontSize: 12, fontWeight: 600, color: "var(--text-muted)",
                      cursor: "pointer", display: "inline-block", background: "var(--surface-raised)",
                    }}
                  >
                    Upload Markdown
                    <input
                      type="file"
                      accept=".md,text/markdown,text/plain"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          if (typeof ev.target?.result === "string") setMarkdown(ev.target.result);
                        };
                        reader.readAsText(file);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop View grid with resizable handle */}
        <div
          ref={workspaceRef}
          className="hidden lg:grid"
          style={{
            height: "100%",
            gridTemplateColumns:
              desktopMode === "editor" ? "1fr" :
              desktopMode === "preview" ? "1fr" :
              desktopMode === "ats" ? `${editorWidthPercent}% 1px 1fr` :
              `${editorWidthPercent}% 1px 1fr`,
          }}
        >
          {/* Column Left: Editor (shows in editor, split, and ats modes) */}
          {(desktopMode === "editor" || desktopMode === "split" || desktopMode === "ats") && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              background: "var(--surface)",
              minHeight: 0,
            }}>
              <Editor value={markdown} onChange={setMarkdown} snippets={CV_SNIPPETS} />
            </div>
          )}

          {/* Draggable Divider Handle (split and ats modes) */}
          {(desktopMode === "split" || desktopMode === "ats") && (
            <div
              onMouseDown={startResizing}
              style={{
                width: 5,
                marginLeft: "-2px",
                cursor: "col-resize",
                background: isResizing ? "var(--accent)" : "var(--border)",
                zIndex: 9,
                transition: "background 0.15s",
              }}
              title="Drag to resize columns"
            />
          )}

          {/* Column Right: Preview (split and preview modes) */}
          {(desktopMode === "split" || desktopMode === "preview") && (
            <div style={{
              height: "100%",
              minHeight: 0,
              overflow: "hidden",
            }}>
              <Preview markdown={markdown} />
            </div>
          )}

          {/* Column Right: ATS Matcher (ats mode only) */}
          {desktopMode === "ats" && (
            <div style={{
              height: "100%",
              minHeight: 0,
              overflowY: "auto",
              padding: 24,
              background: "var(--surface-raised)",
            }}>
              <div style={{ maxWidth: 640, margin: "0 auto" }}>
                <AtsScorePanel
                  cvMarkdown={markdown}
                  onInsertKeyword={(kw) => setMarkdown((prev) => `${prev}\n- ${kw}`)}
                  alwaysOpen={true}
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile View tabs */}
        <div className="block lg:hidden" style={{ height: "100%" }}>
          {mobileTab === "editor" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface)" }}>
              <Editor value={markdown} onChange={setMarkdown} snippets={CV_SNIPPETS} />
            </div>
          )}
          
          {mobileTab === "preview" && (
            <div style={{ height: "100%", overflow: "hidden" }}>
              <Preview markdown={markdown} />
            </div>
          )}

          {mobileTab === "ats" && (
            <div style={{ height: "100%", overflowY: "auto", padding: 16, background: "var(--surface-raised)" }}>
              <AtsScorePanel
                cvMarkdown={markdown}
                onInsertKeyword={(kw) => setMarkdown((prev) => `${prev}\n- ${kw}`)}
                alwaysOpen={true}
              />
            </div>
          )}
        </div>
      </main>

      {/* 6. Minimal Compact Footer */}
      <footer style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "6px 24px",
        flexShrink: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontSize: 11, color: "var(--text-faint)" }}>
          &copy; {new Date().getFullYear()} CVEngine. All data remains in your browser.
        </span>
        <Link href="/privacy" style={{ fontSize: 11, color: "var(--text-faint)", textDecoration: "none" }} className="hover:underline">
          Privacy Policy
        </Link>
      </footer>

      {/* 7. Drafts Modal Overlay */}
      {showDrafts && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDrafts(false);
          }}
        >
          <div
            className="anim-scale-in"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 24,
              width: "100%",
              maxWidth: 400,
              boxShadow: "var(--shadow)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>My Drafts</span>
              <button
                type="button"
                onClick={() => setShowDrafts(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  padding: 4,
                }}
              >
                ✕
              </button>
            </div>

            {/* Rename / Save Current */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>
                Save Current Draft
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer CV"
                  style={{
                    flex: 1,
                    fontSize: 13,
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "1px solid var(--border)",
                    background: "var(--surface-raised)",
                    color: "var(--text)",
                    outline: "none",
                  }}
                  onKeyDown={(e) => e.key === "Enter" && saveNamedDraft(saveName || currentName)}
                />
                <button
                  type="button"
                  onClick={() => saveNamedDraft(saveName || currentName)}
                  style={{
                    background: "var(--accent)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </div>
            </div>

            {/* List Saved CVs */}
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
              Load Draft
            </span>
            {drafts.length === 0 ? (
              <p style={{ fontSize: 12, color: "var(--text-faint)", textAlign: "center", padding: "12px 0" }}>
                No saved drafts yet.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 200, overflowY: "auto" }}>
                {drafts.map((d) => (
                  <div
                    key={d.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 10px",
                      borderRadius: 6,
                      border: "1px solid var(--border)",
                      background: "var(--surface-raised)",
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1, marginRight: 8 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {d.name}
                      </p>
                      <p style={{ fontSize: 10, color: "var(--text-faint)", margin: 0 }}>
                        {new Date(d.savedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        type="button"
                        onClick={() => loadDraft(d)}
                        style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                      >
                        Load
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteDraft(d.id)}
                        style={{ background: "none", border: "none", color: "var(--danger)", fontSize: 12, cursor: "pointer" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setMarkdown(SAMPLE_CV);
                setCurrentName("Untitled CV");
                setShowDrafts(false);
              }}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                fontSize: 12,
                cursor: "pointer",
                marginTop: 16,
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              Start New / Reset to Sample
            </button>
          </div>
        </div>
      )}
    </div>
  );
}