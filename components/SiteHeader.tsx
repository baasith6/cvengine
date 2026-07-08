"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/lib/theme";

type SiteHeaderProps = {
  rightAction?: React.ReactNode;
};

const NAV_LINKS = [
  { href: "/",              label: "Tools",     match: (p: string) => p === "/" },
  { href: "/resources",    label: "Resources", match: (p: string) => p === "/resources" || p.startsWith("/resources/") },
  { href: "/about",        label: "About",     match: (p: string) => p === "/about" },
];

const MOBILE_LINKS = [
  { href: "/",              label: "All tools" },
  { href: "/cv",           label: "Build CV" },
  { href: "/cover-letter", label: "Cover letter" },
  { href: "/keyword-checker", label: "Keyword checker" },
  { href: "/snippets",     label: "Snippets" },
  { href: "/resources",    label: "Resources" },
  { href: "/about",        label: "About" },
];

export default function SiteHeader({ rightAction }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          height: 48,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          CVEngine
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main"
          style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map(({ href, label, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: 13,
                  fontWeight: active ? 500 : 400,
                  color: active ? "var(--text)" : "var(--text-muted)",
                  textDecoration: "none",
                  padding: "4px 8px",
                  borderRadius: 6,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 8 }}>
            {rightAction}
          </div>
          <ThemeToggle theme={theme} onToggle={toggle} />
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex md:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              borderRadius: 6,
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {menuOpen ? (
              <svg width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden anim-slide-down"
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <nav
            aria-label="Mobile navigation"
            style={{ padding: "8px 16px 12px" }}
          >
            {MOBILE_LINKS.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "8px 12px",
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: active ? 500 : 400,
                    color: active ? "var(--accent)" : "var(--text)",
                    textDecoration: "none",
                    background: active ? "var(--accent-bg)" : "transparent",
                    marginBottom: 2,
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: "none",
        border: "1px solid var(--border)",
        cursor: "pointer",
        padding: "5px 6px",
        borderRadius: 6,
        color: "var(--text-muted)",
        display: "flex",
        alignItems: "center",
        transition: "border-color 0.15s, color 0.15s",
      }}
    >
      {theme === "dark" ? (
        <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z"
          />
        </svg>
      ) : (
        <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}