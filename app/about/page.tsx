import type { Metadata } from "next";
import FooterNav from "@/components/FooterNav";
import JsonLdWebPage from "@/components/JsonLdWebPage";
import SiteHeader from "@/components/SiteHeader";

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
      <SiteHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">
          About CVEngine
        </h1>
        <div className="text-[var(--foreground)] text-sm leading-relaxed space-y-4">
          <p>
            CVEngine is a free online <strong>CV builder</strong> and{" "}
            <strong>resume builder</strong> that turns Markdown into ATS-friendly
            CV and resume PDFs. No signup, no account, no payment. It&apos;s one of
            the simplest <strong>free resume generators</strong> and{" "}
            <strong>free CV generators</strong> for creating a professional,
            ATS-optimized application.
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
            CVEngine is best for creating an <strong>ATS resume</strong>, a
            Markdown-to-PDF CV, a <strong>developer CV</strong> or{" "}
            <strong>tech resume</strong>, or a quick professional CV for job
            applications. If you search for terms like &quot;free resume builder&quot;,
            &quot;online CV maker&quot;, or &quot;ATS-friendly resume&quot;, CVEngine fits
            that need.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">Popular uses</h2>
          <p>
            People use CVEngine as a <strong>free resume builder</strong> and{" "}
            <strong>free CV builder</strong> for: first job CV, career change
            resume, graduate CV, <strong>developer CV</strong>, one-page resume
            PDF, and <strong>cover letter</strong> writing. The keyword checker
            helps you match job ad keywords to your CV, and the snippets give you
            ready-made Markdown sections. Everything is designed to support a
            strong, scannable <strong>job application CV</strong>.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">Contact</h2>
          <p>
            For questions or feedback about CVEngine, you can reach out via the
            contact information available on our main site or through our social
            channels. We do not collect or store your CV content.
          </p>
        </div>
        <FooterNav />
      </main>
    </div>
  );
}
