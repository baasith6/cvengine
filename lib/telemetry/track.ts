import type {
  TelemetryDeviceClass,
  TelemetryEventName,
} from "@/lib/event-store/types";

function getDeviceClass(): TelemetryDeviceClass {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (!Number.isFinite(w)) return "unknown";
  return w < 768 ? "mobile" : "desktop";
}

export function trackEvent(params: {
  name: TelemetryEventName;
  path: string;
  enabled: boolean;
}) {
  if (!params.enabled) return;
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    name: params.name,
    path: params.path,
    device: getDeviceClass(),
    ts: new Date().toISOString(),
  });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/telemetry", blob);
      return;
    }
  } catch {
    // fall through to fetch
  }

  void fetch("/api/telemetry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

