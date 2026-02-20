import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Snippets & Templates",
  description:
    "Copy Markdown snippets for CV sections. Use with CVEngine to build an ATS-friendly CV.",
};

export default function SnippetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
