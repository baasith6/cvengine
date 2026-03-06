import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "Markdown to PDF Cover Letter Builder — Word Download Too",
  description:
    "Convert a Markdown (.md) file to an ATS-friendly PDF or Word (.docx) cover letter. Paste or upload your .md file, preview live, download instantly. Free — no signup.",
  alternates: { canonical: `${siteUrl}/cover-letter` },
  openGraph: {
    title: "Markdown Cover Letter Builder | CVEngine",
    description:
      "Convert a .md file to ATS-friendly PDF or Word cover letter. Live preview, one-click download. Free — no signup.",
    url: `${siteUrl}/cover-letter`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Cover Letter Builder | CVEngine",
    description:
      "Convert Markdown (.md) to ATS-friendly PDF or Word cover letter. Free, no signup.",
  },
};

export default function CoverLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
