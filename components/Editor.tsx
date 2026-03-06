"use client";

import { useState } from "react";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const MARKDOWN_HELP = [
  { syntax: "# Heading 1", note: "H1 — your name" },
  { syntax: "## Heading 2", note: "H2 — section" },
  { syntax: "### Heading 3", note: "H3 — role / sub" },
  { syntax: "**bold**", note: "Bold text" },
  { syntax: "*italic*", note: "Italic text" },
  { syntax: "- item", note: "Bullet list" },
  { syntax: "[text](url)", note: "Link" },
  { syntax: "---", note: "Horizontal rule" },
];

export default function Editor({ value, onChange }: EditorProps) {
  const [showHelp, setShowHelp] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") onChange(text);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Insert 2 spaces on Tab instead of moving focus
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = value.slice(0, start) + "  " + value.slice(end);
      onChange(next);
      // Restore cursor position after React re-render
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[var(--card-border)] bg-[var(--background)]/50 shrink-0">
        <span className="text-sm font-semibold text-[var(--foreground)]">Markdown</span>
        <div className="flex items-center gap-2">
          {/* Markdown help toggle */}
          <button
            type="button"
            onClick={() => setShowHelp((v) => !v)}
            aria-label="Toggle Markdown syntax guide"
            aria-expanded={showHelp}
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
              showHelp
                ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--accent)]"
                : "border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/30"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Syntax
          </button>
          {/* Upload .md */}
          <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload .md
            <input
              type="file"
              accept=".md,text/markdown,text/plain"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      {/* Markdown syntax quick-reference */}
      {showHelp && (
        <div className="shrink-0 px-4 py-3 border-b border-[var(--card-border)] bg-[var(--background)]/70">
          <p className="text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wider">
            Markdown quick reference
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            {MARKDOWN_HELP.map(({ syntax, note }) => (
              <div key={syntax} className="flex items-center gap-2 text-xs">
                <code className="font-[family-name:var(--font-geist-mono)] text-[var(--accent)] bg-[var(--accent)]/8 px-1.5 py-0.5 rounded">
                  {syntax}
                </code>
                <span className="text-[var(--muted)]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Textarea */}
      <textarea
        className="flex-1 w-full p-4 font-[family-name:var(--font-geist-mono)] text-sm leading-relaxed border-0 focus:ring-0 focus:outline-none resize-none bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Paste, type, or upload a .md file… (Tab inserts 2 spaces)"
        spellCheck={false}
        aria-label="Markdown content editor"
      />
    </div>
  );
}
