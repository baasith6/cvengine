import type { Metadata } from "next";
import Link from "next/link";
import FooterNav from "@/components/FooterNav";
import JsonLdWebPage from "@/components/JsonLdWebPage";
import SiteHeader from "@/components/SiteHeader";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact CVEngine — get in touch for questions or feedback about our free CV and resume builder.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact | CVEngine",
    description:
      "Contact CVEngine — get in touch for questions or feedback about our free CV and resume builder.",
    url: `${siteUrl}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | CVEngine",
    description:
      "Contact CVEngine — get in touch for questions or feedback about our free CV and resume builder.",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Contact | CVEngine",
    description:
      "Contact CVEngine for questions or feedback about our free ATS-friendly CV builder.",
    url: `${siteUrl}/contact`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <JsonLdWebPage data={jsonLd} />
      <SiteHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">
          Contact
        </h1>
        <div className="text-[var(--foreground)] text-sm leading-relaxed space-y-4">
          <p>
            For questions, feedback, or support about CVEngine, you can reach us
            by email.
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:hello@cvengine.space"
              className="text-[var(--accent)] hover:underline"
            >
              hello@cvengine.space
            </a>
          </p>
          <p className="text-[var(--muted)]">
            We aim to respond within a few business days. We do not collect or
            store your CV content; see our{" "}
            <Link href="/privacy" className="text-[var(--accent)] underline">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <FooterNav />
      </main>
    </div>
  );
}
