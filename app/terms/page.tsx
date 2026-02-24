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
  title: "Terms of Service",
  description:
    "Terms of Service for CVEngine — rules for using our free CV and resume builder.",
  alternates: { canonical: `${siteUrl}/terms` },
  openGraph: {
    title: "Terms of Service | CVEngine",
    description:
      "Terms of Service for CVEngine — rules for using our free CV and resume builder.",
    url: `${siteUrl}/terms`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | CVEngine",
    description:
      "Terms of Service for CVEngine — rules for using our free CV and resume builder.",
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service | CVEngine",
    description: "Terms of Service for using CVEngine, the free ATS-friendly CV builder.",
    url: `${siteUrl}/terms`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <JsonLdWebPage data={jsonLd} />
      <SiteHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">
          Terms of Service
        </h1>
        <p className="text-sm text-[var(--muted)] mb-6">
          Last updated: {new Date().toLocaleDateString("en-US")}
        </p>
        <div className="text-[var(--foreground)] text-sm leading-relaxed space-y-4">
          <p>
            By using CVEngine (&quot;the Service&quot;) at cvengine.space, you agree to
            these Terms of Service. If you do not agree, please do not use the
            Service.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">Use of the Service</h2>
          <p>
            CVEngine is a free tool that converts Markdown to PDF for personal
            use (e.g. creating a CV or resume). You may use it for lawful
            purposes only. You may not use the Service to generate content that
            is illegal, harmful, or infringes others&apos; rights.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">No Warranty</h2>
          <p>
            The Service is provided &quot;as is&quot; without warranties of any kind. We
            do not guarantee that the Service will be error-free, secure, or
            uninterrupted. Use of the Service is at your own risk.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, CVEngine and its operators
            shall not be liable for any indirect, incidental, or consequential
            damages arising from your use of the Service.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">Your Content</h2>
          <p>
            You retain ownership of the content you enter into the Service. We do
            not store your CV content on our servers after the PDF is
            generated. See our{" "}
            <Link href="/privacy" className="text-[var(--accent)] underline">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">Changes</h2>
          <p>
            We may update these Terms from time to time. The &quot;Last updated&quot; date
            will reflect the latest version. Continued use of the Service after
            changes constitutes acceptance of the updated Terms.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">Contact</h2>
          <p>
            For questions about these Terms, please see our{" "}
            <Link href="/contact" className="text-[var(--accent)] underline">
              Contact
            </Link>{" "}
            page.
          </p>
        </div>
        <FooterNav />
      </main>
    </div>
  );
}
