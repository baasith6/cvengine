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
  title: "Common CV Mistakes to Avoid",
  description:
    "The most common CV and resume mistakes that cost candidates interviews — and how to fix them. Free guide from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources/cv-mistakes` },
  openGraph: {
    title: "Common CV Mistakes to Avoid | CVEngine",
    description:
      "Common CV and resume mistakes that cost candidates interviews — and how to fix them.",
    url: `${siteUrl}/resources/cv-mistakes`,
  },
};

export default function CvMistakesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Common CV Mistakes to Avoid",
    description:
      "The most common CV and resume mistakes that cost candidates interviews — and how to fix them.",
    url: `${siteUrl}/resources/cv-mistakes`,
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
            Common CV mistakes to avoid
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            A CV can fail at two stages: the automated ATS filter, and the human review. Different mistakes cause failure at each stage. This guide covers the most common errors that cost candidates interviews — both formatting issues that confuse applicant tracking systems and content issues that cause recruiters to move on.
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Formatting mistakes
            </h2>
            <ul className="list-disc pl-5 space-y-4 text-sm text-[var(--foreground)] leading-relaxed">
              <li>
                <strong>Multi-column layouts.</strong> Two-column CVs are common in design templates because they look compact and polished. But most ATS parsers read left to right, top to bottom — a two-column layout often results in the content from column one and column two being merged into a single scrambled stream. Use a single-column layout to be safe.
              </li>
              <li>
                <strong>Text inside images or graphics.</strong> If your name, contact details, job title, or any key information is inside a graphic element — a banner, a logo, an icon — the ATS will not extract it. The CV will appear to have no contact details or be unscored on the skills you placed there.
              </li>
              <li>
                <strong>Headers and footers containing contact information.</strong> Some ATS parsers skip header and footer regions entirely. Put your name and email in the main body of the document.
              </li>
              <li>
                <strong>Creative or unreadable fonts.</strong> Decorative fonts may look distinctive but are harder to read, especially at smaller sizes. Stick to clean, standard fonts and keep body text at 10–12pt.
              </li>
              <li>
                <strong>Inconsistent formatting.</strong> Mixing date formats (e.g. &quot;Jan 2020&quot; in one place and &quot;01/2021&quot; in another), inconsistent bullet styles, or varying heading sizes makes the CV look rushed and harder to scan.
              </li>
              <li>
                <strong>Saving as an image-based PDF.</strong> If you scan a printed CV or export from some design tools, the resulting PDF is an image. ATS cannot read images — the entire content will be invisible to the parser. Always export a text-based PDF from a word processor or Markdown tool.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Content mistakes
            </h2>
            <ul className="list-disc pl-5 space-y-4 text-sm text-[var(--foreground)] leading-relaxed">
              <li>
                <strong>A generic, untailored CV.</strong> Sending the same CV to every job without adjusting the summary, keywords, or emphasis is one of the most common and costly mistakes. Recruiters can tell when a CV is generic, and ATS systems score against the specific language in the job description. A targeted CV consistently outperforms a generic one.
              </li>
              <li>
                <strong>Responsibilities instead of achievements.</strong> Listing what your job required rather than what you actually did and achieved is the most common content weakness. &quot;Responsible for customer support&quot; tells a recruiter nothing about performance. &quot;Managed a queue of 80 tickets per week, resolving 95% within SLA&quot; tells them something specific and credible.
              </li>
              <li>
                <strong>An overlong or generic summary.</strong> A CV summary that says &quot;highly motivated professional with excellent communication skills&quot; is a placeholder, not a selling point. If you cannot write something specific to this application, leave the summary out rather than padding it with clichés.
              </li>
              <li>
                <strong>Employment gaps with no explanation.</strong> Unexplained gaps in employment history are not necessarily a problem, but leaving them unexplained forces recruiters to speculate. If you have a gap for travel, study, family, or health reasons, a brief note in the relevant role section keeps the reader informed.
              </li>
              <li>
                <strong>Missing keywords from the job description.</strong> ATS score CVs against the language in the job ad. If the job description asks for &quot;agile project management&quot; and your CV only says &quot;project work&quot;, you will score lower. Read the job description carefully and use the same terminology where it applies honestly.
              </li>
              <li>
                <strong>Typos and spelling errors.</strong> Errors in a CV signal a lack of care and attention to detail. Even a single typo can create a negative impression. Proofread carefully, use a spell checker, and ask someone else to read it before you send.
              </li>
              <li>
                <strong>Too much detail on old or irrelevant roles.</strong> A job from ten years ago that is not relevant to the role you are applying for does not need five bullet points. Keep older or less relevant roles to one or two lines to give space to the experience that matters most.
              </li>
              <li>
                <strong>An unprofessional email address.</strong> Your contact email should be based on your name. An address like &quot;crazylad99@...&quot; or a very old username creates an immediate negative first impression. Create a professional email specifically for job applications if needed.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Length mistakes
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>Too long.</strong> A CV padded to four or five pages with every role given equal space is exhausting to read and signals poor judgement about what matters. Trim older roles aggressively and focus space on recent, relevant experience.</li>
              <li><strong>Too short.</strong> A one-page CV that cuts important context to hit a page limit is worse than a well-structured two-page document. If you are removing meaningful content just to stay on one page, add the page.</li>
              <li><strong>The wrong length for the convention.</strong> US resumes are typically one page for under 10 years of experience. UK CVs are typically two pages for experienced candidates. Academic CVs have no page limit. Know the convention for your context.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              A quick checklist before you submit
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li>Single-column layout with standard section headings</li>
              <li>Text-based PDF or Word file (not an image)</li>
              <li>Contact details in the main body, not inside headers or images</li>
              <li>Summary is specific and tailored to this role</li>
              <li>Experience bullets focus on achievements, not just responsibilities</li>
              <li>Keywords from the job description appear naturally in your content</li>
              <li>No spelling errors or typos</li>
              <li>Consistent date format and formatting throughout</li>
              <li>Appropriate length for the convention (1 page US resume, 2 pages UK CV)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Check your keywords before you apply
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Use CVEngine&apos;s <Link href="/keyword-checker" className="text-[var(--accent)] hover:underline">keyword checker</Link> to compare your CV against the job description and see which terms are matched and which are missing. Then fix your CV in the <Link href="/cv" className="text-[var(--accent)] hover:underline">CV builder</Link> and download an updated ATS-friendly PDF or Word file.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
