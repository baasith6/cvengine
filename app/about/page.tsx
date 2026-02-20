import type { Metadata } from "next";
import Link from "next/link";
import FooterNav from "@/components/FooterNav";
import JsonLdWebPage from "@/components/JsonLdWebPage";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "About",
  description:
    "About CVEngine — free ATS-friendly CV builder from Markdown. How it works and who it's for.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About | CVEngine",
    description:
      "About CVEngine — free ATS-friendly CV builder from Markdown. How it works and who it's for.",
    url: `${siteUrl}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: "About | CVEngine",
    description:
      "About CVEngine — free ATS-friendly CV builder from Markdown. How it works and who it's for.",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About | CVEngine",
    description: "About CVEngine — free ATS-friendly CV builder from Markdown. How it works and who it's for.",
    url: `${siteUrl}/about`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <JsonLdWebPage data={jsonLd} />
      <header className="border-b border-[var(--card-border)] bg-[var(--card)]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xl font-bold text-[var(--foreground)] hover:underline"
          >
            CVEngine
          </Link>
          <nav className="flex items-center gap-3 text-sm" aria-label="Main">
            <Link href="/" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">CV</Link>
            <Link href="/cover-letter" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Cover letter</Link>
            <Link href="/keyword-checker" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Keyword checker</Link>
            <Link href="/snippets" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Snippets</Link>
            <Link href="/privacy" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Privacy</Link>
            <Link href="/contact" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Contact</Link>
            <Link href="/terms" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Terms</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">
          About CVEngine
        </h1>
        <div className="text-[var(--foreground)] text-sm leading-relaxed space-y-4">
          <p>
            CVEngine is a free online tool that turns Markdown into
            ATS-friendly CV and resume PDFs. No signup, no account, no payment.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">How it works</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Write or paste</strong> — Type your CV in Markdown in the
              editor, or upload a .md file.
            </li>
            <li>
              <strong>Preview</strong> — See a live preview of how your CV will
              look as you edit.
            </li>
            <li>
              <strong>Download</strong> — Click &quot;Download ATS PDF&quot; to get a
              single-column, scannable PDF optimized for applicant tracking
              systems (ATS).
            </li>
          </ol>
          <h2 className="text-lg font-semibold mt-6 mb-2">Who it&apos;s for</h2>
          <p>
            Job seekers, developers, and anyone who prefers writing in Markdown
            or wants a simple, professional CV without creating an account.
            CVEngine is best for creating an ATS resume, a Markdown-to-PDF CV,
            or a quick professional CV for job applications.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">Contact</h2>
          <p>
            For questions or feedback about CVEngine, you can reach out via the
            contact information available on our main site or through our
            social channels. We do not collect or store your CV content.
          </p>
        </div>
        <FooterNav />
      </main>
    </div>
  );
}
