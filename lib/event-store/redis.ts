import { Redis } from "@upstash/redis";

declare global {
  // eslint-disable-next-line no-var
  var __cvengineRedis: Redis | null | undefined;
}

function fromVercelKvEnv(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function fromUpstashEnv(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/**
 * Returns a Redis client, or null if no env vars are configured.
 * Never throws — callers should guard with isRedisConfigured().
 */
export function getRedis(): Redis | null {
  // Cache the result (including null) to avoid repeated env lookups
  if (globalThis.__cvengineRedis !== undefined) return globalThis.__cvengineRedis;
  const redis = fromVercelKvEnv() ?? fromUpstashEnv() ?? null;
  globalThis.__cvengineRedis = redis;
  return redis;
}

/** True when Redis env vars are present and a client was created. */
export function isRedisConfigured(): boolean {
  return getRedis() !== null;
}

