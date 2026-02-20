"use client";

import { useState } from "react";
import Link from "next/link";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import FooterNav from "@/components/FooterNav";
import { SAMPLE_COVER_LETTER } from "@/lib/sample-cover-letter";

export default function CoverLetterPage() {
  const [markdown, setMarkdown] = useState(SAMPLE_COVER_LETTER);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <header className="border-b border-[var(--card-border)] bg-[var(--card)]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link href="/" className="block">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  CVEngine
                </h1>
                <p className="text-sm text-[var(--muted)] mt-0.5">
                  Cover letter from Markdown
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-3 text-sm" aria-label="Main">
                <Link href="/" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">CV</Link>
                <Link href="/keyword-checker" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Keyword checker</Link>
                <Link href="/snippets" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Snippets</Link>
                <Link href="/about" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">About</Link>
                <Link href="/privacy" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Privacy</Link>
                <Link href="/contact" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Contact</Link>
                <Link href="/terms" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Terms</Link>
              </nav>
              <DownloadPdfButton
                markdown={markdown}
                downloadFilename="cover-letter-ats.pdf"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-8.5rem)] min-h-[420px]">
          <section
            className="flex flex-col min-h-0 rounded-xl overflow-hidden shadow-sm border border-[var(--card-border)] bg-[var(--card)]"
            aria-label="Cover letter editor"
          >
            <Editor value={markdown} onChange={setMarkdown} />
          </section>
          <section
            className="flex flex-col min-h-0 rounded-xl overflow-hidden shadow-sm border border-[var(--card-border)] bg-[var(--card)]"
            aria-label="Cover letter preview"
          >
            <Preview markdown={markdown} />
          </section>
        </div>
        <footer className="mt-6 text-center text-sm text-[var(--muted)]">
          <Link href="/" className="text-[var(--accent)] hover:underline">
            Build your CV with CVEngine
          </Link>
        </footer>
        <FooterNav />
      </main>
    </div>
  );
}
