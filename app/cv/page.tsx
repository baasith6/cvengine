"use client";

import { useState } from "react";
import Link from "next/link";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import SiteHeader from "@/components/SiteHeader";
import FooterNav from "@/components/FooterNav";
import BackToTools from "@/components/BackToTools";
import { SAMPLE_CV } from "@/lib/sample-cv";

const OTHER_TOOLS = [
  { href: "/cover-letter", title: "Cover letter", desc: "Markdown → PDF" },
  { href: "/keyword-checker", title: "Keyword checker", desc: "Job ad vs CV" },
  { href: "/snippets", title: "Snippets", desc: "Section templates" },
];

export default function CvBuilderPage() {
  const [markdown, setMarkdown] = useState(SAMPLE_CV);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <SiteHeader rightAction={<DownloadPdfButton markdown={markdown} />} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BackToTools />
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
            Build your CV in minutes
          </h1>
          <p className="text-[var(--muted)] mt-1 text-sm sm:text-base">
            Write in Markdown · Live preview · Download ATS-ready PDF
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-12rem)] min-h-[420px]">
          <section
            className="flex flex-col min-h-0 rounded-2xl overflow-hidden shadow-sm border border-[var(--card-border)] bg-[var(--card)]"
            aria-label="Markdown editor"
          >
            <Editor value={markdown} onChange={setMarkdown} />
          </section>
          <section
            className="flex flex-col min-h-0 rounded-2xl overflow-hidden shadow-sm border border-[var(--card-border)] bg-[var(--card)]"
            aria-label="CV preview"
          >
            <Preview markdown={markdown} />
          </section>
        </div>

        <div className="mt-10 pt-8 border-t border-[var(--card-border)]">
          <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-4">
            More tools
          </h2>
          <div className="flex flex-wrap gap-3">
            {OTHER_TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] text-sm font-medium text-[var(--foreground)] hover:border-[var(--accent)]/40 hover:shadow-md transition-all"
              >
                {t.title}
                <span className="text-[var(--muted)] font-normal">— {t.desc}</span>
              </Link>
            ))}
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-[var(--accent)] hover:underline"
            >
              All tools →
            </Link>
          </div>
        </div>

        <footer className="mt-12 pb-12 border-t border-[var(--card-border)] pt-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
            What is CVEngine?
          </h2>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
            CVEngine is a free online CV builder that turns Markdown into
            ATS-friendly PDFs. No signup. Write, preview, download.
          </p>
          <ul className="text-[var(--muted)] text-sm list-disc pl-5 space-y-1 mb-4">
            <li>Free—no account or payment</li>
            <li>ATS-optimized PDF for job applications</li>
            <li>Edit in Markdown; live preview</li>
            <li>One-click PDF download</li>
          </ul>
          <FooterNav />
        </footer>
      </main>
    </div>
  );
}
