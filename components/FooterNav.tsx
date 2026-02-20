import Link from "next/link";

export default function FooterNav() {
  return (
    <nav
      className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm border-t border-[var(--card-border)] pt-4 mt-6"
      aria-label="Footer"
    >
      <Link
        href="/"
        className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline"
      >
        Home
      </Link>
      <Link
        href="/cover-letter"
        className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline"
      >
        Cover letter
      </Link>
      <Link
        href="/keyword-checker"
        className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline"
      >
        Keyword checker
      </Link>
      <Link
        href="/snippets"
        className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline"
      >
        Snippets
      </Link>
      <Link
        href="/privacy"
        className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline"
      >
        Privacy Policy
      </Link>
      <Link
        href="/about"
        className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline"
      >
        About
      </Link>
      <Link
        href="/contact"
        className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline"
      >
        Contact
      </Link>
      <Link
        href="/terms"
        className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline"
      >
        Terms
      </Link>
    </nav>
  );
}
