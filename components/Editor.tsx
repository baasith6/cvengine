"use client";

import { useState, useRef } from "react";
import type { Snippet } from "@/lib/cv-snippets";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  snippets?: Snippet[];
};

const MARKDOWN_HELP = [
  { syntax: "# Name",      note: "H1 — your name" },
  { syntax: "## Section",  note: "H2 — section title" },
  { syntax: "**bold**",    note: "Bold" },
  { syntax: "- item",      note: "Bullet list" },
  { syntax: "---",         note: "Divider" },
  { syntax: "[text](url)", note: "Link" },
];

export default function Editor({ value, onChange, snippets }: EditorProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Professional Summary");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // File upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") onChange(ev.target.result);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Tab key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const el = e.currentTarget;
    const { selectionStart: s, selectionEnd: end } = el;
    onChange(value.slice(0, s) + "  " + value.slice(end));
    requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s + 2; });
  };

  // Insert snippet at cursor
  const insertSnippet = (md: string) => {
    const el = textareaRef.current;
    const insert = "\n\n" + md + "\n";
    const start = el?.selectionStart ?? value.length;
    onChange(value.slice(0, start) + insert + value.slice(start));
    requestAnimationFrame(() => {
      if (el) { el.selectionStart = el.selectionEnd = start + insert.length; el.focus(); }
    });
    setShowSnippets(false);
  };

  // Categories mapping for drawer
  const categories = [
    { id: "professional-summary", label: "Professional Summary" },
    { id: "work-experience", label: "Work Experience" },
    { id: "projects", label: "Project" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "certifications", label: "Certifications" },
    { id: "awards", label: "Awards" },
    { id: "volunteer", label: "Volunteer Experience" },
  ];

  // Helper to find snippet content matching a category key
  const getActiveSnippet = () => {
    if (!snippets) return null;
    return snippets.find((s) => s.id === selectedCategory || s.title.toLowerCase().includes(selectedCategory.toLowerCase()));
  };

  const activeSnippet = getActiveSnippet();

  const btnStyle = (active: boolean): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 10px",
    fontSize: 12,
    fontWeight: 600,
    borderRadius: 6,
    border: "1px solid",
    borderColor: active ? "var(--accent)" : "var(--border)",
    background: active ? "var(--accent-bg)" : "var(--surface)",
    color: active ? "var(--accent)" : "var(--text-muted)",
    cursor: "pointer",
    transition: "all 0.15s",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", minHeight: 0 }}>
      {/* Toolbar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        flexShrink: 0,
        gap: 8,
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Markdown Editor
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {snippets && snippets.length > 0 && (
            <button type="button" style={btnStyle(showSnippets)}
              onClick={() => { setShowSnippets(v => !v); setShowHelp(false); }}
              aria-expanded={showSnippets}
            >
              <svg width={12} height={12} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Snippets
            </button>
          )}
          <button type="button" style={btnStyle(showHelp)}
            onClick={() => { setShowHelp(v => !v); setShowSnippets(false); }}
            aria-expanded={showHelp}
          >
            Syntax
          </button>
          <label style={{ ...btnStyle(false), cursor: "pointer" }} className="hover-btn-lift">
            <svg width={12} height={12} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload
            <input type="file" accept=".md,text/markdown,text/plain" style={{ display: "none" }} onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div style={{ flex: 1, display: "flex", position: "relative", minHeight: 0 }}>
        
        {/* Code Editor text area */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Start writing your CV in Markdown, upload a .md file, or insert a starter snippet from the drawer..."
          spellCheck={false}
          aria-label="Markdown content editor"
          style={{
            flex: 1,
            width: "100%",
            padding: "16px 20px",
            fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace",
            fontSize: 13,
            lineHeight: 1.7,
            border: "none",
            outline: "none",
            resize: "none",
            background: "var(--bg)",
            color: "var(--text)",
          }}
        />

        {/* Snippets Side Drawer Overlay */}
        {showSnippets && snippets && (
          <div
            className="anim-scale-in"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: 320,
              background: "var(--surface)",
              borderLeft: "1px solid var(--border)",
              boxShadow: "var(--shadow)",
              display: "flex",
              flexDirection: "column",
              zIndex: 10,
            }}
          >
            {/* Drawer Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "1px solid var(--border)",
              background: "var(--surface-raised)",
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>Insert Snippet</span>
              <button
                type="button"
                onClick={() => setShowSnippets(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 12 }}
              >
                ✕
              </button>
            </div>

            {/* Category Selector List */}
            <div style={{
              display: "flex",
              gap: 4,
              overflowX: "auto",
              padding: "8px 12px",
              borderBottom: "1px solid var(--border)",
              whiteSpace: "nowrap",
              flexShrink: 0
            }} className="no-scrollbar">
              {categories.map((cat) => {
                const active = selectedCategory === cat.label;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.label)}
                    style={{
                      background: active ? "var(--accent-bg)" : "transparent",
                      border: "1px solid",
                      borderColor: active ? "var(--accent)" : "var(--border)",
                      color: active ? "var(--accent)" : "var(--text-muted)",
                      padding: "3px 8px",
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Active Snippet Preview / Content Area */}
            <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
              {activeSnippet ? (
                <>
                  <div>
                    <h5 style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", margin: "0 0 4px" }}>
                      {activeSnippet.title}
                    </h5>
                    <p style={{ fontSize: 11.5, color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
                      {activeSnippet.description}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase" }}>Preview</span>
                    <pre style={{
                      flex: 1,
                      background: "var(--surface-raised)",
                      border: "1px solid var(--border)",
                      borderRadius: 6,
                      padding: 10,
                      fontSize: 11,
                      fontFamily: "ui-monospace, monospace",
                      color: "var(--text-muted)",
                      whiteSpace: "pre-wrap",
                      margin: 0,
                      overflowY: "auto"
                    }}>
                      {activeSnippet.markdown}
                    </pre>
                  </div>

                  <button
                    type="button"
                    onClick={() => insertSnippet(activeSnippet.markdown)}
                    style={{
                      background: "var(--accent)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 6,
                      padding: "8px 0",
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    Insert Snippet
                  </button>
                </>
              ) : (
                <div style={{ textAlign: "center", color: "var(--text-faint)", fontSize: 12, padding: "32px 0" }}>
                  Select a category above to load snippets.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Syntax reference drawer */}
        {showHelp && (
          <div
            className="anim-scale-in"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: 300,
              background: "var(--surface)",
              borderLeft: "1px solid var(--border)",
              boxShadow: "var(--shadow)",
              display: "flex",
              flexDirection: "column",
              zIndex: 10,
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "1px solid var(--border)",
              background: "var(--surface-raised)",
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>Markdown Guide</span>
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 12 }}
              >
                ✕
              </button>
            </div>
            <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
              {MARKDOWN_HELP.map(({ syntax, note }) => (
                <div key={syntax} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <code style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 11,
                    background: "var(--surface-raised)",
                    border: "1px solid var(--border)",
                    padding: "4px 8px",
                    borderRadius: 4,
                    color: "var(--accent)",
                    width: "fit-content"
                  }}>
                    {syntax}
                  </code>
                  <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}