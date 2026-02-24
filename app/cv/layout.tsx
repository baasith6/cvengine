import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "Build CV",
  description:
    "Build your ATS-friendly CV from Markdown. Live preview, one-click PDF download. Free, no signup.",
  alternates: { canonical: `${siteUrl}/cv` },
  openGraph: {
    title: "Build CV | CVEngine",
    description:
      "Build your ATS-friendly CV from Markdown. Live preview, one-click PDF download. Free, no signup.",
    url: `${siteUrl}/cv`,
  },
};

export default function CvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
