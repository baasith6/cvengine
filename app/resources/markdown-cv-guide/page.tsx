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
  title: "Why Use Markdown for Your CV — Convert .md to PDF or Word",
  description:
    "Benefits of writing your CV in a .md (Markdown) file and how to convert it to an ATS-ready PDF or Word (.docx). Free guide from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources/markdown-cv-guide` },
  keywords: [
    "markdown CV guide",
    "md file CV",
    ".md to pdf",
    "markdown cv pdf",
    "markdown to docx cv",
    "write cv in markdown",
  ],
  openGraph: {
    title: "Why Use Markdown (.md) for Your CV | CVEngine",
    description:
      "Benefits of a .md file for your CV and how to convert it to ATS-ready PDF or Word.",
    url: `${siteUrl}/resources/markdown-cv-guide`,
  },
};

export default function MarkdownCvGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Why Use Markdown for Your CV (and How)",
    description:
      "Benefits of writing your CV in Markdown and a simple workflow to get an ATS-ready PDF.",
    url: `${siteUrl}/resources/markdown-cv-guide`,
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
        <article className="anim-fade-in-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-6">
            Why use Markdown (.md) for your CV — and how to convert it to PDF or Word
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            Markdown is a simple plain-text format using a <code className="font-mono text-xs">.md</code> file extension. Writing your CV in a <code className="font-mono text-xs">.md</code> file keeps your content portable, easy to edit in any text editor, and ready to convert to a clean ATS-friendly PDF or Word (.docx) in seconds. This guide explains what Markdown is, why it suits CVs well, and how to turn a <code className="font-mono text-xs">.md</code> file into the formats employers expect.
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What is Markdown?
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Markdown is a lightweight markup language. You write plain text and add simple symbols to apply formatting: a hash symbol (<code className="font-mono text-xs">#</code>) at the start of a line makes a heading, a hyphen (<code className="font-mono text-xs">-</code>) starts a bullet point, and wrapping words in double asterisks (<code className="font-mono text-xs">**like this**</code>) makes them bold.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Files saved with a <code className="font-mono text-xs">.md</code> extension can be opened in any text editor — Notepad, VS Code, Vim, or any other — and the raw text is always clean and readable. Tools like CVEngine convert the <code className="font-mono text-xs">.md</code> content into a formatted PDF or Word document on demand.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Why Markdown works well for CVs
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
              <li>
                <strong>Plain text, no lock-in.</strong> A Word document stores formatting in a proprietary format. A <code className="font-mono text-xs">.md</code> file is just text — you can open it in any editor on any operating system without needing a specific application.
              </li>
              <li>
                <strong>Easy to edit and version control.</strong> Because it is plain text, you can track changes to your CV in Git just like code. Each application version can be a commit, and you can compare any two versions to see exactly what changed.
              </li>
              <li>
                <strong>One source, multiple outputs.</strong> The same <code className="font-mono text-xs">.md</code> file can produce a PDF for job applications, a Word document for systems that require .docx, or a web page. You update the content once and re-export in whichever format you need.
              </li>
              <li>
                <strong>Keeps the focus on content.</strong> When writing in Word, it is easy to spend time adjusting margins and fonts instead of improving what you say. Markdown removes those distractions — you write content, and the tool handles presentation.
              </li>
              <li>
                <strong>ATS-friendly by nature.</strong> Markdown-generated PDFs are text-based and single-column by default. They parse well in applicant tracking systems because there are no complex layouts, text boxes, or image-embedded content.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Basic Markdown syntax for a CV
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              You only need a small subset of Markdown to write a complete CV. Here is what each element produces:
            </p>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden mb-3">
              {[
                ["# Your Name", "Large heading — use for your name at the top"],
                ["## Experience", "Section heading — use for major sections"],
                ["### Job Title", "Subsection heading — use for role titles"],
                ["- Bullet point", "List item — use for responsibilities"],
                ["**Bold text**", "Bold — use for key skills or employers"],
                ["Plain paragraph", "Normal text — use for summaries"],
              ].map(([md, desc], i) => (
                <div
                  key={md}
                  className={`flex items-start gap-4 px-4 py-3 text-sm ${i % 2 === 0 ? "bg-[var(--background)]/40" : ""}`}
                >
                  <code className="font-mono text-[var(--accent)] w-44 shrink-0 text-xs pt-0.5">{md}</code>
                  <span className="text-[var(--muted)]">{desc}</span>
                </div>
              ))}
            </div>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Ready-made Markdown sections — Work Experience, Education, Skills, and Summary — are available in the{" "}
              <Link href="/snippets" className="text-[var(--accent)] hover:underline">CV snippets library</Link>. Copy a snippet, paste it into the editor, and fill in your own details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              A simple Markdown CV structure
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              A typical Markdown CV follows this pattern from top to bottom:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong># Your Full Name</strong> — followed by email, phone, and optionally location on the next lines.</li>
              <li><strong>## Summary</strong> — 2–3 sentences about your background. Tailor this to each role.</li>
              <li><strong>## Experience</strong> — Each role as an H3 heading, with dates, then bullet points for what you did and achieved.</li>
              <li><strong>## Education</strong> — Degree, institution, graduation year, and any relevant distinctions.</li>
              <li><strong>## Skills</strong> — A concise list of tools, technologies, or competencies relevant to the role.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Who uses Markdown for their CV?
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Markdown CVs are popular with software developers and engineers who already write documentation in Markdown daily. It is also well suited to technical writers, data scientists, and anyone who stores personal projects in Git and wants their CV to live alongside them in the same repository.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              That said, you do not need to be technical to use Markdown. If you can type and follow simple rules, you can write a Markdown CV. The syntax takes around five minutes to learn, and once you know it, editing and tailoring your CV becomes significantly faster than working inside a word processor.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Convert a .md file to ATS-ready PDF or Word
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Write or paste your Markdown into CVEngine&apos;s editor, or upload your <code className="font-mono text-xs">.md</code> file directly. Preview how it looks live, then download either a single-column PDF optimised for ATS or a Word <code className="font-mono text-xs">.docx</code> file — both from the same Markdown source. No signup, no account.{" "}
              <Link href="/cv" className="text-[var(--accent)] hover:underline">Convert your .md file with CVEngine</Link>,{" "}
              <Link href="/markdown-to-pdf" className="text-[var(--accent)] hover:underline">learn about Markdown to PDF</Link>, or{" "}
              <Link href="/markdown-to-word" className="text-[var(--accent)] hover:underline">Markdown to Word</Link>.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
