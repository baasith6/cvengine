"use client";

import { useState } from "react";
import Link from "next/link";
import FooterNav from "@/components/FooterNav";
import { checkKeywords } from "@/lib/keyword-check";

export default function KeywordCheckerPage() {
  const [jobAd, setJobAd] = useState("");
  const [cvText, setCvText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof checkKeywords> | null>(
    null
  );

  const runCheck = () => {
    setResult(checkKeywords(jobAd, cvText));
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
            <Link href="/snippets" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Snippets</Link>
            <Link href="/about" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">About</Link>
            <Link href="/privacy" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Privacy</Link>
            <Link href="/contact" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Contact</Link>
            <Link href="/terms" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Terms</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          CV keyword checker
        </h1>
        <p className="text-[var(--muted)] text-sm mb-6">
          Paste the job description and your CV (plain text). We&apos;ll show word counts and which job keywords appear in your CV or are missing. All processing runs in your browser; nothing is sent to our server.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[var(--foreground)] mb-2">
              Job description / ad
            </label>
            <textarea
              className="flex-1 min-h-[180px] p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm resize-y"
              placeholder="Paste the job posting text here..."
              value={jobAd}
              onChange={(e) => setJobAd(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[var(--foreground)] mb-2">
              Your CV (paste as text)
            </label>
            <textarea
              className="flex-1 min-h-[180px] p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm resize-y"
              placeholder="Paste your CV text here..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={runCheck}
          className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors mb-6"
        >
          Check keywords
        </button>
        {result && (
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Results
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[var(--muted)]">Job ad</p>
                <p className="font-medium text-[var(--foreground)]">
                  {result.jobWordCount} words, {result.jobCharCount} characters
                </p>
              </div>
              <div>
                <p className="text-[var(--muted)]">Your CV</p>
                <p className="font-medium text-[var(--foreground)]">
                  {result.cvWordCount} words, {result.cvCharCount} characters
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--foreground)] mb-1">
                Keywords in your CV ({result.inCv.length})
              </p>
              <p className="text-sm text-[var(--muted)]">
                {result.inCv.length > 0
                  ? result.inCv.join(", ")
                  : "None detected (try pasting more CV text)."}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--foreground)] mb-1">
                Keywords missing from your CV ({result.missing.length})
              </p>
              <p className="text-sm text-[var(--muted)]">
                {result.missing.length > 0
                  ? result.missing.join(", ")
                  : "All job keywords appear in your CV."}
              </p>
            </div>
            <p className="text-xs text-[var(--muted)]">
              Tip: Add missing keywords naturally where they fit.{" "}
              <Link href="/" className="text-[var(--accent)] underline">
                Build your CV with CVEngine
              </Link>
            </p>
          </div>
        )}
        <FooterNav />
      </main>
    </div>
  );
}
