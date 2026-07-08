"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import DownloadWordButton from "@/components/DownloadWordButton";
import SiteHeader from "@/components/SiteHeader";
import FooterNav from "@/components/FooterNav";
import BackToTools from "@/components/BackToTools";
import { SAMPLE_COVER_LETTER } from "@/lib/sample-cover-letter";

const CL_DRAFT_KEY = "cvengine_cl_draft";

export default function CoverLetterPage() {
  const [markdown, setMarkdown] = useState(SAMPLE_COVER_LETTER);
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");
  const [draftLoaded, setDraftLoaded] = useState(false);

  // Load saved draft on mount
  useEffect(() => {
    if (draftLoaded) return;
    try {
      const saved = localStorage.getItem(CL_DRAFT_KEY);
      if (saved) setMarkdown(saved);
    } catch {
      // ignore
    }
    setDraftLoaded(true);
  }, [draftLoaded]);

  // Auto-save with 800ms debounce
  useEffect(() => {
    if (!draftLoaded) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(CL_DRAFT_KEY, markdown);
      } catch {
        // ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [markdown, draftLoaded]);

  const downloadButtons = (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <DownloadWordButton markdown={markdown} downloadFilename="cover-letter-ats.docx" />
      <DownloadPdfButton markdown={markdown} downloadFilename="cover-letter-ats.pdf" />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <SiteHeader rightAction={downloadButtons} />

      <main style={{ flex: 1, maxWidth: 1280, width: "100%", margin: "0 auto", padding: "16px 24px 40px" }}>
        
        {/* Navigation & Controls */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <BackToTools />
          
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text-muted)" }}>
              Cover Letter Builder
            </span>
          </div>
        </div>

        {/* Mobile Buttons */}
        <div className="md:hidden" style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          {downloadButtons}
        </div>

        {/* Mobile View Switcher */}
        <div className="lg:hidden" style={{
          display: "flex",
          border: "1px solid var(--border)",
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 12,
          background: "var(--surface)",
        }}>
          <button
            type="button"
            onClick={() => setMobileTab("editor")}
            style={{
              flex: 1,
              padding: "8px 0",
              fontSize: 13,
              fontWeight: 600,
              background: mobileTab === "editor" ? "var(--surface-raised)" : "transparent",
              color: mobileTab === "editor" ? "var(--accent)" : "var(--text-muted)",
              border: "none",
              cursor: "pointer",
            }}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("preview")}
            style={{
              flex: 1,
              padding: "8px 0",
              fontSize: 13,
              fontWeight: 600,
              background: mobileTab === "preview" ? "var(--surface-raised)" : "transparent",
              color: mobileTab === "preview" ? "var(--accent)" : "var(--text-muted)",
              border: "none",
              cursor: "pointer",
            }}
          >
            Preview
          </button>
        </div>

        {/* Editor and Preview Split Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 16,
          height: "calc(100vh - 200px)",
          minHeight: 450,
        }} className="lg:grid-cols-2">
          {/* Editor block */}
          <div
            className={mobileTab !== "editor" ? "hidden lg:flex" : "flex"}
            style={{
              flexDirection: "column",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            <Editor value={markdown} onChange={setMarkdown} />
          </div>

          {/* Preview block */}
          <div
            className={mobileTab !== "preview" ? "hidden lg:flex" : "flex"}
            style={{
              flexDirection: "column",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            <Preview markdown={markdown} />
          </div>
        </div>

      </main>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 0", background: "var(--surface)", marginTop: "auto" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <FooterNav />
        </div>
      </footer>
    </div>
  );
}