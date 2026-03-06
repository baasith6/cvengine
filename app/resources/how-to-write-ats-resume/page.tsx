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
            How to write an ATS-friendly resume
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            Most companies use applicant tracking systems (ATS) to screen resumes before a human sees them. If your resume isn&apos;t formatted with ATS in mind, it can be rejected automatically even when you&apos;re a strong fit for the role. This guide explains what ATS look for, how to format your resume correctly, and how to use keywords effectively.
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What is an ATS?
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              An applicant tracking system is software used by employers and recruitment agencies to manage job applications at scale. When you submit a resume through an online portal, the ATS parses the file — extracting your contact details, job titles, dates, skills, and qualifications — and scores it against the job requirements. Candidates who don&apos;t meet the threshold are filtered out before a recruiter ever sees the application.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Common ATS platforms include Workday, Greenhouse, Lever, Taleo, and iCIMS. Each uses slightly different parsing logic, but the formatting principles that help one generally help all of them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Formatting that works for ATS
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              The way your resume is structured has a big impact on whether an ATS can read it accurately. Formatting issues are one of the most common reasons for rejection, and they are entirely preventable.
            </p>
            <ul className="list-disc pl-5 space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
              <li>
                <strong>Use a single-column layout.</strong> Multi-column designs look polished to the human eye but confuse most ATS parsers. The system reads left to right, top to bottom, so a two-column layout can mix up your job titles with dates or merge two separate sections together.
              </li>
              <li>
                <strong>Use standard section headings.</strong> Labels like &quot;Work Experience&quot;, &quot;Education&quot;, and &quot;Skills&quot; are reliably recognised. Creative alternatives like &quot;My Journey&quot; or &quot;What I&apos;ve Done&quot; may not be parsed correctly, and the content beneath them could be ignored entirely.
              </li>
              <li>
                <strong>Avoid images, icons, and text boxes.</strong> Graphics are invisible to ATS. If you put your contact details inside a header image, the system will not extract your email or phone number.
              </li>
              <li>
                <strong>Use standard fonts and avoid tables for layout.</strong> Some parsers struggle with table-based layouts and may scramble the order of your content. Stick to simple paragraph and bullet point formatting.
              </li>
              <li>
                <strong>Save as a text-based PDF or Word file.</strong> A PDF generated from a text editor or word processor is readable by ATS. A PDF that is a scanned image is not — it appears as a blank page to the parser.
              </li>
              <li>
                <strong>Keep dates consistent.</strong> Use a clear format like &quot;Jan 2020 – Mar 2023&quot; or &quot;2020–2023&quot; throughout. Inconsistent or abbreviated date formats can confuse how the ATS orders your experience.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Keywords and how to use them
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              ATS rank resumes partly by matching the language in your document against the language in the job description. If a job asks for &quot;stakeholder management&quot; and your resume only says &quot;managed relationships with clients&quot;, the system may not count that as a match even though the meaning is similar.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              The most effective approach is to read the job description carefully and pull out the exact terms used for required skills, tools, qualifications, and responsibilities. Then use those terms naturally in your experience and skills sections — where they are accurate.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li>Spell out acronyms at least once — write &quot;Search Engine Optimisation (SEO)&quot; so both the full term and the abbreviation are present.</li>
              <li>Match the seniority level in the job title where appropriate — &quot;Senior Software Engineer&quot; and &quot;Software Engineer&quot; can score differently.</li>
              <li>Do not stuff keywords without context — keyword stuffing is against most platform policies and will not help with human reviewers.</li>
              <li>Prioritise keywords that appear multiple times or early in the job description — those are the terms the employer values most.</li>
            </ul>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mt-3">
              CVEngine&apos;s <Link href="/keyword-checker" className="text-[var(--accent)] hover:underline">keyword checker</Link> lets you paste both your CV and the job description to see which terms match and which are missing. Use it after writing your CV to spot gaps before you apply.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What to include in each section
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              A well-structured resume has clear, predictable sections. Here is what each should contain:
            </p>
            <ul className="list-disc pl-5 space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
              <li>
                <strong>Contact information</strong> — Full name, email address, phone number, and optionally your LinkedIn URL or city. Keep this in the main document body, not inside a header element.
              </li>
              <li>
                <strong>Professional summary (optional)</strong> — 2–3 sentences describing your background and what you bring to this role. Tailor it to the specific job. Use keywords from the job description here.
              </li>
              <li>
                <strong>Work experience</strong> — List roles in reverse chronological order. For each: job title, employer, dates, and 3–5 bullet points describing what you did and what you achieved. Lead bullets with action verbs and include measurable outcomes where possible (e.g. &quot;Reduced processing time by 30%&quot;).
              </li>
              <li>
                <strong>Education</strong> — Degree, institution, graduation year. Include relevant modules or distinctions if they support the application.
              </li>
              <li>
                <strong>Skills</strong> — A concise list of technical tools, languages, frameworks, or soft skills that match the role. Do not pad this with obvious items — keep it targeted.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Common ATS mistakes to avoid
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>Headers and footers for contact details</strong> — Some parsers skip content in the header/footer area. Keep your name and email in the main body.</li>
              <li><strong>Fancy bullet point symbols</strong> — Unusual characters like arrows or stars can be misread. Standard hyphens or plain round bullets are safest.</li>
              <li><strong>Key information inside images</strong> — If your job title or employer name is part of a logo or banner image, the ATS will not see it.</li>
              <li><strong>Skills buried at the bottom</strong> — Many ATS weight early mentions more heavily. A short skills section near the top helps surface important keywords.</li>
              <li><strong>Wrong file format</strong> — Always check the portal instructions. Some systems ask specifically for .docx rather than PDF. If unclear, prepare both.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Convert your CV to an ATS-ready PDF or Word file
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              CVEngine outputs single-column, text-based PDFs and Word (.docx) files built to work with ATS. Write your CV in Markdown — using plain headings, bullets, and bold — or upload an existing <code className="font-mono text-xs">.md</code> file. The live preview shows exactly how the exported file will look, and you can download either format in one click with no signup required. See <Link href="/markdown-to-pdf" className="text-[var(--accent)] hover:underline">Markdown to PDF</Link> or <Link href="/markdown-to-word" className="text-[var(--accent)] hover:underline">Markdown to Word</Link> for more detail, or go straight to the <Link href="/cv" className="text-[var(--accent)] hover:underline">CV builder</Link>.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
