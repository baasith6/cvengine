"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import FooterNav from "@/components/FooterNav";
import BackToTools from "@/components/BackToTools";
import { checkKeywords } from "@/lib/keyword-check";

type Result = ReturnType<typeof checkKeywords>;

function ScoreRing({ score }: { score: number }) {
  const color =
    score >= 70 ? "text-emerald-500" : score >= 40 ? "text-amber-500" : "text-red-500";
  return (
    <div className={`text-4xl font-bold tabular-nums ${color}`}>
      {score}%
    </div>
  );
}

function KeywordChips({ words, variant }: { words: string[]; variant: "match" | "missing" }) {
  const base =
    variant === "match"
      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";

  if (words.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {words.map((w) => (
        <span
          key={w}
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${base}`}
        >
          {w}
        </span>
      ))}
    </div>
  );
}

function ResultsPanel({ result }: { result: Result }) {
  const total = result.inCv.length + result.missing.length;
  const score = total > 0 ? Math.round((result.inCv.length / total) * 100) : 0;

  return (
    <div className="mt-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">Results</h2>

      {/* Score + stats row */}
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-col items-center gap-0.5">
          <ScoreRing score={score} />
          <p className="text-xs text-[var(--muted)]">match score</p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
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
          <div>
            <p className="text-[var(--muted)]">Keywords found</p>
            <p className="font-medium text-emerald-600 dark:text-emerald-400">
              {result.inCv.length} / {total}
            </p>
          </div>
          <div>
            <p className="text-[var(--muted)]">Keywords missing</p>
            <p className="font-medium text-red-600 dark:text-red-400">
              {result.missing.length} / {total}
            </p>
          </div>
        </div>
      </div>

      {/* Matched keywords */}
      {result.inCv.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Found in your CV{" "}
            <span className="font-normal text-[var(--muted)]">({result.inCv.length})</span>
          </p>
          <KeywordChips words={result.inCv} variant="match" />
        </div>
      )}

      {/* Missing keywords */}
      <div>
        <p className="text-sm font-semibold text-[var(--foreground)]">
          Missing from your CV{" "}
          <span className="font-normal text-[var(--muted)]">({result.missing.length})</span>
        </p>
        {result.missing.length > 0 ? (
          <>
            <KeywordChips words={result.missing} variant="missing" />
            <p className="text-xs text-[var(--muted)] mt-3">
              Consider adding these keywords naturally to your CV, then{" "}
              <Link href="/cv" className="text-[var(--accent)] underline">
                rebuild it
              </Link>
              .
            </p>
          </>
        ) : (
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
            All job keywords appear in your CV.
          </p>
        )}
      </div>
    </div>
  );
}

export default function KeywordCheckerPage() {
  const [jobAd, setJobAd] = useState("");
  const [cvText, setCvText] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const runCheck = () => {
    if (!jobAd.trim() || !cvText.trim()) return;
    setResult(checkKeywords(jobAd, cvText));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <SiteHeader />
      <main id="main-content" className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackToTools />
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
            CV keyword checker
          </h1>
          <p className="text-[var(--muted)] text-sm mt-2 max-w-xl mx-auto">
            Paste the job ad and your CV. See which keywords match and which are missing.
            All in your browser—nothing is sent to our server.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label htmlFor="job-ad" className="text-sm font-medium text-[var(--foreground)] mb-2">
              Job description
            </label>
            <textarea
              id="job-ad"
              className="flex-1 min-h-[180px] p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm resize-y focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-shadow"
              placeholder="Paste the job posting here..."
              value={jobAd}
              onChange={(e) => setJobAd(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cv-text" className="text-sm font-medium text-[var(--foreground)] mb-2">
              Your CV (plain text)
            </label>
            <textarea
              id="cv-text"
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
          disabled={!jobAd.trim() || !cvText.trim()}
          className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check keywords
        </button>

        {result && <ResultsPanel result={result} />}

        <FooterNav />
      </main>
    </div>
  );
}
