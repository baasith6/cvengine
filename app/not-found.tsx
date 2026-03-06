import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <SiteHeader />
      <main
        id="main-content"
        className="flex-1 flex flex-col items-center justify-center px-4 text-center"
      >
        <p className="text-8xl font-bold text-[var(--accent)] mb-2 leading-none">404</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-3">
          Page not found
        </h1>
        <p className="text-[var(--muted)] text-sm max-w-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all tools
        </Link>
      </main>
    </div>
  );
}
