"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import JsonLdWebPage from "@/components/JsonLdWebPage";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof process.env.VERCEL_URL === "string"
    ? `https://${process.env.VERCEL_URL}`
    : "https://cvengine.space");

type RelatedTool = { name: string; href: string };

type Article = {
  slug: string;
  title: string;
  description: string;
  category: "ATS" | "Markdown CV" | "Cover Letter" | "Job Search" | "Formatting";
  readTime: string;
  relatedTool?: RelatedTool;
};

const ARTICLES: Article[] = [
  {
    slug: "how-to-write-ats-resume",
    title: "How to write an ATS-friendly resume",
    description: "What applicant tracking systems look for and how to format your resume so it gets past the bots.",
    category: "ATS",
    readTime: "6 min read",
  },
  {
    slug: "markdown-cv-guide",
    title: "Why use Markdown for your CV (and how)",
    description: "Benefits of writing your CV in Markdown and a simple workflow to get an ATS-ready PDF.",
    category: "Markdown CV",
    readTime: "5 min read",
    relatedTool: { name: "CV Builder", href: "/cv" }
  },
  {
    slug: "match-cv-to-job-description",
    title: "How to match your CV to a job description",
    description: "Use keywords and structure to tailor your CV so it aligns with what recruiters and ATS look for.",
    category: "ATS",
    readTime: "6 min read",
    relatedTool: { name: "Keyword Checker", href: "/keyword-checker" }
  },
  {
    slug: "one-page-resume",
    title: "One-page resume: when and how",
    description: "When to use a one-page resume and how to fit your experience without cutting what matters.",
    category: "Formatting",
    readTime: "4 min read",
  },
  {
    slug: "first-cv",
    title: "Writing your first CV: a simple guide",
    description: "What to include, structure, and how to get an ATS-ready PDF for your first CV.",
    category: "Job Search",
    readTime: "5 min read",
  },
  {
    slug: "cv-summary",
    title: "How to write a CV summary or personal statement",
    description: "Write a strong opening summary that grabs attention and sets the tone for the rest of your CV.",
    category: "Formatting",
    readTime: "3 min read",
  },
  {
    slug: "cv-vs-resume",
    title: "CV vs resume: what is the difference?",
    description: "When to use a CV, when to use a resume, and how the two documents differ by country and context.",
    category: "Formatting",
    readTime: "5 min read",
  },
  {
    slug: "cv-mistakes",
    title: "Common CV mistakes to avoid",
    description: "Formatting and content errors that cost candidates interviews — and how to fix them before you apply.",
    category: "Formatting",
    readTime: "6 min read",
  },
  {
    slug: "how-to-write-cover-letter",
    title: "How to write a cover letter",
    description: "Structure, examples, and tips for writing a cover letter that complements your CV and gets read.",
    category: "Cover Letter",
    readTime: "5 min read",
    relatedTool: { name: "Cover Letter Builder", href: "/cover-letter" }
  },
];

