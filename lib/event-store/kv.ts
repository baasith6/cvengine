import { getRedis } from "./redis";
import type { TelemetryDeviceClass, TelemetryEventName } from "./types";

function yyyyMmDd(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function normalizePath(path: string): string {
  if (!path.startsWith("/")) return `/${path}`;
  return path;
}

type MetricKeyParts = {
  date: string;
  name: TelemetryEventName;
  path: string;
  device: TelemetryDeviceClass;
};

function metricKey({ date, name, path, device }: MetricKeyParts): string {
  return `telemetry:v1:count:${date}:${name}:${device}:${normalizePath(path)}`;
}

export async function incEventCount(params: {
  at?: Date;
  name: TelemetryEventName;
  path: string;
  device?: TelemetryDeviceClass;
  by?: number;
}) {
  const redis = getRedis();
  if (!redis) return; // no-op when Redis is unconfigured
  const at = params.at ?? new Date();
  const date = yyyyMmDd(at);
  const device = params.device ?? "unknown";
  const by = typeof params.by === "number" && Number.isFinite(params.by) ? params.by : 1;
  await redis.incrby(
    metricKey({ date, name: params.name, path: params.path, device }),
    Math.max(1, Math.floor(by))
  );
}

export async function getEventCount(params: {
  date: string;
  name: TelemetryEventName;
  path: string;
  device?: TelemetryDeviceClass;
}): Promise<number> {
  const redis = getRedis();
  if (!redis) return 0;
  const device = params.device ?? "unknown";
  const v = await redis.get<number>(
    metricKey({ date: params.date, name: params.name, path: params.path, device })
  );
  return typeof v === "number" ? v : 0;
}

export async function getEventCountsForDate(params: {
  date: string;
  names: TelemetryEventName[];
}): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  for (const name of params.names) {
    // Wildcard aggregation isn't supported by KV natively; v1 only reports per-path
    // metrics via a secondary index we build in ingest. Keep this stub for later.
    out[name] = 0;
  }
  return out;
}

export async function rememberPathSeen(params: { at?: Date; path: string }) {
  const redis = getRedis();
  if (!redis) return; // no-op when Redis is unconfigured
  const at = params.at ?? new Date();
  const date = yyyyMmDd(at);
  const path = normalizePath(params.path);
  await redis.sadd(`telemetry:v1:paths:${date}`, path);
  // keep a rolling 30d window
  await redis.expire(`telemetry:v1:paths:${date}`, 60 * 60 * 24 * 35);
}

export async function listPathsSeen(params: { date: string }): Promise<string[]> {
  const redis = getRedis();
  if (!redis) return [];
  const paths = await redis.smembers<string[]>(
    `telemetry:v1:paths:${params.date}`
  );
  return Array.isArray(paths) ? paths.filter((p) => typeof p === "string") : [];
}


