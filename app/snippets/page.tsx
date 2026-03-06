"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import FooterNav from "@/components/FooterNav";
import BackToTools from "@/components/BackToTools";
import { CV_SNIPPETS } from "@/lib/cv-snippets";

export default function SnippetsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <SiteHeader />
      <main id="main-content" className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackToTools />
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
            CV section snippets
          </h1>
          <p className="text-[var(--muted)] text-sm mt-2">
            Copy Markdown, paste into the{" "}
            <Link href="/cv" className="text-[var(--accent)] underline">
              CV builder
            </Link>{" "}
            to preview and download PDF.
          </p>
        </div>
        <div className="space-y-8">
          {(["Core", "Optional"] as const).map((category) => (
            <div key={category}>
              <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-4">
                {category} sections
              </h2>
              <div className="grid gap-5">
                {CV_SNIPPETS.filter((s) => s.category === category).map((snippet) => (
                  <div
                    key={snippet.id}
                    className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {snippet.title}
                </h3>
                <button
                  type="button"
                  onClick={() => copyToClipboard(snippet.markdown, snippet.id)}
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all duration-200 shadow-sm min-w-[100px] justify-center"
                >
                  {copiedId === snippet.id ? (
                    <>
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    "Copy"
                  )}
                </button>
              </div>
              <p className="text-sm text-[var(--muted)] mb-4">
                {snippet.description}
              </p>
              <pre className="text-xs font-mono bg-[var(--background)] p-4 rounded-xl overflow-x-auto text-[var(--foreground)] whitespace-pre-wrap border border-[var(--card-border)]">
                {snippet.markdown}
              </pre>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] text-center shadow-sm">
          <p className="text-sm text-[var(--foreground)] mb-4">
            Build your full CV with these sections
          </p>
          <Link
            href="/cv"
            className="inline-flex items-center px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors shadow-sm hover:shadow-md"
          >
            Build your CV
          </Link>
        </div>
        <FooterNav />
      </main>
    </div>
  );
}
