"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Script from "next/script";

const CONSENT_KEY = "cvengine_cookie_consent";

type ConsentContextType = {
  hasConsent: boolean | null;
  setConsent: (value: boolean) => void;
};

const ConsentContext = createContext<ConsentContextType>({
  hasConsent: null,
  setConsent: () => {},
});

export function useConsent() {
  return useContext(ConsentContext);
}

export function CookieConsentProvider({
  children,
  gaId,
}: {
  children: React.ReactNode;
  gaId: string | undefined;
}) {
  const [hasConsent, setHasConsentState] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === "true") {
        setHasConsentState(true);
      } else if (stored === "false") {
        setHasConsentState(false);
      } else {
        setHasConsentState(null);
      }
    } catch {
      setHasConsentState(null);
    }
  }, []);

  const setConsent = useCallback((value: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, String(value));
    } catch {
      // ignore
    }
    setHasConsentState(value);
  }, []);

  return (
    <ConsentContext.Provider value={{ hasConsent, setConsent }}>
      {children}
      <CookieBanner />
      <ConsentScripts gaId={gaId} />
    </ConsentContext.Provider>
  );
}

function CookieBanner() {
  const { hasConsent, setConsent } = useConsent();

  if (hasConsent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--card-border)] bg-[var(--card)] p-4 shadow-lg"
    >
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-[var(--foreground)]">
          We use cookies for analytics and ads to improve the site. You can
          accept or reject non-essential cookies.{" "}
          <a href="/privacy" className="text-[var(--accent)] underline">
            Privacy
          </a>
        </p>
        <div className="shrink-0 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setConsent(false)}
            className="px-4 py-2 rounded-lg border border-[var(--card-border)] bg-transparent text-[var(--accent-secondary)] font-medium hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => setConsent(true)}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsentScripts({ gaId }: { gaId: string | undefined }) {
  const { hasConsent } = useConsent();

  if (hasConsent !== true) return null;

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
              window.gtag = gtag;
            `}
          </Script>
        </>
      ) : null}
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1494349597900345"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
