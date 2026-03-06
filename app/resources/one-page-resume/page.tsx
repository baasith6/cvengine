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
    datePublished: "2025-01-01",
    dateModified: "2025-06-01",
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
            The one-page resume is a common standard, particularly in the United States and for early-career candidates. But not everyone needs one — and forcing your career onto a single page can actually hurt your application if it means cutting meaningful experience. This guide explains when a one-page resume is the right choice, when two pages is fine, and how to cut your CV down without losing what matters.
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              When a one-page resume makes sense
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              A one-page resume is generally the right call in the following situations:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>You have under 7–10 years of relevant experience.</strong> Early-career candidates rarely have enough distinct, relevant experience to justify two pages. If you are stretching thin content across two pages, one page will look stronger.</li>
              <li><strong>You are applying to roles where brevity is valued.</strong> Many US employers, startups, and technical roles expect a one-page resume by default. In these contexts, a two-page CV can signal poor editing judgement.</li>
              <li><strong>The job ad asks for one page.</strong> If the employer specifies a length, follow it.</li>
              <li><strong>You are a recent graduate.</strong> Unless you have substantial internship, research, or project experience, one page is almost always appropriate for a first or second job application.</li>
              <li><strong>You are making a career change</strong> and want to focus only on transferable experience, cutting older and less relevant roles.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              When two pages is the right choice
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Two pages is acceptable — and often better — in these situations:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>You have 10+ years of relevant experience</strong> that cannot be fairly represented in one page without cutting important context.</li>
              <li><strong>You are applying for senior, management, or specialist roles</strong> where depth of experience matters and reviewers expect detail.</li>
              <li><strong>You are applying in the UK, Europe, or Australia</strong> — outside the US, a two-page CV is standard at most career stages.</li>
              <li><strong>You have substantial publications, certifications, or projects</strong> that are genuinely relevant to the role.</li>
            </ul>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mt-2">
              The rule is not &quot;one page is always better&quot; — it is &quot;every page should earn its place&quot;. A padded one-page resume with 14pt font and wide margins is worse than a tight, focused two-page CV.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              How to fit your resume on one page
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              If you have decided one page is right, here is how to get there without gutting the content that matters.
            </p>
            <ul className="list-disc pl-5 space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
              <li>
                <strong>Trim older roles aggressively.</strong> Give your most recent 1–2 roles 4–5 bullets each. Give roles from 5+ years ago 1–2 bullets or just a single line with the title, employer, and dates. The further back a role is, the less space it should take.
              </li>
              <li>
                <strong>Cut the summary to 2–3 lines.</strong> Summaries often get padded. Keep it to one or two sentences about your background and what you bring, then get straight to experience.
              </li>
              <li>
                <strong>Shorten each bullet point.</strong> Aim for one line per bullet where possible. Remove filler phrases like &quot;responsible for&quot; — lead with the action and the result instead.
              </li>
              <li>
                <strong>Remove irrelevant content.</strong> Skills that are obvious (e.g. &quot;Microsoft Word&quot; for most roles), interests that are not relevant, and early education entries after you have a degree can often be cut entirely.
              </li>
              <li>
                <strong>Use a single-column layout.</strong> Multi-column designs make it harder to cut things cleanly. A single-column layout lets you adjust content linearly and see exactly how much space each section takes.
              </li>
              <li>
                <strong>Adjust what you remove, not the font size.</strong> Shrinking fonts to 9pt to fit everything on one page makes the document hard to read. Cut content instead of compromising readability.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What never to cut
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              When trimming your resume, some things should stay regardless of the page limit:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li>Specific achievements with measurable outcomes — these are what differentiate you from other candidates.</li>
              <li>Any skill or experience that directly matches a requirement in the job description.</li>
              <li>Your most recent role in reasonable detail — recruiters will spend most of their time here.</li>
              <li>Education credentials that are required or preferred for the role.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Build a one-page resume with CVEngine
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              CVEngine&apos;s live preview makes it easy to see exactly how your CV will look as you edit. Write your content in Markdown, trim bullets and sections in the editor, and watch the preview update instantly. When the preview fits on one page, download the PDF. No fiddling with margins or page breaks in a word processor.{" "}
              <Link href="/cv" className="text-[var(--accent)] hover:underline">Build your one-page resume with CVEngine</Link> — or use our{" "}
              <Link href="/snippets" className="text-[var(--accent)] hover:underline">CV snippets</Link> to start from a ready-made template.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
