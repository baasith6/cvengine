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
  title: "CV vs Resume: What Is the Difference?",
  description:
    "CV and resume are used differently depending on where you are applying. Learn the difference between a CV and a resume and which one to use. Free guide from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources/cv-vs-resume` },
  openGraph: {
    title: "CV vs Resume: What Is the Difference? | CVEngine",
    description:
      "Learn the difference between a CV and a resume and which one to send.",
    url: `${siteUrl}/resources/cv-vs-resume`,
  },
};

export default function CvVsResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "CV vs Resume: What Is the Difference?",
    description:
      "CV and resume are used differently depending on where you are applying. Learn the difference and which one to use.",
    url: `${siteUrl}/resources/cv-vs-resume`,
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
            CV vs resume: what is the difference?
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            The terms &quot;CV&quot; and &quot;resume&quot; are often used interchangeably, but they mean different things depending on where you are applying and for what type of role. Using the wrong one — or not understanding what is expected — can make your application look out of step with the local convention. This guide explains the difference, when each is used, and what that means practically when you are preparing to apply.
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              The short answer
            </h2>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
              {[
                ["CV (Curriculum Vitae)", "Used in the UK, Europe, Australia, and for academic or research roles globally. Can be multiple pages. Comprehensive history of your career."],
                ["Resume", "Used in the US and Canada for most job applications. Usually 1–2 pages. A targeted, concise summary of relevant experience."],
              ].map(([term, desc], i) => (
                <div
                  key={term}
                  className={`px-4 py-3 text-sm ${i % 2 === 0 ? "bg-[var(--background)]/40" : ""}`}
                >
                  <p className="font-semibold text-[var(--foreground)] mb-1">{term}</p>
                  <p className="text-[var(--muted)]">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What is a CV?
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              CV stands for Curriculum Vitae, a Latin phrase meaning &quot;course of life&quot;. In the UK, Europe, Australia, and most of the rest of the world outside North America, a CV is the standard document you send for most job applications. It is a comprehensive record of your professional and academic history.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              A CV typically includes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--foreground)] leading-relaxed">
              <li>Contact details</li>
              <li>Professional summary or personal statement</li>
              <li>Work experience in reverse chronological order</li>
              <li>Education</li>
              <li>Skills</li>
              <li>Optional sections such as publications, certifications, languages, or interests</li>
            </ul>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mt-3">
              For most jobs, a UK-style CV is 1–2 pages. For academic and research positions, a CV can be much longer — it may include a full list of publications, conference presentations, grants, and teaching experience, sometimes running to many pages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What is a resume?
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              A resume (from the French &quot;résumé&quot;, meaning summary) is the standard application document in the United States and Canada. It is explicitly a shortened, targeted document — typically one page, sometimes two for experienced candidates.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              The key difference is intent. Where a CV is a comprehensive record, a resume is a curated selection. You choose what to include based on what is most relevant to the specific job you are applying for. Content that is not relevant to that role is left out.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              A US resume typically includes the same sections as a CV — contact, summary, experience, education, skills — but at a more condensed level. Two pages is generally acceptable for candidates with 10+ years of experience. More than two pages is rarely appropriate for industry roles in North America.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Key differences at a glance
            </h2>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
              {[
                ["Length", "CV: 1–2 pages (industry); longer for academia", "Resume: 1–2 pages; 1 preferred for most roles"],
                ["Purpose", "CV: Comprehensive career record", "Resume: Targeted summary for a specific role"],
                ["Tailoring", "CV: Often updated but may be less role-specific", "Resume: Customised for each application"],
                ["Where used", "CV: UK, Europe, Australia, Asia, academia", "Resume: US, Canada"],
                ["Photos", "CV: Common in some European countries", "Resume: Not included in the US"],
              ].map(([aspect, cv, res], i) => (
                <div
                  key={aspect}
                  className={`grid grid-cols-3 gap-2 px-4 py-3 text-sm ${i % 2 === 0 ? "bg-[var(--background)]/40" : ""}`}
                >
                  <span className="font-medium text-[var(--foreground)]">{aspect}</span>
                  <span className="text-[var(--muted)]">{cv}</span>
                  <span className="text-[var(--muted)]">{res}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What about academic and research CVs?
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              In academic settings — applying for PhD programmes, postdoctoral positions, faculty roles, or research grants — a CV is used globally, including in the US where a &quot;resume&quot; is standard for industry roles. An academic CV is fundamentally different from an industry CV or resume.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              An academic CV includes a complete list of publications, conference presentations, teaching experience, grants and funding, awards, and professional service (e.g. journal reviewing, committee membership). There is no page limit — the document grows with your career. A senior academic may have a CV of 20 or more pages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Which one should you use?
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              The simple rule: follow the local convention for where the employer is based.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>Applying to a UK, European, or Australian employer?</strong> Send a CV.</li>
              <li><strong>Applying to a US or Canadian employer?</strong> Send a resume (1–2 pages).</li>
              <li><strong>Applying for an academic or research role anywhere?</strong> Send an academic CV.</li>
              <li><strong>Not sure?</strong> Look at what the job ad asks for. If it says &quot;resume&quot;, send a resume. If it says &quot;CV&quot;, send a CV. If it says &quot;application&quot; or does not specify, use the convention for the country.</li>
            </ul>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mt-3">
              For practical purposes — if you are applying to industry roles in most countries outside the US — the CV and the resume are structurally similar enough that the same document works. The main adjustment is length: trim to one or two focused pages for US applications, and ensure you are tailoring the content to the role.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Build your CV or resume with CVEngine
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Whether you are writing a UK-style CV or a US resume, CVEngine&apos;s Markdown editor outputs a clean, single-column, ATS-friendly PDF or Word file. Write your content in Markdown, preview it live, and download the format that suits your application. No account needed.{" "}
              <Link href="/cv" className="text-[var(--accent)] hover:underline">Start building with CVEngine</Link> or read about{" "}
              <Link href="/resources/how-to-write-ats-resume" className="text-[var(--accent)] hover:underline">how to write an ATS-friendly resume</Link>.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
