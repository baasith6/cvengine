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
  title: "How to Write an ATS-Friendly Resume",
  description:
    "What applicant tracking systems look for and how to format your resume so it gets past the bots. Free guide from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources/how-to-write-ats-resume` },
  openGraph: {
    title: "How to Write an ATS-Friendly Resume | CVEngine",
    description:
      "What ATS look for and how to format your resume so it gets past the bots.",
    url: `${siteUrl}/resources/how-to-write-ats-resume`,
  },
};

export default function HowToWriteAtsResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Write an ATS-Friendly Resume",
    description:
      "What applicant tracking systems look for and how to format your resume so it gets past the bots.",
    url: `${siteUrl}/resources/how-to-write-ats-resume`,
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
            How to write an ATS-friendly resume
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            Most companies use applicant tracking systems (ATS) to screen resumes before a human sees them. If your resume isn’t formatted with ATS in mind, it can be rejected even when you’re a strong fit. Here’s what ATS look for and how to give your resume the best chance.
          </p>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              What is an ATS?
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              An applicant tracking system is software that parses and ranks resumes based on keywords, skills, and structure. It filters out candidates who don’t match the job criteria and surfaces the rest to recruiters. To get through, your resume needs to be easy for the system to read and aligned with the job description.
            </p>
          </section>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Formatting that works for ATS
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>Use clear section headings</strong> — e.g. Experience, Education, Skills. Avoid graphics or images in place of text.</li>
              <li><strong>Stick to a single column</strong> — Multi-column layouts can confuse parsers. A simple top-to-bottom flow is safest.</li>
              <li><strong>Use standard job titles and terms</strong> — Where it fits, mirror the language from the job ad (e.g. “Project Manager” not only “PM”).</li>
              <li><strong>Save as PDF or Word</strong> — PDF is fine if it’s not image-based. Avoid complex tables or text inside images.</li>
              <li><strong>Spell out acronyms once</strong> — e.g. “Applicant Tracking System (ATS)” so both humans and systems understand.</li>
            </ul>
          </section>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Keywords and tailoring
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              ATS often rank resumes by how well they match the job description. Pull out important skills and phrases from the ad and use them naturally in your experience and skills sections. Don’t stuff keywords; add them where they accurately describe what you did. Use a{" "}
              <Link href="/keyword-checker" className="text-[var(--accent)] hover:underline">keyword checker</Link> to see which job terms appear in your CV and which are missing.
            </p>
          </section>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Next step: build an ATS-ready PDF
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              CVEngine outputs single-column, scannable PDFs designed to work with ATS. You write in Markdown, preview live, and download your resume in one click — no signup.{" "}
              <Link href="/cv" className="text-[var(--accent)] hover:underline">Build your CV with CVEngine</Link>.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