const CATEGORIES = ["All", "ATS", "Markdown CV", "Cover Letter", "Job Search", "Formatting"];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Resources | CVEngine",
    description: "Guides on ATS resumes, Markdown CVs, cover letters, and job applications.",
    url: `${siteUrl}/resources`,
  };

  const featured = ARTICLES.find((a) => a.slug === "how-to-write-ats-resume")!;
  const filteredArticles = ARTICLES.filter((article) => {
    if (activeCategory === "All") return true;
    return article.category === activeCategory;
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <JsonLdWebPage data={jsonLd} />
      <SiteHeader />
      
      <main style={{ flex: 1, maxWidth: 800, width: "100%", margin: "0 auto", padding: "48px 24px 64px" }} className="anim-fade-in-up">
        
        {/* ── 1. HERO SECTION ── */}
        <section style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: "calc(1.8rem + 1vw)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", margin: "0 0 12px", lineHeight: 1.15 }}>
            Resources
          </h1>
          <p style={{ fontSize: 16, fontWeight: 650, color: "var(--text)", margin: "0 0 12px", lineHeight: 1.4 }}>
            Practical guides for writing, formatting, and exporting better CVs.
          </p>
          <p style={{ fontSize: 14.5, color: "var(--text-muted)", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 640 }}>
            Learn how to create ATS-friendly resumes, write stronger cover letters, use Markdown effectively, and avoid common CV mistakes.
          </p>
          
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <Link
              href="/cv"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 18px",
                borderRadius: 6,
                fontSize: 13.5,
                fontWeight: 600,
                color: "#ffffff",
                background: "var(--accent)",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent)"}
            >
              Start building
            </Link>
            
            <a
              href="#guides"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "7px 16px",
                borderRadius: 6,
                border: "1px solid var(--border)",
                fontSize: 13.5,
                fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
                background: "var(--surface)",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              Browse guides
            </a>
          </div>
        </section>

        {/* ── 2. FEATURED GUIDE SECTION ── */}
        <section style={{ marginBottom: 40 }}>
          <div style={{
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--surface)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            position: "relative",
          }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Featured Guide
              </span>
              <span style={{ fontSize: 11, color: "var(--text-faint)" }}>
                {featured.category} Guide · {featured.readTime}
              </span>
            </div>
            
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", margin: 0 }}>
              {featured.title}
            </h3>
            
            <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5, margin: 0, maxWidth: 640 }}>
              {featured.description}
            </p>

            <div style={{ marginTop: 8 }}>
              <Link
                href={`/resources/${featured.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--accent)",
                  textDecoration: "none",
                  gap: 4,
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--accent-hover)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--accent)"}
              >
                Read guide <span style={{ fontSize: 11 }}>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 3. CATEGORY CHIPS ── */}
        <section id="guides" style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    border: "1px solid",
                    borderColor: active ? "var(--accent)" : "var(--border)",
                    background: active ? "var(--accent-bg)" : "var(--surface)",
                    color: active ? "var(--accent)" : "var(--text-muted)",
                    padding: "4px 12px",
                    borderRadius: 99,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── 4. ARTICLES GRID ── */}
        <section style={{ marginBottom: 48 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article) => (
              <div
                key={article.slug}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  background: "var(--surface)",
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 180,
                  transition: "all 0.15s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                  (e.currentTarget as HTMLElement).style.background = "var(--surface-raised)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                }}
                onClick={(e) => {
                  // Allow nested links to work normally
                  if ((e.target as HTMLElement).tagName === "A") return;
                  window.location.href = `/resources/${article.slug}`;
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-faint)", marginBottom: 8 }}>
                    <span>{article.category} Guide</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <h4 style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text)", margin: "0 0 6px" }}>
                    {article.title}
                  </h4>
                  
                  <p style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.45, margin: "0 0 12px" }}>
                    {article.description}
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 12 }}>
                  <Link
                    href={`/resources/${article.slug}`}
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "var(--accent)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    Read guide <span style={{ fontSize: 10 }}>→</span>
                  </Link>

                  {article.relatedTool && (
                    <Link
                      href={article.relatedTool.href}
                      style={{
                        fontSize: 11.5,
                        color: "var(--text-faint)",
                        textDecoration: "none",
                        border: "1px solid var(--border)",
                        borderRadius: 4,
                        padding: "2px 6px",
                        background: "var(--surface)"
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                        (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-faint)";
                      }}
                    >
                      Tool: {article.relatedTool.name}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--text-faint)", fontSize: 13.5, padding: "32px 0" }}>
              No articles found in this category.
            </p>
          )}
        </section>

        {/* ── 5. BOTTOM CTA SECTION ── */}
        <section style={{ marginBottom: 48 }}>
          <div style={{
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--surface-raised)",
            padding: "32px 24px",
            textAlign: "center",
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
              Ready to build your CV?
            </h2>
            <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.4, margin: "0 0 20px" }}>
              Create a clean ATS-friendly CV in minutes. No account required.
            </p>
            <Link
              href="/cv"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 18px",
                borderRadius: 6,
                fontSize: 13.5,
                fontWeight: 600,
                color: "#ffffff",
                background: "var(--accent)",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "var(--accent)"}
            >
              Build your CV
            </Link>
          </div>
        </section>

        {/* ── 6. STRUCTURED FOOTER ── */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 0 0" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            
            {/* Brand Column */}
            <div className="md:col-span-4 flex flex-col gap-3">
              <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>
                CVEngine
              </span>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                Private Markdown-based CV and cover letter builder.
              </p>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              
              {/* Tools Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Tools
                </span>
                <Link href="/cv" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">CV Builder</Link>
                <Link href="/cover-letter" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Cover Letter</Link>
                <Link href="/keyword-checker" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Keyword Checker</Link>
                <Link href="/snippets" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Snippets</Link>
              </div>

              {/* Resources Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Resources
                </span>
                <Link href="/resources/how-to-write-ats-resume" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">ATS Resume Guide</Link>
                <Link href="/markdown-to-pdf" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Markdown to PDF</Link>
                <Link href="/markdown-to-word" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Markdown to Word</Link>
                <Link href="/how-it-works" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">How it works</Link>
              </div>

              {/* Legal Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="col-span-2 sm:col-span-1">
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Legal
                </span>
                <Link href="/privacy" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Privacy</Link>
                <Link href="/terms" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Terms</Link>
                <Link href="/contact" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }} className="hover:underline">Contact</Link>
              </div>

            </div>
          </div>
          
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
              &copy; {new Date().getFullYear()} CVEngine. All rights reserved.
            </span>
          </div>
        </footer>

      </main>
    </div>
  );
}