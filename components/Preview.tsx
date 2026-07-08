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
          ? "fixed inset-0 z-[100] flex flex-col bg-[var(--surface-raised)]"
          : "h-full flex flex-col"
      }
      style={{ background: "var(--surface-raised)" }}
    >
      {/* Toolbar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 12px",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Preview
        </span>
        <button
          type="button"
          onClick={() => setIsFullscreen((v) => !v)}
          aria-label={isFullscreen ? "Exit full-screen preview" : "Full-screen preview"}
          title={isFullscreen ? "Exit full screen" : "Full screen"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            borderRadius: 6,
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {isFullscreen ? (
            <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25"
              />
            </svg>
          ) : (
            <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Rendered preview with Centered A4 Mock Page */}
      <div 
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "794px", /* A4 scale equivalent width at 96 dpi */
            minHeight: "1123px", /* A4 scale equivalent height */
            background: "#ffffff",
            color: "#111111",
            padding: "48px 56px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
            border: "1px solid var(--border)",
            borderRadius: 4,
            boxSizing: "border-box",
            textAlign: "left",
          }}
          className="[&_h1]:text-lg [&_h1]:font-bold [&_h1]:border-b [&_h1]:border-gray-200 [&_h1]:pb-1.5 [&_h1]:mb-3 [&_h1]:text-center [&_h1]:text-gray-900 [&_h2]:text-xs [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:border-b [&_h2]:border-gray-100 [&_h2]:pb-0.5 [&_h2]:text-gray-800 [&_h2]:tracking-wider [&_h2]:uppercase [&_h3]:text-xs [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-0.5 [&_h3]:text-gray-850 [&_p]:my-1 [&_p]:text-xs [&_p]:leading-relaxed [&_p]:text-gray-700 [&_ul]:my-1 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:my-0.5 [&_li]:text-xs [&_li]:text-gray-700 [&_a]:text-[var(--accent)] [&_a]:underline [&_strong]:font-semibold [&_hr]:border-gray-150 [&_hr]:my-4"
        >
          {markdown ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          ) : (
            <p style={{ color: "var(--text-faint)" }}>Nothing to preview yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}