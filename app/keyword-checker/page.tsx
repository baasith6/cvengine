"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import FooterNav from "@/components/FooterNav";
import BackToTools from "@/components/BackToTools";
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
      <SiteHeader />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackToTools />
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
            CV keyword checker
          </h1>
          <p className="text-[var(--muted)] text-sm mt-2 max-w-xl mx-auto">
            Paste the job ad and your CV. See which keywords match and which are missing. All in your browser—nothing is sent to our server.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[var(--foreground)] mb-2">
              Job description
            </label>
            <textarea
              className="flex-1 min-h-[180px] p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm resize-y focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-shadow"
              placeholder="Paste the job posting here..."
              value={jobAd}
              onChange={(e) => setJobAd(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[var(--foreground)] mb-2">
              Your CV (plain text)
            </label>
            <textarea
              className="flex-1 min-h-[180px] p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm resize-y focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-shadow"
              placeholder="Paste your CV text here..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={runCheck}
          className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors shadow-sm hover:shadow-md"
        >
          Check keywords
        </button>
        {result && (
          <div className="mt-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Results
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[var(--muted)]">Job ad</p>
                <p className="font-medium text-[var(--foreground)]">
                  {result.jobWordCount} words · {result.jobCharCount} chars
                </p>
              </div>
              <div>
                <p className="text-[var(--muted)]">Your CV</p>
                <p className="font-medium text-[var(--foreground)]">
                  {result.cvWordCount} words · {result.cvCharCount} chars
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--foreground)] mb-1">
                In your CV ({result.inCv.length})
              </p>
              <p className="text-sm text-[var(--muted)]">
                {result.inCv.length > 0
                  ? result.inCv.join(", ")
                  : "None detected."}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--foreground)] mb-1">
                Missing ({result.missing.length})
              </p>
              <p className="text-sm text-[var(--muted)]">
                {result.missing.length > 0
                  ? result.missing.join(", ")
                  : "All job keywords appear in your CV."}
              </p>
            </div>
            <p className="text-xs text-[var(--muted)] pt-2">
              <Link href="/cv" className="text-[var(--accent)] underline">
                Build your CV
              </Link>
            </p>
          </div>
        )}
        <FooterNav />
      </main>
    </div>
  );
}
