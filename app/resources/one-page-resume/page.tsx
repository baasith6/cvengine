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
  title: "One-Page Resume: When and How",
  description:
    "When to use a one-page resume and how to fit your experience without cutting what matters. Free guide from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources/one-page-resume` },
  openGraph: {
    title: "One-Page Resume: When and How | CVEngine",
    description:
      "When to use a one-page resume and how to fit your experience.",
    url: `${siteUrl}/resources/one-page-resume`,
  },
};

export default function OnePageResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "One-Page Resume: When and How",
    description:
      "When to use a one-page resume and how to fit your experience without cutting what matters.",
    url: `${siteUrl}/resources/one-page-resume`,
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
            One-page resume: when and how
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            A one-page resume keeps your story tight and scannable. It works well for early-career applicants, career changers, or roles where brevity is valued. Here&apos;s when to aim for one page and how to get there without losing what matters.
          </p>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              When a one-page resume makes sense
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li>You have under about 10 years of relevant experience.</li>
              <li>You&apos;re applying for roles that expect concision (e.g. many startups, technical roles).</li>
              <li>Recruiters or job ads ask for a single page or a short CV.</li>
              <li>You&apos;re a recent graduate or career changer and want to focus on the most relevant experience.</li>
            </ul>
          </section>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              How to fit it on one page
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Use clear headings and short bullets. Lead with your strongest role and 3–5 bullets; give older or less relevant jobs 1–2 bullets or a single line. Trim the summary to 2–3 lines. List only skills and certifications that match the job. Use a single-column, ATS-friendly layout so nothing gets cut off or misread —{" "}
              <Link href="/cv" className="text-[var(--accent)] hover:underline">CVEngine</Link> outputs a clean one-column PDF you can keep to one page by editing down in the Markdown editor until the preview fits.
            </p>
          </section>

          <section className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              When two pages are fine
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              If you have long, relevant experience or many publications and projects, two pages are acceptable. Prefer one page only when it doesn&apos;t force you to remove important context. Whatever length you choose, keep the first page strong and use the same clear structure so ATS and recruiters can scan it quickly.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
