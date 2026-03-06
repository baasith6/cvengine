"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import FooterNav from "@/components/FooterNav";

const TOOLS = [
  {
    href: "/cv",
    title: "Build CV",
    description: "Write in Markdown, preview live, download an ATS-friendly PDF.",
    cta: "Start building",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/cover-letter",
    title: "Cover letter",
    description: "Same flow: Markdown → preview → ATS-ready PDF.",
    cta: "Write cover letter",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/keyword-checker",
    title: "Keyword checker",
    description: "Paste job ad + your CV. See what matches and what's missing.",
    cta: "Check keywords",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    href: "/snippets",
    title: "CV snippets",
    description: "Copy section templates in Markdown. Drop them into the CV builder.",
    cta: "Browse snippets",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <SiteHeader />
      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero: one primary CTA */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight mb-3">
            Your CV, ATS-ready in minutes
          </h1>
          <p className="text-[var(--muted)] text-lg max-w-xl mx-auto mb-8">
            Write in Markdown · Live preview · Download PDF. No signup. Free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
            >
              Start building
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:underline transition-colors"
            >
              How it works →
            </Link>
          </div>
        </div>

        {/* Other tools */}
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">
            Other tools
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[var(--accent)]/30 hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors">
                  {tool.icon}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-[var(--foreground)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-sm text-[var(--muted)] mb-4">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-[var(--accent)]">
                    {tool.cta}
                    <svg className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SEO content: crawlable, keyword-rich, helpful for search & AI */}
        <footer className="mt-16 pt-10 border-t border-[var(--card-border)] space-y-10">
          <section>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">
              What is CVEngine?
            </h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
              CVEngine is a <strong className="text-[var(--foreground)]">free CV builder</strong> and{" "}
              <strong className="text-[var(--foreground)]">resume builder</strong> that turns Markdown into
              ATS-friendly PDFs. No signup, no account, no payment. You write or paste your CV in
              Markdown, see a live preview, and download a single-column PDF optimized for{" "}
              <strong className="text-[var(--foreground)]">applicant tracking systems (ATS)</strong>.
              Perfect when you need a <strong className="text-[var(--foreground)]">professional resume</strong> or
              CV for job applications without creating an account.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Whether you search for &quot;free resume maker&quot;, &quot;online CV builder&quot;, &quot;ATS resume
              checker&quot;, or &quot;Markdown to PDF CV&quot;, CVEngine gives you one place: build your CV,
              write a cover letter, check job keywords against your CV, and copy ready-made section
              snippets—all free and private in your browser where possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">
              Why use a free CV and resume builder?
            </h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
              Most companies use <strong className="text-[var(--foreground)]">applicant tracking
              systems</strong> to scan resumes before a human sees them. A clean, scannable,
              single-column <strong className="text-[var(--foreground)]">ATS resume</strong> or{" "}
              <strong className="text-[var(--foreground)]">ATS CV</strong> improves your chances of
              getting shortlisted. CVEngine outputs PDFs designed for that: simple layout, clear
              headings, no graphics that break parsing. You get a <strong className="text-[var(--foreground)]">free
              resume generator</strong> and <strong className="text-[var(--foreground)]">free CV
              generator</strong> in one—no trial, no paywall.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Popular use cases: <strong className="text-[var(--foreground)]">developer CV</strong>,{" "}
              <strong className="text-[var(--foreground)]">tech resume</strong>, graduate CV, career
              change resume, and <strong className="text-[var(--foreground)]">job application
              CV</strong>. If you like writing in Markdown or want to keep your content in .md
              files, CVEngine is one of the simplest ways to turn that into a downloadable{" "}
              <strong className="text-[var(--foreground)]">PDF resume</strong> or CV.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">
              Free tools for job seekers
            </h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
              Beyond the <strong className="text-[var(--foreground)]">CV builder</strong>, CVEngine
              offers a <strong className="text-[var(--foreground)]">cover letter</strong> tool (same
              flow: Markdown → preview → PDF), a <strong className="text-[var(--foreground)]">keyword
              checker</strong> so you can paste a job ad and your CV and see which job keywords
              appear or are missing, and <strong className="text-[var(--foreground)]">CV
              snippets</strong>—Markdown templates for experience, education, and skills you can
              copy into the builder. All aimed at helping you create a strong, ATS-friendly
              application.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Best for: <strong className="text-[var(--foreground)]">free resume builder</strong>,{" "}
              <strong className="text-[var(--foreground)]">ATS-friendly resume</strong>, Markdown
              CV, online CV maker, professional CV download, and one-page resume PDF. Start with{" "}
              <Link href="/cv" className="text-[var(--accent)] hover:underline">Build CV</Link>,{" "}
              <Link href="/cover-letter" className="text-[var(--accent)] hover:underline">Cover letter</Link>,{" "}
              <Link href="/keyword-checker" className="text-[var(--accent)] hover:underline">Keyword checker</Link>, or{" "}
              <Link href="/snippets" className="text-[var(--accent)] hover:underline">Snippets</Link>—no
              signup required.
            </p>
          </section>

          <FooterNav />
        </footer>
      </main>
    </div>
  );
}
