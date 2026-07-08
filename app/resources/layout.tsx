import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "Resources | CVEngine",
  description:
    "Guides on writing ATS-friendly resumes, using Markdown for your CV, matching your CV to job descriptions, and more. Free tips from CVEngine.",
  alternates: { canonical: `${siteUrl}/resources` },
  openGraph: {
    title: "Resources | CVEngine",
    description:
      "Guides on ATS resumes, Markdown CVs, cover letters, and job application tips.",
    url: `${siteUrl}/resources`,
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}