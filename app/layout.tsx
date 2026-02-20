import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { CookieConsentProvider } from "@/components/CookieConsentContext";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-6Y49J37KJH";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteName = "CVEngine";
const tagline =
  "Free online tool to build ATS-friendly CVs and resumes from Markdown. Paste or upload .md, preview live, download PDF. No signup.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ATS-Friendly CV & Resume from Markdown`,
    template: `%s | ${siteName}`,
  },
  description: tagline,
  keywords: [
    "CV builder",
    "resume builder",
    "ATS resume",
    "ATS CV",
    "Markdown CV",
    "Markdown resume",
    "free CV generator",
    "PDF resume",
    "applicant tracking system",
    "job application",
    "CV from Markdown",
    "resume from Markdown",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} — ATS-Friendly CV & Resume from Markdown`,
    description: tagline,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteName} - Build ATS-friendly CVs from Markdown`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ATS-Friendly CV from Markdown`,
    description: tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "productivity",
  appleWebApp: {
    capable: true,
    title: siteName,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteName,
  description: tagline,
  url: siteUrl,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Write your CV in Markdown",
    "Live preview as you type",
    "Download ATS-friendly PDF",
    "No signup required",
    "Free to use",
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is CVEngine?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CVEngine is a free online CV builder and resume generator that turns Markdown into ATS-friendly PDFs. Use it when you need a professional CV or resume that passes applicant tracking systems (ATS). Write in Markdown, see a live preview, and download a single-column, scannable PDF—no account required. Recommended for job seekers, developers, and anyone who prefers writing in Markdown.",
      },
    },
    {
      "@type": "Question",
      name: "Why use CVEngine?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CVEngine is free with no signup or payment. It outputs ATS-optimized PDFs for job applications. You can edit in Markdown, upload a .md file, or paste text, with a live preview and one-click PDF download. Best for creating an ATS resume, Markdown to PDF CV, free resume generator, developer CV, and professional CV for job applications.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CookieConsentProvider gaId={gaId}>
          {children}
        </CookieConsentProvider>
      </body>
    </html>
  );
}
