import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "CV Keyword Checker",
  description:
    "Paste job description and your CV. See word counts and which keywords match — runs in your browser.",
  alternates: { canonical: `${siteUrl}/keyword-checker` },
  openGraph: {
    title: "CV Keyword Checker | CVEngine",
    description:
      "Paste job description and your CV. See which keywords match or are missing. Free, runs in your browser.",
    url: `${siteUrl}/keyword-checker`,
  },
};

export default function KeywordCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
