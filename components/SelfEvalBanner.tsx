"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { bannersForPath } from "@/lib/self-eval/recommendations";

export default function SelfEvalBanner() {
  const pathname = usePathname() || "/";
  const banners = useMemo(() => bannersForPath(pathname), [pathname]);

  if (!banners.length) return null;

  return (
    <div className="space-y-2">
      {banners.map((b) => (
        <div
          key={b.id}
          role={b.severity === "warning" ? "alert" : "status"}
          className={`rounded-xl border p-3 text-sm ${
            b.severity === "warning"
              ? "border-[var(--accent-secondary)]/30 bg-[var(--accent-secondary)]/10 text-[var(--foreground)]"
              : "border-[var(--accent)]/25 bg-[var(--accent)]/10 text-[var(--foreground)]"
          }`}
        >
          <div className="font-semibold mb-0.5">{b.title}</div>
          <div className="opacity-90">{b.body}</div>
        </div>
      ))}
    </div>
  );
}

