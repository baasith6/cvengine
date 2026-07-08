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
  title: "How to Write a Cover Letter",
  description:
    "How to write a cover letter that gets read: structure, what to include, what to avoid, and examples. Free guide from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources/how-to-write-cover-letter` },
  openGraph: {
    title: "How to Write a Cover Letter | CVEngine",
    description:
      "Structure, tips, and examples for writing a cover letter that gets read.",
    url: `${siteUrl}/resources/how-to-write-cover-letter`,
  },
};

export default function HowToWriteCoverLetterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Write a Cover Letter",
    description:
      "How to write a cover letter that gets read: structure, what to include, and what to avoid.",
    url: `${siteUrl}/resources/how-to-write-cover-letter`,
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
            How to write a cover letter
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            A cover letter is a short document — usually three to four paragraphs — that accompanies your CV when you apply for a job. Its purpose is not to repeat your CV but to explain why you are a strong fit for this specific role at this specific company. A well-written cover letter can significantly improve your chances of getting an interview. A poor one, or a generic one, is often worse than none at all.
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              When is a cover letter needed?
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Not every application requires a cover letter. In some cases — particularly with high-volume automated application portals — there is no field for one. But when a cover letter is invited or optional, writing one is usually worth the effort. It is an opportunity to address specific points the CV cannot easily convey: why you are interested in this company, why you are making a career change, or why there is a gap in your work history.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              Always include a cover letter when: the job ad asks for one, you are making a career change, you have a gap in your CV to explain, you are applying speculatively (without a specific vacancy listed), or the role is at a smaller organisation where the hiring manager is likely to read it personally.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Structure: what to include
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              A cover letter should be no longer than one page. Three to four concise paragraphs is the right length for most applications. Here is the standard structure:
            </p>
            <ol className="list-decimal pl-5 space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
              <li>
                <strong>Opening paragraph — who you are and why you are applying.</strong> State the role you are applying for and where you saw it advertised. Then say, in one sentence, why you are interested or what makes you a relevant candidate. Do not start with &quot;I am writing to apply for...&quot; — it is redundant. The subject line or form already conveys that. Start with something specific.
              </li>
              <li>
                <strong>Second paragraph — what you bring.</strong> This is the most important paragraph. Highlight two or three specific qualifications, skills, or experiences that directly match the job description. Be concrete — mention a project, a result, or an achievement. This paragraph should feel tailored to the job, not copied from a template.
              </li>
              <li>
                <strong>Third paragraph — why this company.</strong> Show that you understand the organisation and have a reason for wanting to work there specifically. Reference something real — their product, their mission, a project they have worked on, their growth stage, or their culture. Generic enthusiasm (&quot;I have always admired your company&quot;) reads as filler. Specific knowledge reads as genuine interest.
              </li>
              <li>
                <strong>Closing paragraph — call to action.</strong> Express that you would welcome the opportunity to discuss the role further. Keep it confident but not pushy. Thank the reader for their time. End with your name.
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What a strong cover letter looks like
            </h2>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
              <p className="text-xs font-semibold text-[var(--muted)] mb-3 uppercase tracking-wide">Example opening and second paragraph</p>
              <div className="text-sm text-[var(--foreground)] leading-relaxed space-y-3">
                <p>
                  &quot;I am applying for the Product Manager role listed on your careers page. I have spent the past four years as a PM at a SaaS startup, owning the roadmap for our core data pipeline product from zero to 12,000 paying customers.
                </p>
                <p>
                  The role&apos;s emphasis on working closely with engineering teams and translating complex technical constraints into customer-facing decisions mirrors exactly what I have been doing day-to-day. In my most recent cycle I led a re-architecture project that reduced customer-reported latency issues by 60% while shipping three new integrations on schedule. I believe the combination of technical depth and customer focus you are describing is where I work best.&quot;
                </p>
              </div>
            </div>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mt-3">
              Notice what this example does: it immediately establishes relevant experience, uses a specific number, mirrors language from the job description (&quot;working closely with engineering teams&quot;), and explains the match without repeating the CV line by line.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Common cover letter mistakes
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>Starting with &quot;I am writing to apply for...&quot;</strong> — redundant and immediately signals a generic letter.</li>
              <li><strong>Summarising your CV.</strong> The cover letter is not a prose version of your CV. It should add something the CV cannot — context, motivation, reasoning.</li>
              <li><strong>Generic praise for the company.</strong> &quot;I have always admired [Company]&quot; without any evidence of knowing what they do reads as template filler. Say something specific.</li>
              <li><strong>Making it too long.</strong> If your cover letter is longer than one page, cut it. Recruiters will not read past one page for most roles.</li>
              <li><strong>Not tailoring it.</strong> A cover letter that could apply to any company for any job will not get you past the first read. Every cover letter should be written or at least significantly edited for each application.</li>
              <li><strong>Typos or the wrong company name.</strong> Sending a letter addressed to the wrong employer — or with a typo in the company or role name — is an immediate rejection signal for many hiring managers.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Format and length
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              A cover letter should be:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--foreground)] leading-relaxed">
              <li>One page maximum</li>
              <li>Three to four paragraphs</li>
              <li>In the same visual style as your CV if submitted as a separate document</li>
              <li>Saved as a PDF to preserve formatting, unless the employer requests Word</li>
              <li>Addressed to a specific person where possible — research the hiring manager&apos;s name rather than writing &quot;To Whom It May Concern&quot;</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Write your cover letter with CVEngine
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              CVEngine&apos;s <Link href="/cover-letter" className="text-[var(--accent)] hover:underline">cover letter builder</Link> uses the same Markdown editor and live preview as the CV builder. Write your cover letter in plain text, preview it formatted, and download it as a PDF or Word (.docx) file. No account needed. If you want to keep your CV and cover letter in a consistent style, write both in CVEngine and download them together.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
