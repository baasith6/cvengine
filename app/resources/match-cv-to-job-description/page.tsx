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
  title: "How to Match Your CV to a Job Description",
  description:
    "Use keywords and structure to tailor your CV so it aligns with what recruiters and ATS look for. Free guide from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources/match-cv-to-job-description` },
  openGraph: {
    title: "How to Match Your CV to a Job Description | CVEngine",
    description:
      "Use keywords and structure to tailor your CV to the job ad.",
    url: `${siteUrl}/resources/match-cv-to-job-description`,
  },
};

export default function MatchCvToJobDescriptionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Match Your CV to a Job Description",
    description:
      "Use keywords and structure to tailor your CV so it aligns with what recruiters and ATS look for.",
    url: `${siteUrl}/resources/match-cv-to-job-description`,
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
            How to match your CV to a job description
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            Tailoring your CV to each job improves your chances of passing ATS and getting shortlisted. You don’t need to rewrite everything — focus on keywords, skills, and structure so your CV clearly matches what the ad asks for.
          </p>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Pull out the job’s main requirements
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Read the job description and note must-have skills, tools, and qualifications. List the exact phrases and terms they use (e.g. “project management”, “Python”, “agile”). These are the keywords that ATS and recruiters look for. Your goal is to reflect them in your CV where they honestly apply.
            </p>
          </section>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Add keywords naturally
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Work the job’s keywords into your experience and skills sections. Use them in context — e.g. “Led agile sprints” or “Used Python for data pipelines” — rather than dumping a list. ATS and humans both prefer natural language. If the ad mentions a certification or degree, include it if you have it; if you’re close, say you’re working toward it where true.
            </p>
          </section>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Check what’s missing
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Paste the job description and your CV into a keyword checker to see which terms appear in your CV and which are missing. That helps you spot gaps and add a few more relevant phrases or reframe existing bullets. CVEngine’s{" "}
              <Link href="/keyword-checker" className="text-[var(--accent)] hover:underline">keyword checker</Link> runs in your browser — you paste both texts and get instant feedback. Then update your CV and export a fresh PDF with{" "}
              <Link href="/cv" className="text-[var(--accent)] hover:underline">CVEngine’s CV builder</Link>.
            </p>
          </section>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Keep one master CV, tailor per application
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Maintain one master CV in Markdown with all your experience and skills. For each application, duplicate it, adjust wording and emphasis to match the job, and export a new PDF. That way you stay consistent but still send a tailored file. CVEngine’s editor and live preview make it quick to tweak and download.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
