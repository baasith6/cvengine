import Link from "next/link";

export default function FooterNav() {
  return (
    <nav
      className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 pt-6 mt-6 border-t border-[var(--card-border)]"
      aria-label="Footer"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span className="text-[var(--muted)] font-medium">Tools</span>
        <Link href="/cv" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline">
          CV builder
        </Link>
        <Link href="/cover-letter" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline">
          Cover letter
        </Link>
        <Link href="/keyword-checker" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline">
          Keyword checker
        </Link>
        <Link href="/snippets" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline">
          Snippets
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span className="text-[var(--muted)] font-medium">Convert</span>
        <Link href="/markdown-to-pdf" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline">
          Markdown to PDF
        </Link>
        <Link href="/markdown-to-word" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline">
          Markdown to Word
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span className="text-[var(--muted)] font-medium">Help</span>
        <Link href="/resources" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline">
          Resources
        </Link>
        <Link href="/how-it-works" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline">
          How it works
        </Link>
        <Link href="/about" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline">
          About
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span className="text-[var(--muted)] font-medium">Legal</span>
        <Link href="/privacy" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline">
          Privacy
        </Link>
        <Link href="/contact" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline">
          Contact
        </Link>
        <Link href="/terms" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline">
          Terms
        </Link>
      </div>
    </nav>
  );
}
