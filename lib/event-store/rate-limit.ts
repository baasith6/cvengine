import { getRedis } from "./redis";

function bucketKey(params: { ip: string; minuteBucket: string }) {
  return `telemetry:v1:rl:${params.minuteBucket}:${params.ip}`;
}

function minuteBucket(date: Date): string {
  // yyyy-mm-ddThh:mm
  return date.toISOString().slice(0, 16);
}

export async function checkRateLimit(params: {
  ip: string;
  limitPerMinute: number;
}): Promise<{ allowed: boolean; remaining: number }> {
  const redis = getRedis();
  // If Redis is not configured (e.g. local dev), allow all requests
  if (!redis) return { allowed: true, remaining: params.limitPerMinute };

  const now = new Date();
  const bucket = minuteBucket(now);
  const key = bucketKey({ ip: params.ip, minuteBucket: bucket });
  const count = await redis.incr(key);
  // expire slightly after the minute window
  await redis.expire(key, 75);

  const limit = Math.max(1, Math.floor(params.limitPerMinute));
  const remaining = Math.max(0, limit - count);
  return { allowed: count <= limit, remaining };
}


