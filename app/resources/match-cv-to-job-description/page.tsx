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
            How to match your CV to a job description
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            Sending the same CV to every job is one of the most common mistakes applicants make. Recruiters can tell when a CV is generic, and applicant tracking systems score resumes against the specific language in the job posting. Tailoring your CV to each role significantly improves both your ATS score and your chances of being shortlisted. This guide explains how to do it efficiently without rewriting your CV from scratch every time.
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Why tailoring matters
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Most larger employers use an applicant tracking system (ATS) to filter applications before a recruiter reviews them. The ATS compares the language in your CV against the language in the job description and scores the match. A CV that uses different terminology to describe the same skills — even if the candidate is well qualified — may score lower than a weaker candidate whose CV mirrors the job ad more closely.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Beyond ATS, human reviewers respond to CVs that feel relevant. A recruiter who reads ten CVs in an hour will spend more time on the one that clearly addresses the job&apos;s requirements than the one that reads like a general history of someone&apos;s career.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Step 1: Read the job description carefully
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Before editing your CV, read the job description twice. The first time, read it for overall understanding. The second time, mark or note:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>Required skills and qualifications</strong> — anything listed as &quot;must have&quot; or in the essential requirements section</li>
              <li><strong>Preferred skills</strong> — listed as &quot;nice to have&quot; or desirable, which are worth adding where you genuinely have them</li>
              <li><strong>Specific tools, languages, or systems</strong> — exact names matter (e.g. &quot;Salesforce&quot; not just &quot;CRM software&quot;)</li>
              <li><strong>Recurring phrases</strong> — if a term appears multiple times, it is important to the employer</li>
              <li><strong>The tone and level</strong> — is this a senior strategic role or a hands-on technical position? The language of your bullets should match</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Step 2: Add keywords naturally to your CV
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Work the job&apos;s key terms into your experience and skills sections using natural language. The goal is not to copy-paste phrases from the job description — it is to use the same vocabulary to describe what you genuinely did.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              For example, if the job asks for &quot;cross-functional stakeholder management&quot; and your previous role involved coordinating between engineering, design, and product teams, a bullet like &quot;Coordinated cross-functional stakeholders including engineering and design to deliver quarterly releases on schedule&quot; naturally includes the term while staying accurate.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              A few rules to follow:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed mt-2">
              <li>Only include skills and experience you actually have — misrepresentation will be discovered at interview.</li>
              <li>Spell out acronyms once — write &quot;Agile (Scrum)&quot; so both the full term and abbreviation are present.</li>
              <li>Where the job uses a specific tool name, use that name rather than a generic category (e.g. &quot;Figma&quot; rather than &quot;design software&quot;).</li>
              <li>Update your professional summary to reflect the specific role and what you bring to it.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Step 3: Check for gaps with a keyword checker
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Once you have updated your CV, paste both the job description and your CV text into a keyword checker. It will show you which key terms from the job ad appear in your CV and which are missing. This lets you quickly identify gaps without reading through both documents manually.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              CVEngine&apos;s <Link href="/keyword-checker" className="text-[var(--accent)] hover:underline">keyword checker</Link> runs entirely in your browser — paste both texts and get instant feedback. For each missing term, decide whether you can add it honestly. If you can, add it in context. If the skill genuinely does not apply to your background, leave it out.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Step 4: Reorder and emphasise what matters most
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Keyword matching is only part of tailoring. You should also consider the order and emphasis of your content.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li>Move your most relevant experience to the top of each role&apos;s bullet list so recruiters see it immediately.</li>
              <li>If you have a skills section, put the skills most relevant to this specific role first.</li>
              <li>If the job is in a different field or at a different level from your most recent role, consider adding a brief summary at the top that directly addresses the match.</li>
              <li>Remove or shorten bullets about responsibilities that are not relevant to this role — this keeps the CV focused and concise.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Keep a master CV and tailor per application
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              The most efficient approach is to maintain one master CV in Markdown with your complete history — all roles, all skills, all detail. For each application, duplicate the file, remove or trim sections that are not relevant, add the specific keywords from the job description where they fit, and export a fresh PDF or Word file.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              CVEngine&apos;s editor and live preview make this quick: paste your master CV, adjust the content, and download a new PDF in under a minute. No reformatting, no fighting with layout — just update the Markdown and export.{" "}
              <Link href="/cv" className="text-[var(--accent)] hover:underline">Build and tailor your CV with CVEngine</Link>.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
