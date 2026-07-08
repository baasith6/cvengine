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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <JsonLdWebPage data={jsonLd} />
      <SiteHeader />
      
      <main style={{ flex: 1, maxWidth: 640, width: "100%", margin: "0 auto", padding: "48px 24px 64px" }} className="anim-fade-in-up">
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", margin: "0 0 6px" }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: 12, color: "var(--text-faint)", margin: "0 0 24px" }}>
          Last updated: {new Date().toLocaleDateString("en-US")}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 14, color: "var(--text)", lineHeight: 1.65 }}>
          <p>
            By using CVEngine (&quot;the Service&quot;) at cvengine.space, you agree to
            these Terms of Service. If you do not agree, please do not use the
            Service.
          </p>
          
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 4px", color: "var(--text)" }}>Use of the Service</h2>
          <p>
            CVEngine is a free tool that converts Markdown to PDF for personal
            use (e.g. creating a CV or resume). You may use it for lawful
            purposes only. You may not use the Service to generate content that
            is illegal, harmful, or infringes others&apos; rights.
          </p>

          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 4px", color: "var(--text)" }}>No Warranty</h2>
          <p>
            The Service is provided &quot;as is&quot; without warranties of any kind. We
            do not guarantee that the Service will be error-free, secure, or
            uninterrupted. Use of the Service is at your own risk.
          </p>

          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 4px", color: "var(--text)" }}>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, CVEngine and its operators
            shall not be liable for any indirect, incidental, or consequential
            damages arising from your use of the Service.
          </p>

          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 4px", color: "var(--text)" }}>Your Content</h2>
          <p>
            You retain ownership of the content you enter into the Service. We do
            not store your CV content on our servers after the PDF is
            generated. See our{" "}
            <Link href="/privacy" style={{ color: "var(--accent)", textDecoration: "underline" }}>
              Privacy Policy
            </Link>{" "}
            for details.
          </p>

          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 4px", color: "var(--text)" }}>Changes</h2>
          <p>
            We may update these Terms from time to time. The &quot;Last updated&quot; date
            will reflect the latest version. Continued use of the Service after
            changes constitutes acceptance of the updated Terms.
          </p>

          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 4px", color: "var(--text)" }}>Contact</h2>
          <p>
            For questions about these Terms, please see our{" "}
            <Link href="/contact" style={{ color: "var(--accent)", textDecoration: "underline" }}>
              Contact
            </Link>{" "}
            page.
          </p>
        </div>
        
        <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 0", background: "var(--surface)", marginTop: 48 }}>
          <FooterNav />
        </footer>
      </main>
    </div>
  );
}