import type { Metadata } from "next";
import Link from "next/link";
import FooterNav from "@/components/FooterNav";
import JsonLdWebPage from "@/components/JsonLdWebPage";

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
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | CVEngine",
    description:
      "Privacy Policy for CVEngine — how we handle data, cookies, and analytics.",
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
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <JsonLdWebPage data={jsonLd} />
      <header className="border-b border-[var(--card-border)] bg-[var(--card)]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xl font-bold text-[var(--foreground)] hover:underline"
          >
            CVEngine
          </Link>
          <nav className="flex items-center gap-3 text-sm" aria-label="Main">
            <Link href="/" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Home</Link>
            <Link href="/about" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">About</Link>
            <Link href="/contact" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Contact</Link>
            <Link href="/terms" className="text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">Terms</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--muted)] mb-4">
          Last updated: {new Date().toLocaleDateString("en-US")}
        </p>
        <div className="text-[var(--foreground)] text-sm leading-relaxed space-y-4">
          <p>
            CVEngine (&quot;we&quot;, &quot;our&quot;) operates cvengine.space. This page
            explains how we handle information when you use our site.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">
            Information we do not collect
          </h2>
          <p>
            You do not need an account to use CVEngine. We do not collect your
            name, email, or any content you type in the editor. Your CV text
            is processed only in your browser and sent to our server solely to
            generate the PDF; we do not store it.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">
            Information we may collect
          </h2>
          <p>
            When you visit our site, we may use cookies and similar technologies
            for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
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
          <h2 className="text-lg font-semibold mt-6 mb-2">Cookies</h2>
          <p>
            We use cookies for analytics and advertising as described above. You
            can control or delete cookies through your browser settings.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">Third parties</h2>
          <p>
            Our site may include services from Google (e.g. Analytics, AdSense).
            Their use of data is governed by their respective privacy policies
            (e.g. Google Privacy Policy).
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">Changes</h2>
          <p>
            We may update this Privacy Policy from time to time. The &quot;Last
            updated&quot; date at the top will reflect the latest version.
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">Contact</h2>
          <p>
            If you have questions about this Privacy Policy, please see our{" "}
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
