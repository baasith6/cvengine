"use client";

import { useState } from "react";
import Link from "next/link";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import DownloadWordButton from "@/components/DownloadWordButton";
import SiteHeader from "@/components/SiteHeader";
import FooterNav from "@/components/FooterNav";
import BackToTools from "@/components/BackToTools";
import { SAMPLE_COVER_LETTER } from "@/lib/sample-cover-letter";

export default function CoverLetterPage() {
  const [markdown, setMarkdown] = useState(SAMPLE_COVER_LETTER);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <SiteHeader
        rightAction={
          <div className="flex items-center gap-2">
            <DownloadPdfButton
              markdown={markdown}
              downloadFilename="cover-letter-ats.pdf"
            />
            <DownloadWordButton
              markdown={markdown}
              downloadFilename="cover-letter-ats.docx"
            />
          </div>
        }
      />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BackToTools />
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
            Cover letter from Markdown
          </h1>
          <p className="text-[var(--muted)] mt-1 text-sm">
            Write · Preview · Download PDF
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-12rem)] min-h-[420px]">
          <section
            className="flex flex-col min-h-0 rounded-2xl overflow-hidden shadow-sm border border-[var(--card-border)] bg-[var(--card)]"
            aria-label="Cover letter editor"
          >
            <Editor value={markdown} onChange={setMarkdown} />
          </section>
          <section
            className="flex flex-col min-h-0 rounded-2xl overflow-hidden shadow-sm border border-[var(--card-border)] bg-[var(--card)]"
            aria-label="Cover letter preview"
          >
            <Preview markdown={markdown} />
          </section>
        </div>
        <div className="mt-6 text-center">
          <Link href="/cv" className="text-sm text-[var(--accent)] hover:underline">
            Build your CV
          </Link>
        </div>
        <FooterNav />
      </main>
    </div>
  );
}
