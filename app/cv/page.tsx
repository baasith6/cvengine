"use client";

import { useState, useEffect } from "react";
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
  { id: "classic", label: "Classic" },
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" },
];

export default function CvBuilderPage() {
  const [markdown, setMarkdown] = useState(SAMPLE_CV);
  
  // Desktop Modes: "editor" | "split" | "preview" | "ats"
  const [desktopMode, setDesktopMode] = useState<"editor" | "split" | "preview" | "ats">("split");
  
  // Mobile Tabs: "editor" | "preview" | "ats"
  const [mobileTab, setMobileTab] = useState<"editor" | "preview" | "ats">("editor");
  
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [template, setTemplate] = useState("classic");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [currentName, setCurrentName] = useState("Untitled CV");
  const [showDrafts, setShowDrafts] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [savedMsg, setSavedMsg] = useState(false);

  // Load saved draft + template
  useEffect(() => {
    if (draftLoaded) return;
    try {
      const saved = localStorage.getItem(CV_DRAFT_KEY);
      if (saved) setMarkdown(saved);
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

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)", overflow: "hidden" }}>
      {/* 1. Navbar (Clean, no duplicates) */}
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

            {/* Export Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <DownloadWordButton markdown={markdown} downloadFilename={`${currentName.toLowerCase().replace(/\s+/g, "-")}.docx`} />
              <DownloadPdfButton markdown={markdown} template={template} downloadFilename={`${currentName.toLowerCase().replace(/\s+/g, "-")}.pdf`} />
            </div>
          </div>
        </div>
      </header>

      {/* 3. Segmented View Controller (Desktop Mode Tabs / Mobile Tabs) */}
      <div style={{
        background: "var(--surface-raised)",
        borderBottom: "1px solid var(--border)",
        padding: "6px 24px",
        flexShrink: 0,
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* Desktop segmented controls */}
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

          <span style={{ fontSize: 11, color: "var(--text-faint)" }} className="hidden lg:inline">
            Press Tab in editor to insert 2 spaces
          </span>
        </div>
      </div>

      {/* 4. Main Split Workspace Layout (Internal Scrollable Columns) */}
      <main style={{
        flex: 1,
        minHeight: 0, /* crucial for internal flex scroll */
        position: "relative",
      }}>
        {/* Desktop View rendering logic */}
        <div className="hidden lg:grid" style={{
          height: "100%",
          gridTemplateColumns:
            desktopMode === "editor" ? "1fr" :
            desktopMode === "preview" ? "1fr" : "1fr 1fr",
        }}>
          {/* Column Left: Editor (shows in editor, split, and ats modes) */}
          {(desktopMode === "editor" || desktopMode === "split" || desktopMode === "ats") && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              borderRight: desktopMode === "editor" ? "none" : "1px solid var(--border)",
              background: "var(--surface)",
              minHeight: 0,
            }}>
              <Editor value={markdown} onChange={setMarkdown} snippets={CV_SNIPPETS} />
            </div>
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
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile View rendering logic */}
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
              />
            </div>
          )}
        </div>
      </main>

      {/* 5. Minimal Compact Footer */}
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

      {/* 6. Drafts Modal Overlay */}
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