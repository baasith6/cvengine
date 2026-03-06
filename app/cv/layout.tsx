import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "Markdown to PDF CV Builder — ATS Resume & Word Download",
  description:
    "Convert a Markdown (.md) file to an ATS-friendly PDF or Word (.docx) CV. Paste or upload your .md file, live preview, download instantly. Free — no signup.",
  alternates: { canonical: `${siteUrl}/cv` },
  openGraph: {
    title: "Markdown to PDF CV Builder | CVEngine",
    description:
      "Convert a .md file to ATS-friendly PDF or Word (.docx) CV. Live preview, one-click download. Free — no signup.",
    url: `${siteUrl}/cv`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown to PDF CV Builder | CVEngine",
    description:
      "Convert Markdown (.md) to ATS-friendly PDF or Word CV. Free, no signup.",
  },
};

export default function CvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
