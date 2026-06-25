import { beforeEach, describe, expect, it, vi } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it("allows requests up to the limit and then blocks", () => {
    const key = `test-key-${Math.random()}`;
    const limit = 3;

    for (let i = 0; i < limit; i++) {
      const result = checkRateLimit(key, limit, 60_000);
      expect(result.allowed).toBe(true);
    }

    const blocked = checkRateLimit(key, limit, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("tracks separate buckets per key", () => {
    const keyA = `key-a-${Math.random()}`;
    const keyB = `key-b-${Math.random()}`;

    checkRateLimit(keyA, 1, 60_000);
    const blockedA = checkRateLimit(keyA, 1, 60_000);
    const allowedB = checkRateLimit(keyB, 1, 60_000);

    expect(blockedA.allowed).toBe(false);
    expect(allowedB.allowed).toBe(true);
  });

  it("resets the bucket once the window has elapsed", async () => {
    const key = `key-reset-${Math.random()}`;
    const windowMs = 50;

    checkRateLimit(key, 1, windowMs);
    expect(checkRateLimit(key, 1, windowMs).allowed).toBe(false);

    await new Promise((resolve) => setTimeout(resolve, windowMs + 10));

    expect(checkRateLimit(key, 1, windowMs).allowed).toBe(true);
  });
});
