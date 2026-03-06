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
      <main id="main-content" className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">
          About CVEngine
        </h1>
        <div className="text-[var(--foreground)] text-sm leading-relaxed space-y-4">
          <p>
            CVEngine is a free online CV and resume builder that converts
            Markdown into clean, ATS-friendly PDFs and Word (.docx) files. There
            is no account to create and no payment required — write your CV,
            preview it, and download it in seconds.
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">What CVEngine does</h2>
          <p>
            CVEngine takes standard Markdown — plain text with simple formatting
            like headings, bullet points, and bold — and converts it into a
            professionally formatted CV. The output is a single-column PDF
            designed to pass through applicant tracking systems (ATS) without
            formatting errors, or a Word (.docx) file you can open in Microsoft
            Word, Google Docs, or LibreOffice.
          </p>
          <p>
            The editor shows a live preview as you type, so you can see exactly
            what the finished CV will look like before downloading. You can also
            upload an existing <code className="font-mono text-xs">.md</code> file
            from your computer and convert it in one click.
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">How it works</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Write or upload</strong> — Type your CV content directly
              in the Markdown editor, or upload a <code className="font-mono text-xs">.md</code> file
              from your device.
            </li>
            <li>
              <strong>Preview live</strong> — The right panel renders your CV in
              real time so you can check headings, bullet points, and overall
              layout before downloading.
            </li>
            <li>
              <strong>Download PDF or Word</strong> — Click &quot;Download PDF&quot; for
              an ATS-optimised single-column PDF, or &quot;Download Word&quot; for a
              .docx file compatible with any Word processor.
            </li>
          </ol>

          <h2 className="text-lg font-semibold mt-6 mb-2">Who it&apos;s for</h2>
          <p>
            CVEngine is useful for anyone who wants a clean, professional CV
            without the overhead of a complex word processor. It is particularly
            well suited to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Developers and technical writers who are already comfortable with Markdown</li>
            <li>Recent graduates writing their first CV and wanting a simple starting point</li>
            <li>Career changers who need to tailor a master CV quickly for multiple applications</li>
            <li>Anyone who wants an ATS-friendly format without manually managing column layouts or fonts</li>
          </ul>

          <h2 className="text-lg font-semibold mt-6 mb-2">Other tools</h2>
          <p>
            Alongside the CV builder, CVEngine includes a cover letter builder
            (same Markdown-to-PDF workflow), a keyword checker that compares your
            CV against a job description, and a snippets library with ready-made
            Markdown sections for common CV components like Work Experience,
            Education, and Skills.
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">Privacy</h2>
          <p>
            CVEngine does not store the content you type in the editor. Your CV
            text is sent to the server only to generate the PDF and is not
            retained. No account is required, and no personal data is collected
            beyond standard analytics. See the{" "}
            <a href="/privacy" className="text-[var(--accent)] underline">Privacy Policy</a> for
            full details.
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">Contact</h2>
          <p>
            For questions or feedback, see the{" "}
            <a href="/contact" className="text-[var(--accent)] underline">Contact page</a>.
          </p>
        </div>
        <FooterNav />
      </main>
    </div>
  );
}
