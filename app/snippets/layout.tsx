import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "CV Snippets & Templates",
  description:
    "Copy Markdown snippets for CV sections. Use with CVEngine to build an ATS-friendly CV.",
  alternates: { canonical: `${siteUrl}/snippets` },
  openGraph: {
    title: "CV Snippets | CVEngine",
    description:
      "Copy Markdown snippets for CV sections. Use with CVEngine to build an ATS-friendly CV.",
    url: `${siteUrl}/snippets`,
  },
};

export default function SnippetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
