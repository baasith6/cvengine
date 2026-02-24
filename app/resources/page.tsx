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
  title: "Resources",
  description:
    "Guides on writing ATS-friendly resumes, using Markdown for your CV, and matching your CV to job descriptions. Free tips from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources` },
  openGraph: {
    title: "Resources | CVEngine",
    description:
      "Guides on ATS resumes, Markdown CVs, and job description matching.",
    url: `${siteUrl}/resources`,
  },
};

const ARTICLES = [
  {
    slug: "how-to-write-ats-resume",
    title: "How to write an ATS-friendly resume",
    description:
      "What applicant tracking systems look for and how to format your resume so it gets past the bots.",
  },
  {
    slug: "markdown-cv-guide",
    title: "Why use Markdown for your CV (and how)",
    description:
      "Benefits of writing your CV in Markdown and a simple workflow to get an ATS-ready PDF.",
  },
  {
    slug: "match-cv-to-job-description",
    title: "How to match your CV to a job description",
    description:
      "Use keywords and structure to tailor your CV so it aligns with what recruiters and ATS look for.",
  },
];

export default function ResourcesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Resources | CVEngine",
    description: "Guides on ATS resumes, Markdown CVs, and job applications.",
    url: `${siteUrl}/resources`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <JsonLdWebPage data={jsonLd} />
      <SiteHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">
          Resources
        </h1>
        <p className="text-[var(--muted)] text-sm mb-8">
          Short guides to help you build a stronger, ATS-friendly CV.
        </p>
        <ul className="space-y-6">
          {ARTICLES.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/resources/${article.slug}`}
                className="block rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[var(--accent)]/30 transition-all group"
              >
                <h2 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-[var(--muted)]">
                  {article.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] mt-3">
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 pt-8 border-t border-[var(--card-border)]">
          <p className="text-sm text-[var(--muted)] mb-4">
            Ready to build or improve your CV?
          </p>
          <Link
            href="/cv"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            Start building with CVEngine
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        <FooterNav />
      </main>
    </div>
  );
}
