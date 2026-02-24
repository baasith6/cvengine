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
  title: "Why Use Markdown for Your CV (and How)",
  description:
    "Benefits of writing your CV in Markdown and a simple workflow to get an ATS-ready PDF. Free guide from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources/markdown-cv-guide` },
  openGraph: {
    title: "Why Use Markdown for Your CV | CVEngine",
    description:
      "Benefits of Markdown for your CV and how to get an ATS-ready PDF.",
    url: `${siteUrl}/resources/markdown-cv-guide`,
  },
};

export default function MarkdownCvGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Why Use Markdown for Your CV (and How)",
    description:
      "Benefits of writing your CV in Markdown and a simple workflow to get an ATS-ready PDF.",
    url: `${siteUrl}/resources/markdown-cv-guide`,
    publisher: { "@type": "Organization", name: "CVEngine" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <JsonLdWebPage data={jsonLd} />
      <SiteHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Resources
        </Link>
        <article>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-6">
            Why use Markdown for your CV (and how)
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            Markdown is a simple way to write structured text with headings, lists, and emphasis. Using it for your CV keeps your content portable, easy to edit, and ready to turn into a clean, ATS-friendly PDF. Here&apos;s why it works and how to do it.
          </p>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Why Markdown works for CVs
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>Plain text</strong> — You can open and edit your CV in any editor, store it in Git, or paste it into a tool. No lock-in.</li>
              <li><strong>Simple syntax</strong> — Headings (# ##), lists (- or 1.), and bold/italic are quick to learn and keep the focus on content.</li>
              <li><strong>Version control</strong> — Developers and technical writers often keep Markdown in version control so they can track changes over time.</li>
              <li><strong>One source, many outputs</strong> — Same file can become a PDF for applications, a web page, or a print-ready layout.</li>
            </ul>
          </section>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Basic Markdown for a CV
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Use # Your Name for the main title, ## Experience and ## Education for sections. Use - for bullet points and **bold** for job titles or key terms. You can grab ready-made sections from our{" "}
              <Link href="/snippets" className="text-[var(--accent)] hover:underline">CV snippets</Link> and paste them into the builder.
            </p>
          </section>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              From Markdown to ATS-ready PDF
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Write or paste your Markdown into CVEngine&apos;s editor, preview how it looks, and download a single-column PDF optimized for applicant tracking systems. No signup, no account — just paste, preview, and download.{" "}
              <Link href="/cv" className="text-[var(--accent)] hover:underline">Build your CV with CVEngine</Link> or read{" "}
              <Link href="/how-it-works" className="text-[var(--accent)] hover:underline">how it works</Link>.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
