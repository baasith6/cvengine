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

const WORDS_PER_PAGE = 350;

export default function Editor({ value, onChange, snippets }: EditorProps) {
  const [showHelp, setShowHelp]         = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);
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

  const coreSnippets     = snippets?.filter((s) => s.category === "Core")     ?? [];
  const optionalSnippets = snippets?.filter((s) => s.category === "Optional") ?? [];

  // Stats
  const words = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
  const pages = words === 0 ? 0 : Math.ceil(words / WORDS_PER_PAGE);

  const btnStyle = (active: boolean): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "3px 8px",
    fontSize: 12,
    fontWeight: 500,
    borderRadius: 5,
    border: "1px solid",
    borderColor: active ? "var(--accent)" : "var(--border)",
    background: active ? "var(--accent-bg)" : "transparent",
    color: active ? "var(--accent)" : "var(--text-muted)",
    cursor: "pointer",
    transition: "all 0.1s",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Toolbar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 12px",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        flexShrink: 0,
        gap: 8,
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Markdown
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {snippets && snippets.length > 0 && (
            <button type="button" style={btnStyle(showSnippets)}
              onClick={() => { setShowSnippets(v => !v); setShowHelp(false); }}
              aria-expanded={showSnippets}
            >
              <svg width={11} height={11} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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
          <label style={{ ...btnStyle(false), cursor: "pointer" }}>
            <svg width={11} height={11} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload
            <input type="file" accept=".md,text/markdown,text/plain" style={{ display: "none" }} onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      {/* Syntax reference */}
      {showHelp && (
        <div className="anim-slide-down" style={{
          padding: "10px 12px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface-raised)",
          flexShrink: 0,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px" }}>
            {MARKDOWN_HELP.map(({ syntax, note }) => (
              <div key={syntax} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                <code style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "1px 5px",
                  borderRadius: 4,
                  color: "var(--accent)",
                }}>
                  {syntax}
                </code>
                <span style={{ color: "var(--text-muted)" }}>{note}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Snippets panel */}
      {showSnippets && snippets && (
        <div className="anim-slide-down" style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--surface-raised)",
          overflowY: "auto",
          maxHeight: 196,
          flexShrink: 0,
        }}>
          {coreSnippets.length > 0 && (
            <div style={{ padding: "8px 12px 4px" }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Core</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
                {coreSnippets.map((s) => (
                  <button key={s.id} type="button" onClick={() => insertSnippet(s.markdown)}
                    style={{
                      textAlign: "left", padding: "6px 8px", borderRadius: 5,
                      border: "1px solid var(--border)", background: "var(--surface)",
                      fontSize: 12, fontWeight: 500, color: "var(--text)",
                      cursor: "pointer", transition: "border-color 0.1s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          )}
          {optionalSnippets.length > 0 && (
            <div style={{ padding: "4px 12px 10px" }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6, marginTop: 8 }}>Optional</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
                {optionalSnippets.map((s) => (
                  <button key={s.id} type="button" onClick={() => insertSnippet(s.markdown)}
                    style={{
                      textAlign: "left", padding: "6px 8px", borderRadius: 5,
                      border: "1px solid var(--border)", background: "var(--surface)",
                      fontSize: 12, fontWeight: 500, color: "var(--text)",
                      cursor: "pointer", transition: "border-color 0.1s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Paste, type, or upload a .md file…"
        spellCheck={false}
        aria-label="Markdown content editor"
        style={{
          flex: 1,
          width: "100%",
          padding: "14px 16px",
          fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace",
          fontSize: 13,
          lineHeight: 1.7,
          border: "none",
          outline: "none",
          resize: "none",
          background: "var(--surface-raised)",
          color: "var(--text)",
        }}
      />

      {/* Stats bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 12px",
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, color: "var(--text-faint)" }}>
          <b style={{ color: "var(--text-muted)", fontWeight: 500 }}>{words.toLocaleString()}</b> words
        </span>
        <span style={{
          fontSize: 11,
          fontWeight: 500,
          color: pages > 2 ? "var(--warning)" : pages > 3 ? "var(--danger)" : "var(--text-faint)",
        }}>
          {pages === 0 ? "—" : pages === 1 ? "~1 page" : `~${pages} pages`}
          {pages > 2 && <span style={{ fontWeight: 400, color: "var(--text-faint)", marginLeft: 4 }}>(aim for 1–2)</span>}
        </span>
      </div>
    </div>
  );
}