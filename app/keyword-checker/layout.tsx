import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Keyword Checker",
  description:
    "Paste job description and your CV. See word counts and which keywords match — runs in your browser.",
};

export default function KeywordCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
