"use client";

import { useState } from "react";
import Link from "next/link";
import FooterNav from "@/components/FooterNav";
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
      <header className="border-b border-[var(--card-border)] bg-[var(--card)]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold text-[var(--foreground)] hover:underline">
            CVEngine
          </Link>
          <nav className="flex items-center gap-3 text-sm" aria-label="Main">
            <Link href="/" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">CV</Link>
            <Link href="/cover-letter" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Cover letter</Link>
            <Link href="/keyword-checker" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Keyword checker</Link>
            <Link href="/about" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">About</Link>
            <Link href="/privacy" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Privacy</Link>
            <Link href="/contact" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Contact</Link>
            <Link href="/terms" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Terms</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          CV section snippets
        </h1>
        <p className="text-[var(--muted)] text-sm mb-6">
          Copy Markdown snippets to build your CV. Paste into the{" "}
          <Link href="/" className="text-[var(--accent)] underline">
            CV builder
          </Link>{" "}
          to preview and download an ATS PDF.
        </p>
        <div className="grid gap-4">
          {CV_SNIPPETS.map((snippet) => (
            <div
              key={snippet.id}
              className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">
                  {snippet.title}
                </h2>
                <button
                  type="button"
                  onClick={() => copyToClipboard(snippet.markdown, snippet.id)}
                  className="text-sm font-medium px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors"
                >
                  {copiedId === snippet.id ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-sm text-[var(--muted)] mb-3">
                {snippet.description}
              </p>
              <pre className="text-xs font-mono bg-[var(--background)] p-3 rounded-lg overflow-x-auto text-[var(--foreground)] whitespace-pre-wrap border border-[var(--card-border)]">
                {snippet.markdown}
              </pre>
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] text-center">
          <p className="text-sm text-[var(--foreground)] mb-3">
            Build your full CV with these sections
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            Build your CV with CVEngine
          </Link>
        </div>
        <FooterNav />
      </main>
    </div>
  );
}
