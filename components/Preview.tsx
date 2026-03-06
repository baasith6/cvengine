"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type PreviewProps = {
  markdown: string;
};

export default function Preview({ markdown }: PreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-[100] flex flex-col bg-[var(--card)] border border-[var(--card-border)]"
          : "h-full flex flex-col"
      }
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--card-border)] bg-[var(--background)]/50 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--foreground)]">Preview</span>
          <span className="text-xs text-[var(--muted)] bg-[var(--card-border)]/50 px-1.5 py-0.5 rounded">
            Approximate — PDF may differ slightly
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsFullscreen((v) => !v)}
          aria-label={isFullscreen ? "Exit full-screen preview" : "Full-screen preview"}
          title={isFullscreen ? "Exit full screen" : "Full screen"}
          className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)]/40 transition-colors"
        >
          {isFullscreen ? (
            /* Compress icon */
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25"
              />
            </svg>
          ) : (
            /* Expand icon */
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Rendered preview */}
      <div className="flex-1 overflow-auto p-5 min-h-[200px] text-[var(--foreground)] [&_h1]:text-xl [&_h1]:font-bold [&_h1]:border-b [&_h1]:border-[var(--card-border)] [&_h1]:pb-2 [&_h1]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1 [&_p]:my-2 [&_ul]:my-2 [&_ul]:pl-5 [&_li]:my-0.5 [&_a]:text-[var(--accent)] [&_a]:underline [&_strong]:font-semibold [&_hr]:border-[var(--card-border)] [&_hr]:my-3">
        {markdown ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        ) : (
          <p className="text-[var(--muted)]">Nothing to preview yet.</p>
        )}
      </div>
    </div>
  );
}
