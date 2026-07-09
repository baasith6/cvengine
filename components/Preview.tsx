"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type PreviewProps = {
  markdown: string;
};

export default function Preview({ markdown }: PreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<"single" | "double" | "grid">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setContainerSize({ w: entries[0].contentRect.width, h: entries[0].contentRect.height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const sw = entries[0].target.scrollWidth;
      const count = Math.max(1, Math.round((sw + 32) / 826));
      setTotalPages(count);
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [markdown]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const handlePrev = () => setCurrentPage(p => Math.max(1, p - (viewMode === "double" ? 2 : 1)));
  const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + (viewMode === "double" ? 2 : 1)));

  // Calculate perfect scale so the "window" always fits on screen
  let scale = 1;
  if (containerSize.w > 0 && containerSize.h > 0) {
    const padW = 64;
    const padH = 64;
    if (viewMode === "grid") {
      const targetW = totalPages * 826 - 32;
      scale = Math.min((containerSize.w - padW) / targetW, (containerSize.h - padH) / 1123, 1);
    } else if (viewMode === "double") {
      const targetW = 826 * 2 - 32;
      scale = Math.min((containerSize.w - padW) / targetW, (containerSize.h - padH) / 1123, 1);
    } else {
      const targetW = 794;
      scale = Math.min((containerSize.w - padW) / targetW, (containerSize.h - padH) / 1123, 1);
    }
    scale = Math.max(0.1, scale);
  }

  const translateX = viewMode === "grid" 
    ? 0 
    : (Math.floor((currentPage - 1) / (viewMode === "double" ? 2 : 1))) * (viewMode === "double" ? 1652 : 826);

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-[100] flex flex-col bg-[var(--surface-raised)]"
          : "h-full flex flex-col"
      }
      style={{ background: "var(--surface-raised)", minHeight: 0 }}
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
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Preview
          </span>
          {totalPages > 0 && (
            <span style={{ fontSize: 10.5, color: "var(--text-faint)" }}>
              {totalPages === 1 ? "1 Page output" : `~${totalPages} Pages output`}
            </span>
          )}
        </div>

        {/* Zoom & Fullscreen Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          
          {/* Pagination Controls */}
          {viewMode !== "grid" && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button 
                type="button"
                onClick={handlePrev} 
                disabled={currentPage === 1} 
                style={{ padding: "2px 8px", fontSize: 11, cursor: currentPage === 1 ? "default" : "pointer", opacity: currentPage === 1 ? 0.4 : 1, border: "1px solid var(--border)", background: "var(--surface)", borderRadius: 4 }}
              >
                &larr;
              </button>
              <span style={{ fontSize: 10.5, color: "var(--text-muted)", minWidth: 40, textAlign: "center" }}>
                {currentPage} / {totalPages}
              </span>
              <button 
                type="button"
                onClick={handleNext} 
                disabled={currentPage >= totalPages} 
                style={{ padding: "2px 8px", fontSize: 11, cursor: currentPage >= totalPages ? "default" : "pointer", opacity: currentPage >= totalPages ? 0.4 : 1, border: "1px solid var(--border)", background: "var(--surface)", borderRadius: 4 }}
              >
                &rarr;
              </button>
            </div>
          )}

          {/* View Mode Selector */}
          <div style={{
            display: "flex",
            background: "var(--surface-raised)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: 2,
            gap: 2,
          }}>
            <button
              type="button"
              onClick={() => setViewMode("single")}
              style={{
                border: "none",
                borderRadius: 4,
                padding: "2px 6px",
                fontSize: 10,
                fontWeight: 600,
                cursor: "pointer",
                background: viewMode === "single" ? "var(--surface)" : "transparent",
                color: viewMode === "single" ? "var(--text)" : "var(--text-muted)",
              }}
            >
              1 Page
            </button>
            <button
              type="button"
              onClick={() => setViewMode("double")}
              style={{
                border: "none",
                borderRadius: 4,
                padding: "2px 6px",
                fontSize: 10,
                fontWeight: 600,
                cursor: "pointer",
                background: viewMode === "double" ? "var(--surface)" : "transparent",
                color: viewMode === "double" ? "var(--text)" : "var(--text-muted)",
              }}
            >
              2 Pages
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              style={{
                border: "none",
                borderRadius: 4,
                padding: "2px 6px",
                fontSize: 10,
                fontWeight: 600,
                cursor: "pointer",
                background: viewMode === "grid" ? "var(--surface)" : "transparent",
                color: viewMode === "grid" ? "var(--text)" : "var(--text-muted)",
              }}
            >
              All
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsFullscreen((v) => !v)}
            aria-label={isFullscreen ? "Exit full-screen preview" : "Full-screen preview"}
            title={isFullscreen ? "Exit full screen" : "Full screen"}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              cursor: "pointer",
              padding: "4px 6px",
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
      </div>

      {/* Rendered preview with Actual Distinct A4 Mock Pages */}
      <div 
        ref={containerRef}
        style={{
          flex: 1,
          overflow: "hidden", // No native scrolling! We translate manually!
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Perfectly center the visible pages
          backgroundColor: "var(--surface-raised)",
          minHeight: 0,
        }}
      >
        {/* Scaled Window */}
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          width: viewMode === "grid" ? `${totalPages * 826 - 32}px` : (viewMode === "double" ? "1620px" : "794px"),
          height: "1123px",
          position: "relative",
          transition: "width 0.3s ease",
        }}>
          {/* The Sliding Track */}
          <div
            ref={contentRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "1123px",
              columnWidth: "794px",
              columnGap: "32px",
              columnFill: "auto",
              width: "max-content",
              transform: `translateX(-${translateX}px)`,
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              // Draw the white pages using a repeating linear gradient!
              backgroundImage: "repeating-linear-gradient(to right, #ffffff, #ffffff 794px, transparent 794px, transparent 826px)",
              backgroundAttachment: "local",
              filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08))",
              color: "#111111",
              textAlign: "left",
            }}
          >
            {/* The Markdown Content Wrapper */}
            <div 
              style={{
                height: "100%",
                paddingTop: "56px",
                paddingBottom: "56px",
                boxSizing: "border-box",
              }}
              className="[&>*]:mx-[64px] [&_h1]:text-lg [&_h1]:font-bold [&_h1]:border-b [&_h1]:border-gray-200 [&_h1]:pb-1.5 [&_h1]:mb-3 [&_h1]:text-center [&_h1]:text-gray-900 [&_h2]:text-xs [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:border-b [&_h2]:border-gray-100 [&_h2]:pb-0.5 [&_h2]:text-gray-800 [&_h2]:tracking-wider [&_h2]:uppercase [&_h3]:text-xs [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-0.5 [&_h3]:text-gray-850 [&_p]:my-1 [&_p]:text-xs [&_p]:leading-relaxed [&_p]:text-gray-700 [&_ul]:my-1 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:my-0.5 [&_li]:text-xs [&_li]:text-gray-700 [&_a]:text-[var(--accent)] [&_a]:underline [&_strong]:font-semibold [&_hr]:border-gray-150 [&_hr]:my-4"
            >
              {markdown ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
              ) : (
                <p style={{ color: "var(--text-faint)" }}>Nothing to preview yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}