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
  title: "How to Write a CV Summary or Personal Statement",
  description:
    "How to write a strong CV summary or personal statement that grabs attention. Examples, tips, and what to avoid. Free guide from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources/cv-summary` },
  openGraph: {
    title: "How to Write a CV Summary | CVEngine",
    description:
      "Write a strong CV summary or personal statement with examples and tips.",
    url: `${siteUrl}/resources/cv-summary`,
  },
};

export default function CvSummaryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Write a CV Summary or Personal Statement",
    description:
      "How to write a strong CV summary or personal statement that grabs attention, with examples.",
    url: `${siteUrl}/resources/cv-summary`,
    publisher: { "@type": "Organization", name: "CVEngine" },
    datePublished: "2025-06-01",
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
        <article className="anim-fade-in-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-6">
            How to write a CV summary or personal statement
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            A CV summary — sometimes called a personal statement or professional profile — sits at the top of your CV, just below your contact details. Done well, it gives a recruiter an immediate sense of who you are and why you are a strong candidate for this specific role. Done poorly, it wastes the most valuable space on your CV. This guide explains what to write, what to avoid, and how to tailor the summary for different situations.
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What a CV summary should do
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              A strong CV summary does three things in two to four sentences:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>Identifies who you are</strong> — your professional identity, level of experience, and field.</li>
              <li><strong>States what you bring</strong> — your most relevant skills or expertise for this specific role.</li>
              <li><strong>Signals what you are looking for</strong> — the type of role or company, briefly, so the reader knows you are applying with intention.</li>
            </ol>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mt-3">
              A recruiter reviewing dozens of applications will read the summary first. If it is relevant and specific, they will continue. If it is generic, they may move on without reading your experience in detail.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What to include
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>Your job title or professional identity</strong> — e.g. &quot;software engineer&quot;, &quot;marketing manager&quot;, &quot;recent business graduate&quot;</li>
              <li><strong>Years of experience</strong> (if you have relevant experience) — e.g. &quot;with five years of experience in&quot;</li>
              <li><strong>Key areas of expertise</strong> that match the job — pulled from the job description where relevant</li>
              <li><strong>One or two standout achievements or traits</strong> — something specific, not just &quot;strong communication skills&quot;</li>
              <li><strong>What you are looking for</strong> — the type of role, organisation, or challenge you are targeting</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Examples
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Here are three examples across different career stages:
            </p>
            <div className="space-y-4">
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
                <p className="text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wide">Experienced candidate</p>
                <p className="text-sm text-[var(--foreground)] leading-relaxed italic">
                  &quot;Software engineer with seven years of experience building scalable backend services in Python and Go. Delivered three major API migrations at a fintech startup, reducing latency by 40%. Looking for a senior engineering role at a product-focused company where I can contribute to architecture decisions as well as hands-on development.&quot;
                </p>
              </div>
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
                <p className="text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wide">Recent graduate</p>
                <p className="text-sm text-[var(--foreground)] leading-relaxed italic">
                  &quot;Recent marketing graduate with hands-on experience in content creation, social media management, and data analysis from a year-long internship at a digital agency. Comfortable with Google Analytics and Notion. Looking for a junior marketing or content role where I can grow into strategy.&quot;
                </p>
              </div>
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
                <p className="text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wide">Career changer</p>
                <p className="text-sm text-[var(--foreground)] leading-relaxed italic">
                  &quot;Former secondary school teacher with ten years of experience managing complex projects, communicating with diverse stakeholders, and developing and delivering training programmes. Transitioning into instructional design and corporate learning, with recent certification in e-learning development.&quot;
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What to avoid
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Most weak summaries fail for the same reasons:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>Being too generic.</strong> &quot;Highly motivated team player with excellent communication skills looking for a challenging role&quot; says nothing specific. Every candidate could write this. Replace it with something only you can say.</li>
              <li><strong>Repeating what is already obvious from the CV.</strong> Do not list your job titles or employers here — the experience section does that. The summary should add context and emphasis, not duplicate content.</li>
              <li><strong>Using clichés.</strong> Phrases like &quot;dynamic&quot;, &quot;results-driven&quot;, &quot;passionate&quot;, and &quot;detail-oriented&quot; are overused and add no information. Cut them.</li>
              <li><strong>Making it too long.</strong> If your summary is more than five or six lines, it is too long. Recruiters spend seconds on a first pass — keep it tight.</li>
              <li><strong>Focusing on what you want rather than what you offer.</strong> The employer needs to know what you bring, not just that you are looking for career growth.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              How to tailor your summary for each application
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Your summary should change with each application, or at least be reviewed. Read the job description and identify the two or three most important requirements. Make sure your summary mentions those directly — using the same or similar language.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              If the job emphasises leadership and you have team lead experience, say so explicitly in the summary. If it emphasises a specific tool or method, mention it in context. The summary is the first place a recruiter looks for evidence that you are the right fit — make it count.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Add your summary in CVEngine
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              In CVEngine, your summary sits at the top of the Markdown editor, below your name and contact details. Use a plain paragraph — no heading needed, or use <code className="font-mono text-xs">## Summary</code> if you prefer the section clearly labelled. Write it last, once you know which experience and skills you are emphasising for this application. Then download the PDF or Word file from the{" "}
              <Link href="/cv" className="text-[var(--accent)] hover:underline">CV builder</Link>.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
