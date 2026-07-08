"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@/components/CookieConsentContext";
import { trackEvent } from "@/lib/telemetry/track";

export default function Telemetry() {
  const pathname = usePathname();
  const { hasConsent } = useConsent();
  const enabled = hasConsent === true;

  const lastPathRef = useRef<string | null>(null);
  const path = useMemo(() => pathname || "/", [pathname]);

  useEffect(() => {
    if (!enabled) return;
    if (!path) return;
    if (lastPathRef.current === path) return;
    lastPathRef.current = path;
    trackEvent({ name: "page:view", path, enabled: true });
  }, [enabled, path]);

  return null;
}

