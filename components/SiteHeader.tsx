"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SiteHeaderProps = {
  /** Optional: show a primary CTA (e.g. Download PDF) on the right */
  rightAction?: React.ReactNode;
};

export default function SiteHeader({ rightAction }: SiteHeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--card)]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--foreground)] hover:opacity-90 transition-opacity"
        >
          <span className="text-xl font-bold tracking-tight">CVEngine</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm" aria-label="Main">
          <Link
            href="/"
            className={`font-medium transition-colors ${
              isHome
                ? "text-[var(--foreground)] font-semibold"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            All tools
          </Link>
          <Link
            href="/about"
            className={`font-medium transition-colors ${
              isAbout
                ? "text-[var(--foreground)] font-semibold"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            About
          </Link>
          {rightAction}
        </nav>
      </div>
    </header>
  );
}
