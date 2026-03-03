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
  title: "Writing Your First CV: A Simple Guide",
  description:
    "A simple guide to writing your first CV: what to include, structure, and how to get an ATS-ready PDF. Free from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources/first-cv` },
  openGraph: {
    title: "Writing Your First CV | CVEngine",
    description:
      "A simple guide to writing your first CV and getting an ATS-ready PDF.",
    url: `${siteUrl}/resources/first-cv`,
  },
};

export default function FirstCvPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Writing Your First CV: A Simple Guide",
    description:
      "A simple guide to writing your first CV: what to include, structure, and how to get an ATS-ready PDF.",
    url: `${siteUrl}/resources/first-cv`,
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
            Writing your first CV: a simple guide
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            Your first CV doesn&apos;t need to be long. Focus on education, any work or volunteer experience, and a few key skills. Use a clear structure so recruiters and ATS can read it easily. Here&apos;s what to include and how to build it.
          </p>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              What to include
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>Contact details</strong> — Name, email, phone, and optionally LinkedIn or location.</li>
              <li><strong>Education</strong> — School, college, or university; degree or qualification; dates; relevant modules or achievements if they help.</li>
              <li><strong>Experience</strong> — Paid jobs, internships, placements, or voluntary work. For each: role, organisation, dates, and 2–4 short bullets on what you did and what you achieved.</li>
              <li><strong>Skills</strong> — A short list of skills that match the job (e.g. tools, languages, soft skills).</li>
              <li><strong>Optional</strong> — A 2–3 line summary at the top, or a small section for projects, courses, or interests if they&apos;re relevant.</li>
            </ul>
          </section>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Keep it simple and scannable
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Use one clear heading per section (e.g. Education, Experience, Skills). Write in short bullets and start with action verbs where you can. One page is enough for a first CV. Avoid images, complex layouts, or tiny fonts — a single-column, text-based CV works best for both humans and applicant tracking systems.
            </p>
          </section>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Build and download with CVEngine
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              You can write your first CV in Markdown: add your details section by section, preview it live, and download an ATS-friendly PDF. No signup. Use our{" "}
              <Link href="/snippets" className="text-[var(--accent)] hover:underline">CV snippets</Link> for ready-made section templates, then paste them into the{" "}
              <Link href="/cv" className="text-[var(--accent)] hover:underline">CV builder</Link> and fill in your own information.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
