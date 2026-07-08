"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@/components/CookieConsentContext";
import { trackEvent } from "@/lib/telemetry/track";

type DownloadPdfButtonProps = {
  markdown: string;
  disabled?: boolean;
  downloadFilename?: string;
  template?: string;
};

export default function DownloadPdfButton({
  markdown,
  disabled = false,
  downloadFilename = "cv-ats.pdf",
  template = "classic",
}: DownloadPdfButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const { hasConsent } = useConsent();
  const enabled = hasConsent === true;

  const handleDownload = async () => {
    if (!markdown.trim()) {
      setError("Add some content first.");
      return;
    }
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      trackEvent({
        name: "export:pdf:request",
        path: pathname || "/",
        enabled,
      });
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown, template }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Export failed (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = downloadFilename;
      a.click();
      URL.revokeObjectURL(url);
      trackEvent({
        name: "export:pdf:success",
        path: pathname || "/",
        enabled,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      trackEvent({
        name: "export:pdf:error",
        path: pathname || "/",
        enabled,
      });
      setError(err instanceof Error ? err.message : "Download failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
      <button
        type="button"
        onClick={handleDownload}
        disabled={disabled || loading}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 12px",
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 600,
          background: "var(--accent)",
          color: "#ffffff",
          border: "none",
          cursor: "pointer",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent)"}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating...
          </>
        ) : success ? (
          <>
            <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Downloaded!
          </>
        ) : (
          <>
            <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {downloadFilename.includes("cover") ? "PDF Cover Letter" : "Download PDF"}
          </>
        )}
      </button>
      {error && <p style={{ fontSize: 11, color: "var(--danger)", margin: 0 }}>{error}</p>}
    </div>
  );
}