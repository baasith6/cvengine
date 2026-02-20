import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cover Letter from Markdown",
  description:
    "Write your cover letter in Markdown, preview live, and download an ATS-friendly PDF. Free, no signup.",
};

export default function CoverLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
