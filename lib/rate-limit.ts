/**
 * Minimal in-memory, sliding-window rate limiter.
 *
 * This is intentionally simple: it protects a *single* server instance from
 * obvious abuse/cost overruns on AI + speech endpoints with zero extra
 * infrastructure. It does NOT share state across multiple server instances
 * or serverless invocations.
 *
 * For real multi-instance production deployments (e.g. several Vercel
 * lambdas), replace this with a shared store such as Upstash Redis
 * (`@upstash/ratelimit`) or a database-backed counter so all instances see
 * the same limit. The function signature below is designed so that swap is
 * a one-file change — every call site only depends on `checkRateLimit`.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

// Periodically forget old buckets so this Map can't grow forever.
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

/**
 * Check + consume one request from the caller's quota.
 *
 * @param key        Unique identifier for the caller, e.g. `ai-tutor:<ip>` or
 *                    `speech-tts:<userId>`. Always namespace by route so
 *                    different endpoints don't share a budget.
 * @param limit       Max requests allowed within the window.
 * @param windowMs    Window size in milliseconds (default: 1 minute).
 */
export function checkRateLimit(key: string, limit = 10, windowMs = 60_000): RateLimitResult {
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

/** Best-effort client identifier to key the rate limiter by, when there's no authenticated user id available. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Standard 429 JSON response, with a Retry-After header set from the bucket's reset time. */
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
