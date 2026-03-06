import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import FooterNav from "@/components/FooterNav";
import JsonLdWebPage from "@/components/JsonLdWebPage";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "Markdown to PDF Converter — Free CV & Resume",
  description:
    "Convert Markdown (.md) to a PDF CV or resume instantly. Paste or upload your .md file, preview live, download an ATS-friendly PDF. Free — no signup required.",
  alternates: { canonical: `${siteUrl}/markdown-to-pdf` },
  keywords: [
    "markdown to PDF",
    "md to pdf",
    ".md to pdf",
    "md file to pdf",
    "markdown to PDF converter",
    "convert markdown to PDF",
    "markdown resume PDF",
    "markdown CV PDF",
    "ATS PDF from markdown",
  ],
  openGraph: {
    title: "Markdown to PDF — Free CV Converter | CVEngine",
    description:
      "Convert a .md file to an ATS-friendly PDF CV. Paste or upload Markdown, preview live, download PDF instantly. Free — no signup.",
    url: `${siteUrl}/markdown-to-pdf`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown to PDF — Free CV Converter | CVEngine",
    description:
      "Convert Markdown to ATS-friendly PDF CV. Free — no signup.",
  },
};

const HOW_IT_WORKS = [
  {
    n: "1",
    title: "Paste or upload your .md file",
    body: "Open the CV builder and paste your Markdown content directly, or use the Upload .md button to load your file. The editor accepts any standard Markdown — headings, lists, bold text.",
  },
  {
    n: "2",
    title: "Preview your CV live",
    body: "As you type or paste, a live preview renders your CV in real time. You can check structure, headings, and formatting before downloading.",
  },
  {
    n: "3",
    title: "Download ATS-friendly PDF",
    body: 'Click "Download ATS PDF" to generate a single-column, scannable PDF from your Markdown. The PDF is optimised for applicant tracking systems (ATS) used by recruiters.',
  },
];

const FAQ = [
  {
    q: "What Markdown syntax does the PDF converter support?",
    a: "CVEngine supports standard Markdown: # H1, ## H2, ### H3 for headings, - or * for bullet lists, **bold**, *italic*, [links](url), and --- for horizontal rules. This covers everything you need for a professional CV.",
  },
  {
    q: "Is the Markdown to PDF conversion really free?",
    a: "Yes — completely free. No signup, no account, no payment. You paste or upload your .md file and download the PDF immediately.",
  },
  {
    q: "Will the PDF pass ATS (applicant tracking system) scanning?",
    a: "Yes. The PDF is single-column, uses plain text (not images), has clear semantic headings, and no complex tables or graphics — all the properties that ATS parsers require.",
  },
  {
    q: "Can I also download a Word (.docx) file from my Markdown?",
    a: "Yes. The CV builder also has a Download Word button that converts your .md content to a .docx file. Useful if a recruiter asks for a Word version.",
  },
  {
    q: "What is the difference between the PDF and the preview?",
    a: "The live preview gives you an instant in-browser view using the same Markdown. The downloaded PDF is generated server-side with ATS-optimised CSS — fonts, margins, and spacing may differ slightly from the preview.",
  },
];

export default function MarkdownToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Markdown to PDF Converter — Free CV & Resume",
    description:
      "Convert Markdown (.md) to a PDF CV or resume instantly. ATS-friendly output. Free — no signup.",
    url: `${siteUrl}/markdown-to-pdf`,
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <JsonLdWebPage data={jsonLd} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <SiteHeader />

      <main id="main-content" className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Hero */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight mb-3">
            Markdown to PDF
          </h1>
          <p className="text-[var(--muted)] text-base max-w-xl mx-auto mb-2">
            Convert a <code className="font-[family-name:var(--font-geist-mono)] text-sm bg-[var(--card-border)]/60 px-1.5 py-0.5 rounded">.md</code> file to an ATS-friendly PDF CV or resume. Free — no signup.
          </p>
          <p className="text-[var(--muted)] text-sm max-w-xl mx-auto mb-8">
            Paste your Markdown content, preview live, and download a clean single-column PDF optimised for applicant tracking systems.
          </p>
          <Link
            href="/cv"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
          >
            Convert Markdown to PDF
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
            How to convert Markdown to PDF
          </h2>
          <div className="space-y-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.n} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-lg">
                  {step.n}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--foreground)] mb-1">{step.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why ATS-friendly matters */}
        <section className="mb-12 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
            Why ATS-optimised PDF matters
          </h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
            Most companies use applicant tracking systems to parse your CV before a recruiter sees it. A Markdown-to-PDF conversion works especially well for ATS because Markdown forces a clean, linear document structure — no multi-column layouts, no embedded images, no complex tables that can break parsing.
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            CVEngine&apos;s PDF output uses a single-column layout with plain text headings and lists — exactly what ATS software expects. You get a professional-looking PDF that both machines and humans can read without issue.
          </p>
        </section>

        {/* Supported Markdown */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Supported Markdown syntax
          </h2>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
            {[
              ["# Your Name", "H1 — document title"],
              ["## Experience", "H2 — section heading"],
              ["### Job Title", "H3 — sub-section"],
              ["- Bullet point", "Unordered list item"],
              ["**Bold text**", "Bold / emphasis"],
              ["*Italic text*", "Italic"],
              ["[text](url)", "Hyperlink"],
              ["---", "Horizontal rule (divider)"],
            ].map(([syntax, desc], i) => (
              <div
                key={syntax}
                className={`flex items-center gap-4 px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-[var(--background)]/40" : ""
                }`}
              >
                <code className="font-[family-name:var(--font-geist-mono)] text-[var(--accent)] w-36 shrink-0">
                  {syntax}
                </code>
                <span className="text-[var(--muted)]">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">{q}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mb-10">
          <p className="text-sm text-[var(--muted)] mb-4">
            Also need a Word file?{" "}
            <Link href="/markdown-to-word" className="text-[var(--accent)] hover:underline">
              Markdown to Word →
            </Link>
          </p>
          <Link
            href="/cv"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] shadow-md hover:shadow-lg transition-all"
          >
            Open Markdown to PDF converter
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <FooterNav />
      </main>
    </div>
  );
}
