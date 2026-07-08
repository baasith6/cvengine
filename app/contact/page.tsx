"use client";
import Link from "next/link";
import FooterNav from "@/components/FooterNav";
import JsonLdWebPage from "@/components/JsonLdWebPage";
import SiteHeader from "@/components/SiteHeader";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <JsonLdWebPage data={jsonLd} />
      <SiteHeader />
      
      <main style={{ flex: 1, maxWidth: 640, width: "100%", margin: "0 auto", padding: "48px 24px 64px" }} className="anim-fade-in-up">
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", margin: "0 0 24px" }}>
          Contact
        </h1>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14, color: "var(--text)", lineHeight: 1.65 }}>
          <p>
            For questions, feedback, or support regarding CVEngine, you can reach out directly via email.
          </p>
          <p>
            <strong style={{ fontWeight: 600 }}>Email:</strong>{" "}
            <a
              href="mailto:hello@cvengine.space"
              style={{ color: "var(--accent)", textDecoration: "underline" }}
            >
              hello@cvengine.space
            </a>
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 12 }}>
            We do not collect or store your CV content; see our{" "}
            <Link href="/privacy" style={{ color: "var(--accent)", textDecoration: "underline" }}>
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        
        <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 0", background: "var(--surface)", marginTop: 48 }}>
          <FooterNav />
        </footer>
      </main>
    </div>
  );
}