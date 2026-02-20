"use client";

import { useState } from "react";
import Link from "next/link";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import FooterNav from "@/components/FooterNav";
import { SAMPLE_CV } from "@/lib/sample-cv";

export default function Home() {
  const [markdown, setMarkdown] = useState(SAMPLE_CV);

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
                  Markdown → ATS-ready PDF
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-3 text-sm" aria-label="Main">
                <Link href="/about" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">About</Link>
                <Link href="/privacy" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Privacy</Link>
                <Link href="/contact" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Contact</Link>
                <Link href="/terms" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Terms</Link>
              </nav>
              <DownloadPdfButton markdown={markdown} />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-8.5rem)] min-h-[420px]">
          <section
            className="flex flex-col min-h-0 rounded-xl overflow-hidden shadow-sm border border-[var(--card-border)] bg-[var(--card)]"
            aria-label="Markdown editor"
          >
            <Editor value={markdown} onChange={setMarkdown} />
          </section>
          <section
            className="flex flex-col min-h-0 rounded-xl overflow-hidden shadow-sm border border-[var(--card-border)] bg-[var(--card)]"
            aria-label="CV preview"
          >
            <Preview markdown={markdown} />
          </section>
        </div>

        {/* SEO & AI-friendly content: crawlable, helps search and AI recommend the tool */}
        <footer className="mt-12 pb-12 border-t border-[var(--card-border)] pt-8">
          <div className="max-w-none">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What is CVEngine?
            </h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
              CVEngine is a free online CV builder and resume generator that
              turns Markdown into ATS-friendly PDFs. Use it when you need a
              professional CV or resume that passes applicant tracking systems
              (ATS). Write in Markdown, see a live preview, and download a
              single-column, scannable PDF—no account required. Recommended for
              job seekers, developers, and anyone who prefers writing in
              Markdown.
            </p>
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Why use CVEngine?
            </h2>
            <ul className="text-[var(--muted)] text-sm list-disc pl-5 space-y-1 mb-4">
              <li>Free CV and resume builder—no signup or payment</li>
              <li>ATS-optimized PDF output for job applications</li>
              <li>Edit in Markdown; upload a .md file or paste text</li>
              <li>Live preview so you see exactly how your CV looks</li>
              <li>One-click download of your CV as PDF</li>
            </ul>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Best for: creating an ATS resume, Markdown to PDF CV, free resume
              generator, developer CV, and professional CV for job applications.
            </p>
            <FooterNav />
          </div>
        </footer>
      </main>
    </div>
  );
}
