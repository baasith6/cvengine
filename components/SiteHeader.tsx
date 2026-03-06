"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/lib/theme";

type SiteHeaderProps = {
  /**
   * Shown in header on md+ screens only.
   * On mobile, render download buttons in a separate bar inside the page's <main>.
   */
  rightAction?: React.ReactNode;
};

export default function SiteHeader({ rightAction }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";

  const navLinkClass = (active: boolean) =>
    `text-sm font-medium transition-colors ${
      active
        ? "text-[var(--foreground)] font-semibold"
        : "text-[var(--muted)] hover:text-[var(--foreground)]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--card)]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--foreground)] hover:opacity-90 transition-opacity shrink-0"
        >
          <span className="text-xl font-bold tracking-tight">CVEngine</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 flex-1" aria-label="Main">
          <Link href="/" className={navLinkClass(isHome)}>All tools</Link>
          <Link href="/about" className={navLinkClass(isAbout)}>About</Link>
        </nav>

        {/* Desktop: rightAction + theme toggle */}
        <div className="hidden md:flex items-center gap-2">
          {rightAction}
          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle theme={theme} onToggle={toggle} />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)]/40 transition-colors"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--card-border)] bg-[var(--card)] shadow-lg">
          <nav
            className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-0.5"
            aria-label="Mobile navigation"
          >
            {[
              { href: "/", label: "All tools", active: isHome },
              { href: "/cv", label: "Build CV", active: pathname === "/cv" },
              { href: "/cover-letter", label: "Cover letter", active: pathname === "/cover-letter" },
              { href: "/keyword-checker", label: "Keyword checker", active: pathname === "/keyword-checker" },
              { href: "/snippets", label: "Snippets", active: pathname === "/snippets" },
              { href: "/about", label: "About", active: isAbout },
            ].map(({ href, label, active }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "text-[var(--foreground)] hover:bg-[var(--card-border)]/40"
                }`}
              >
                {label}
              </Link>
            ))}
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
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)]/40 transition-colors"
    >
      {theme === "dark" ? (
        /* Sun icon */
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z"
          />
        </svg>
      ) : (
        /* Moon icon */
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
