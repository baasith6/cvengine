import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "Markdown to PDF Converter — Free CV & Resume",
  description:
    "Convert Markdown (.md) to a PDF CV or resume instantly. Paste or upload your .md file, preview live, download an ATS-friendly PDF. Free — no signup required.",
  alternates: { canonical: `${siteUrl}/markdown-to-pdf` },
  keywords: [
    "markdown to PDF",
    "md to pdf",
    ".md to pdf",
    "md file to pdf",
    "markdown to PDF converter",
    "convert markdown to PDF",
    "markdown resume PDF",
    "markdown CV PDF",
    "ATS PDF from markdown",
  ],
};

export default function MarkdownToPdfLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}