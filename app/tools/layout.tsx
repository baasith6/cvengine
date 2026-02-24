import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools",
  description: "CVEngine tools: Build CV, cover letter, keyword checker, and CV snippets.",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
