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
  title: "Writing Your First CV: A Simple Guide",
  description:
    "A simple guide to writing your first CV: what to include, structure, and how to get an ATS-ready PDF. Free from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources/first-cv` },
  openGraph: {
    title: "Writing Your First CV | CVEngine",
    description:
      "A simple guide to writing your first CV and getting an ATS-ready PDF.",
    url: `${siteUrl}/resources/first-cv`,
  },
};

export default function FirstCvPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Writing Your First CV: A Simple Guide",
    description:
      "A simple guide to writing your first CV: what to include, structure, and how to get an ATS-ready PDF.",
    url: `${siteUrl}/resources/first-cv`,
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
            Writing your first CV: a simple guide
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
            Your first CV does not need to be long or complicated. What it does need is a clear structure, honest content, and a format that both humans and applicant tracking systems can read easily. This guide walks you through what to include, how to structure it, and how to write about experience even when you feel you do not have much.
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              What to include in a first CV
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              A first CV typically includes five or six sections. You do not need all of them — include what you have and keep it honest.
            </p>
            <ul className="list-disc pl-5 space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
              <li>
                <strong>Contact details.</strong> Your full name at the top, followed by your email address, phone number, and optionally your city or region. You do not need a full postal address. If you have a relevant LinkedIn profile or portfolio, include the URL.
              </li>
              <li>
                <strong>Personal summary (optional but useful).</strong> A short paragraph — 2 to 3 sentences — that says who you are, what you are looking for, and what you bring. For a first CV this might focus on your degree subject, a relevant skill, and the type of role you are targeting.
              </li>
              <li>
                <strong>Education.</strong> List your most recent qualification first. Include the institution, qualification name, dates, and any results or distinctions worth mentioning. If you are still studying, note the expected graduation date. Include relevant modules if they support the application — for example, a data module on a business degree is worth mentioning when applying for an analyst role.
              </li>
              <li>
                <strong>Work experience.</strong> Include any paid or unpaid work — part-time jobs, internships, work placements, volunteering. For each, note the job title, organisation, dates, and 2–4 bullet points describing what you did. Focus on what you contributed and any results or responsibilities you can point to, even if the role was not directly related to the job you are applying for.
              </li>
              <li>
                <strong>Skills.</strong> A short list of specific, relevant skills. For technical roles, list tools and technologies. For other roles, include relevant soft skills such as communication, project coordination, or customer service — but be specific and only include things you can back up with examples at interview.
              </li>
              <li>
                <strong>Projects, courses, or interests (optional).</strong> If you have done a relevant side project, online course, or have interests directly related to the field, a brief section can add useful context. Keep it short and genuinely relevant.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              How to write about limited experience
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              The most common worry when writing a first CV is not having enough experience. But most entry-level employers understand this and are looking for evidence of attitude, capability, and potential rather than a long track record.
            </p>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              A few techniques that help:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li><strong>Use action verbs to start every bullet.</strong> &quot;Assisted&quot;, &quot;supported&quot;, &quot;coordinated&quot;, &quot;created&quot;, &quot;managed&quot; — these signal capability even when the scale is small.</li>
              <li><strong>Include context and scope.</strong> &quot;Served around 80 customers per shift&quot; or &quot;Helped organise a fundraising event for 120 attendees&quot; gives the reader a sense of scale.</li>
              <li><strong>Focus on transferable skills.</strong> Customer service, communication, time management, working under pressure — these matter in almost every role, and any job or volunteering experience can demonstrate them.</li>
              <li><strong>Include academic projects where relevant.</strong> A dissertation, group project, or significant piece of coursework can demonstrate research, writing, data, or analytical skills depending on the subject.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Structure and formatting
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed mb-3">
              Format matters almost as much as content for a first CV. Many employers use applicant tracking systems to filter applications, and a poorly formatted CV may not be parsed correctly even if the content is strong.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li>Use a single-column layout. Multi-column designs can confuse ATS parsers and result in your content being scrambled or ignored.</li>
              <li>Use clear, standard section headings: Contact, Education, Experience, Skills. Avoid clever alternatives that systems may not recognise.</li>
              <li>One page is almost always right for a first CV. If you are struggling to fill a page, that is a sign to go deeper on the experience and projects you do have.</li>
              <li>Use a readable font at 10–12pt. Avoid decorative fonts or anything that prioritises visual flair over legibility.</li>
              <li>Save the file as a PDF so the formatting is preserved. Make sure it is a text-based PDF, not a scanned image.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              A checklist before you send
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              <li>Is your contact email professional? A casual email address can make a poor first impression.</li>
              <li>Have you proofread for spelling and grammar? Errors in a first CV are particularly noticeable — read it aloud, and ask someone else to check it.</li>
              <li>Have you tailored it to this specific job? Even small changes — adjusting the summary and adding a keyword or two — improve your match score significantly.</li>
              <li>Is the formatting consistent? Same font, same bullet style, same date format throughout.</li>
              <li>Does it look clean when saved as a PDF? Open the exported file and check it looks as expected before sending.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
              Build and download your first CV
            </h2>
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              You can write your first CV in Markdown using CVEngine: add your details section by section, preview it live, and download an ATS-friendly PDF. No signup required. Use the{" "}
              <Link href="/snippets" className="text-[var(--accent)] hover:underline">CV snippets library</Link> for ready-made section templates — copy a snippet, paste it into the{" "}
              <Link href="/cv" className="text-[var(--accent)] hover:underline">CV builder</Link>, and fill in your own details. When you are ready to apply, download either a PDF or a Word (.docx) file from the same editor.
            </p>
          </section>
        </article>
        <FooterNav />
      </main>
    </div>
  );
}
