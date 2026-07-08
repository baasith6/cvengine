import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "Markdown to Word (.docx) Converter — Free CV Download",
  description:
    "Convert Markdown (.md) to a Word (.docx) CV or resume instantly. Paste or upload your .md file, preview live, download .docx. Free — no signup required.",
  alternates: { canonical: `${siteUrl}/markdown-to-word` },
  keywords: [
    "markdown to word",
    "markdown to docx",
    "md to word",
    "md to docx",
    ".md to word",
    "md file to docx",
    "markdown to word converter",
    "convert markdown to word",
    "markdown resume word",
    "markdown CV docx",
    "markdown to microsoft word",
  ],
};

export default function MarkdownToWordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}