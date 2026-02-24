"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/components/CookieConsentContext";

const AD_CLIENT = "ca-pub-1494349597900345";
const AD_SLOT = "3271609988";

export default function AdSenseSlot() {
  const { hasConsent } = useConsent();
  const insRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (hasConsent !== true || !insRef.current || pushedRef.current) return;

    const el = insRef.current;

    const tryPush = () => {
      if (pushedRef.current) return;
      if (!el.parentElement) return;
      const width = el.parentElement.getBoundingClientRect().width;
      if (width > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushedRef.current = true;
        } catch {
          // ignore
        }
      }
    };

    tryPush();
    if (pushedRef.current) return;

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(tryPush);
    });

    const parentEl = el.parentElement;
    if (!parentEl) {
      cancelAnimationFrame(raf);
      return;
    }

    const observer = new ResizeObserver(tryPush);
    observer.observe(parentEl);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [hasConsent]);

  if (hasConsent !== true) return null;

  return (
    <div className="ad-slot-wrapper my-6 flex justify-center w-full min-w-0">
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", minWidth: "100%" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
