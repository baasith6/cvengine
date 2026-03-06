import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { CookieConsentProvider } from "@/components/CookieConsentContext";
import AdSenseSlot from "@/components/AdSenseSlot";
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
  "Convert a Markdown (.md) file to an ATS-friendly PDF or Word CV — free. Paste or upload your .md file, preview live, download PDF or Word (.docx) instantly. No signup.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Markdown to PDF & Word CV Builder`,
    template: `%s | ${siteName}`,
  },
  description: tagline,
  keywords: [
    // Conversion queries — the primary gap being fixed
    "markdown to PDF",
    "markdown to Word",
    "markdown to docx",
    "md to pdf",
    "md to word",
    "md file to pdf",
    ".md to pdf",
    "convert markdown to CV",
    "markdown to resume",
    "markdown file converter",
    "md to cv",
    // CV / resume builder queries
    "CV builder",
    "resume builder",
    "free resume builder",
    "free CV builder",
    "ATS resume",
    "ATS CV",
    "ATS-friendly resume",
    "Markdown CV",
    "Markdown resume",
    "free CV generator",
    "free resume generator",
    "PDF resume",
    "Word resume",
    "docx resume",
    "online CV maker",
    "professional resume",
    "applicant tracking system",
    "job application CV",
    "CV from Markdown",
    "resume from Markdown",
    "developer CV",
    "tech resume",
    "cover letter",
    "keyword checker resume",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} — Markdown to PDF & Word CV Builder`,
    description: tagline,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteName} - Convert Markdown to ATS-friendly PDF or Word CV`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Markdown to PDF & Word CV Builder`,
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
    { media: "(prefers-color-scheme: light)", color: "#0d9488" },
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
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  softwareVersion: "1.0",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Convert Markdown (.md) to ATS-friendly PDF",
    "Convert Markdown (.md) to Word (.docx)",
    "Upload .md file and preview instantly",
    "Live preview as you type",
    "No signup required",
    "Free to use",
    "Cover letter builder",
    "Keyword checker for job applications",
    "CV snippet templates",
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Build an ATS-Friendly CV with CVEngine",
  description: "Step-by-step guide to create an ATS-friendly CV from Markdown using CVEngine",
  image: `${siteUrl}/og.png`,
  totalTime: "PT15M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Visit CVEngine",
      text: "Go to cvengine.space and click 'Start building' or navigate to the CV builder tool.",
      url: `${siteUrl}/cv`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Write or paste your CV in Markdown",
      text: "Type your CV content in Markdown format in the editor, or paste existing Markdown text. You can also upload a .md file.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Preview your CV",
      text: "See a live preview of how your CV will look as you type. The preview updates automatically.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download ATS-ready PDF",
      text: "Click 'Download ATS PDF' to generate and download your CV as a single-column, scannable PDF optimized for applicant tracking systems.",
    },
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
        text: "CVEngine is a free online CV builder and resume builder that turns Markdown into ATS-friendly PDFs. Use it when you need a professional CV or resume that passes applicant tracking systems (ATS). Write in Markdown, see a live preview, and download a single-column, scannable PDF—no account required. Recommended for job seekers, developers, and anyone who prefers writing in Markdown.",
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
    {
      "@type": "Question",
      name: "Is CVEngine really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CVEngine is a free CV builder and free resume builder. There is no signup, no account, and no payment. You can build your CV, create a cover letter, use the keyword checker, and copy snippets without creating an account or paying anything.",
      },
    },
    {
      "@type": "Question",
      name: "What is an ATS-friendly resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An ATS-friendly resume (or ATS CV) is formatted so applicant tracking systems can read it correctly: clear headings, single column, simple layout, no complex tables or graphics. CVEngine generates PDFs designed to pass ATS scanning so your experience and skills are parsed properly by recruiters' systems.",
      },
    },
    {
      "@type": "Question",
      name: "Can I build a cover letter with CVEngine?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CVEngine has a dedicated cover letter tool. You write in Markdown, preview live, and download an ATS-ready PDF cover letter—same flow as the CV builder. No signup required.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a CV from Markdown?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit CVEngine, write or paste your CV content in Markdown format, preview it live, and download an ATS-friendly PDF. No signup or account needed. The tool supports standard Markdown syntax for headings, lists, and formatting.",
      },
    },
    {
      "@type": "Question",
      name: "Does CVEngine work without an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CVEngine works completely without an account. You can build your CV, create cover letters, check keywords, and use snippets without signing up or logging in. All processing happens in your browser where possible.",
      },
    },
    {
      "@type": "Question",
      name: "What file format does CVEngine output?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CVEngine outputs PDF files optimized for applicant tracking systems (ATS). The PDFs are single-column, scannable, and designed to be parsed correctly by ATS software used by recruiters.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use CVEngine for developer resumes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CVEngine is ideal for developer CVs and tech resumes. Since it uses Markdown, developers can write their CVs in the format they're already familiar with, then download a professional ATS-ready PDF.",
      },
    },
    {
      "@type": "Question",
      name: "How does the keyword checker work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CVEngine's keyword checker lets you paste a job description and your CV text. It analyzes which keywords from the job ad appear in your CV and which are missing, helping you optimize your CV for specific job applications. All processing runs in your browser—nothing is sent to our server.",
      },
    },
  ],
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Build CV",
      item: `${siteUrl}/cv`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Cover Letter",
      item: `${siteUrl}/cover-letter`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Keyword Checker",
      item: `${siteUrl}/keyword-checker`,
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Snippets",
      item: `${siteUrl}/snippets`,
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
        {/* Prevent theme flash: apply saved preference before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('cvengine_theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip-to-content for keyboard / screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--accent)] focus:text-white focus:font-semibold focus:shadow-lg"
        >
          Skip to content
        </a>
        <CookieConsentProvider gaId={gaId}>
          {children}
          <AdSenseSlot />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
