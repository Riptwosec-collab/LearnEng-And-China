import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Shared rate limiter for production and in-memory fallback for local dev/test.
 *
 * Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to share limits across
 * serverless instances. Without those values, requests are limited per process.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();
const upstashLimiters = new Map<string, Ratelimit>();

const SWEEP_INTERVAL_MS = 5 * 60 * 1000;
let lastSweep = Date.now();

function sweepExpiredBuckets(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

function getUpstashRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  return Redis.fromEnv();
}

function getUpstashLimiter(limit: number, windowMs: number) {
  const redis = getUpstashRedis();
  if (!redis) return null;

  const cacheKey = `${limit}:${windowMs}`;
  const existing = upstashLimiters.get(cacheKey);
  if (existing) return existing;

  const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000));
  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
    analytics: true,
    prefix: "linguaquest:ratelimit"
  });

  upstashLimiters.set(cacheKey, limiter);
  return limiter;
}

export async function checkRateLimit(
  key: string,
  limit = 10,
  windowMs = 60_000
): Promise<RateLimitResult> {
  const upstashLimiter = getUpstashLimiter(limit, windowMs);
  if (upstashLimiter) {
    const result = await upstashLimiter.limit(key);
    return {
      allowed: result.success,
      limit,
      remaining: result.remaining,
      resetAt: result.reset
    };
  }

  const now = Date.now();
  sweepExpiredBuckets(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, limit, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (existing.count >= limit) {
    return { allowed: false, limit, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, limit, remaining: limit - existing.count, resetAt: existing.resetAt };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function rateLimitResponse(result: RateLimitResult) {
  const retryAfterSeconds = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));
  return Response.json(
    {
      error: "rate_limited",
      message: "ส่งคำขอบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่ (Too many requests, please slow down.)",
      retryAfterSeconds
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": String(result.remaining)
      }
    }
  );
}
