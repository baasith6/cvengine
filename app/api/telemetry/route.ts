import { NextResponse } from "next/server";
import { incEventCount, rememberPathSeen } from "@/lib/event-store/kv";
import { checkRateLimit } from "@/lib/event-store/rate-limit";
import type {
  TelemetryDeviceClass,
  TelemetryEvent,
  TelemetryEventName,
} from "@/lib/event-store/types";

const MAX_PATH_LENGTH = 200;
const MAX_EVENT_JSON_BYTES = 8_000;
const LIMIT_PER_MINUTE_PER_IP = 60;

function isTelemetryEventName(v: unknown): v is TelemetryEventName {
  return (
    v === "page:view" ||
    v === "cta:click" ||
    v === "export:pdf:request" ||
    v === "export:pdf:success" ||
    v === "export:pdf:error" ||
    v === "export:docx:request" ||
    v === "export:docx:success" ||
    v === "export:docx:error" ||
    v === "ui:error" ||
    v === "ui:rage_click"
  );
}

function isDeviceClass(v: unknown): v is TelemetryDeviceClass {
  return v === "mobile" || v === "desktop" || v === "unknown";
}

function sanitizePath(path: string): string {
  let p = path.trim();
  if (!p) return "/";
  // strip query + hash to keep key cardinality low
  p = p.split("?")[0]?.split("#")[0] ?? p;
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > MAX_PATH_LENGTH) p = p.slice(0, MAX_PATH_LENGTH);
  return p;
}

function getClientIp(request: Request): string {
  // Vercel / proxies commonly set x-forwarded-for
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const { allowed } = await checkRateLimit({
      ip,
      limitPerMinute: LIMIT_PER_MINUTE_PER_IP,
    });
    if (!allowed) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }

    const raw = await request.text();
    if (raw.length > MAX_EVENT_JSON_BYTES) {
      return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }

    const body = raw ? (JSON.parse(raw) as unknown) : null;
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
    }

    const e = body as Partial<TelemetryEvent>;
    if (!isTelemetryEventName(e.name)) {
      return NextResponse.json({ ok: false, error: "invalid_event_name" }, { status: 400 });
    }
    if (typeof e.path !== "string") {
      return NextResponse.json({ ok: false, error: "invalid_path" }, { status: 400 });
    }

    const path = sanitizePath(e.path);
    const device = isDeviceClass(e.device) ? e.device : "unknown";

    // Aggregate only. Never store raw props in v1.
    await rememberPathSeen({ path });
    await incEventCount({ name: e.name, path, device });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Telemetry ingest error:", err);
    return NextResponse.json({ ok: false, error: "ingest_failed" }, { status: 500 });
  }
}

