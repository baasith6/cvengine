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
  title: "Privacy Policy",
  description:
    "Privacy Policy for CVEngine — how we handle data, cookies, and analytics.",
  alternates: { canonical: `${siteUrl}/privacy` },
  openGraph: {
    title: "Privacy Policy | CVEngine",
    description:
      "Privacy Policy for CVEngine — how we handle data, cookies, and analytics.",
    url: `${siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | CVEngine",
    description: "Privacy Policy for CVEngine — how we handle data, cookies, and analytics.",
    url: `${siteUrl}/privacy`,
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <JsonLdWebPage data={jsonLd} />
      <SiteHeader />
      
      <main style={{ flex: 1, maxWidth: 640, width: "100%", margin: "0 auto", padding: "48px 24px 64px" }} className="anim-fade-in-up">
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", margin: "0 0 6px" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 12, color: "var(--text-faint)", margin: "0 0 24px" }}>
          Last updated: {new Date().toLocaleDateString("en-US")}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 14, color: "var(--text)", lineHeight: 1.65 }}>
          <p>
            CVEngine (&quot;we&quot;, &quot;our&quot;) operates cvengine.space. This page
            explains how we handle information when you use our site.
          </p>
          
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 4px", color: "var(--text)" }}>
            Information we do not collect
          </h2>
          <p>
            You do not need an account to use CVEngine. We do not collect your
            name, email, or any content you type in the editor. Your CV text
            is processed only in your browser and sent to our server solely to
            generate the PDF; we do not store it.
          </p>

          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 4px", color: "var(--text)" }}>
            Information we may collect
          </h2>
          <p>
            When you visit our site, we may use cookies and similar technologies
            for:
          </p>
          <ul style={{ paddingLeft: 20, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 6 }}>
            <li>
              <strong>Analytics (e.g. Google Analytics)</strong> — to understand
              how many people visit the site and how they use it (e.g. page
              views, download button clicks). This may include your IP address,
              browser type, and general location.
            </li>
            <li>
              <strong>Advertising (e.g. Google AdSense)</strong> — to show
              relevant ads and measure ad performance. Ad partners may use
              cookies and similar data for targeting and measurement.
            </li>
          </ul>

          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 4px", color: "var(--text)" }}>Cookies</h2>
          <p>
            We use cookies for analytics and advertising as described above. You
            can control or delete cookies through your browser settings.
          </p>

          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 4px", color: "var(--text)" }}>Third parties</h2>
          <p>
            Our site may include services from Google (e.g. Analytics, AdSense).
            Their use of data is governed by their respective privacy policies.
          </p>
          <p>
            Learn more about how Google uses information from sites and apps that
            use Google services:{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              style={{ color: "var(--accent)", textDecoration: "underline" }}
              target="_blank"
              rel="noreferrer"
            >
              How Google uses data when you use our partners&apos; sites or apps
            </a>
            .
          </p>

          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 4px", color: "var(--text)" }}>Changes</h2>
          <p>
            We may update this Privacy Policy from time to time. The &quot;Last
            updated&quot; date at the top will reflect the latest version.
          </p>

          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 4px", color: "var(--text)" }}>Contact</h2>
          <p>
            If you have questions about this Privacy Policy, please see our{" "}
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