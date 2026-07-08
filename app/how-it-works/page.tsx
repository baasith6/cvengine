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
  title: "How It Works",
  description:
    "Learn how to build an ATS-friendly CV with CVEngine. Step-by-step guide: write in Markdown, preview live, download PDF. Free, no signup.",
  alternates: { canonical: `${siteUrl}/how-it-works` },
  openGraph: {
    title: "How It Works | CVEngine",
    description:
      "Learn how to build an ATS-friendly CV with CVEngine. Step-by-step guide: write in Markdown, preview live, download PDF.",
    url: `${siteUrl}/how-it-works`,
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | CVEngine",
    description:
      "Learn how to build an ATS-friendly CV with CVEngine. Step-by-step guide.",
  },
};

export default function HowItWorksPage() {
  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "How It Works | CVEngine",
    description:
      "Step-by-step guide to building an ATS-friendly CV with CVEngine",
    url: `${siteUrl}/how-it-works`,
  };

  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Build an ATS-Friendly CV with CVEngine",
    description: "Step-by-step guide to create an ATS-friendly CV from Markdown using CVEngine",
    image: `${siteUrl}/og.png`,
    totalTime: "PT15M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Start building",
        text: "Visit CVEngine and click 'Start building' to open the CV builder. No signup or account required.",
        url: `${siteUrl}/cv`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Write or paste your CV in Markdown",
        text: "Type your CV content directly in the editor using Markdown syntax, or paste existing Markdown text. You can also upload a .md file. Use headings (#), lists (-), and simple formatting.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Preview your CV",
        text: "See a live preview of how your CV will look as you type. The preview updates automatically.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Download ATS-ready PDF",
        text: "Click 'Download ATS PDF' to generate and download your CV as a single-column, scannable PDF optimized for applicant tracking systems.",
      },
    ],
  };

  const steps = [
    {
      number: "1",
      title: "Start building",
      description:
        "Visit CVEngine and click 'Start building' to open the CV builder. No signup or account required.",
      action: "Go to CV builder",
      href: "/cv",
    },
    {
      number: "2",
      title: "Write or paste your CV in Markdown",
      description:
        "Type your CV content directly in the editor using Markdown syntax, or paste existing Markdown text. You can also upload a .md file. Use headings (#), lists (-), and simple formatting.",
      action: "See Markdown examples",
      href: "/snippets",
    },
    {
      number: "3",
      title: "Preview your CV live",
      description:
        "As you type, see a live preview of how your CV will look. The preview updates automatically, so you can adjust formatting and content in real time.",
    },
    {
      number: "4",
      title: "Download your ATS-ready PDF",
      description:
        "Click 'Download ATS PDF' to generate and download your CV as a single-column, scannable PDF optimized for applicant tracking systems (ATS). The PDF is ready to submit with job applications.",
      action: "Build your CV now",
      href: "/cv",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <JsonLdWebPage data={jsonLdWebPage} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />
      <SiteHeader />
      <main id="main-content" className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2 anim-fade-in-up">
          How CVEngine works
        </h1>
        <p className="text-[var(--muted)] text-sm mb-8 anim-fade-in-up" style={{ animationDelay: "0.05s" }}>
          Build your ATS-friendly CV in four simple steps. No signup. Free.
        </p>

        <div className="space-y-8 mb-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex gap-4 sm:gap-6 anim-fade-in-up"
              style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
            >
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-lg sm:text-xl">
                {step.number}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-2">
                  {step.title}
                </h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
                  {step.description}
                </p>
                {step.action && step.href && (
                  <Link
                    href={step.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline"
                  >
                    {step.action}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
            Why use CVEngine?
          </h2>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 shrink-0 text-[var(--accent)] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong className="text-[var(--foreground)]">Free</strong> — no signup, no account, no payment</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 shrink-0 text-[var(--accent)] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong className="text-[var(--foreground)]">ATS-optimized</strong> — PDFs designed to pass applicant tracking systems</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 shrink-0 text-[var(--accent)] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong className="text-[var(--foreground)]">Markdown support</strong> — write in the format you know, or paste existing .md files</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 shrink-0 text-[var(--accent)] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong className="text-[var(--foreground)]">Live preview</strong> — see exactly how your CV looks as you edit</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 shrink-0 text-[var(--accent)] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong className="text-[var(--foreground)]">One-click download</strong> — get your PDF instantly</span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <Link
            href="/cv"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] shadow-md hover:shadow-lg transition-all"
          >
            Start building your CV
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <FooterNav />
      </main>
    </div>
  );
}
