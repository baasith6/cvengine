import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "Cover Letter from Markdown",
  description:
    "Write your cover letter in Markdown, preview live, and download an ATS-friendly PDF. Free, no signup.",
  alternates: { canonical: `${siteUrl}/cover-letter` },
  openGraph: {
    title: "Cover Letter | CVEngine",
    description:
      "Write your cover letter in Markdown, preview live, and download an ATS-friendly PDF. Free, no signup.",
    url: `${siteUrl}/cover-letter`,
  },
};

export default function CoverLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
