"use client";

import { useEffect } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <SiteHeader />
      <main
        id="main-content"
        className="flex-1 flex flex-col items-center justify-center px-4 text-center"
      >
        <p className="text-6xl font-bold text-[var(--accent)] mb-2 leading-none">Oops</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-3">
          Something went wrong
        </h1>
        <p className="text-[var(--muted)] text-sm max-w-sm mb-8">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-md"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--card-border)] text-[var(--foreground)] font-medium hover:border-[var(--accent)]/50 hover:shadow-sm transition-all"
          >
            Go home
          </Link>
        </div>
      </main>
    </div>
  );
}
