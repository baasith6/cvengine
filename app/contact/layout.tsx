import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "Contact | CVEngine",
  description:
    "Contact CVEngine — get in touch for questions or feedback about our free CV and resume builder.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact | CVEngine",
    description:
      "Contact CVEngine — get in touch for questions or feedback about our free CV and resume builder.",
    url: `${siteUrl}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}