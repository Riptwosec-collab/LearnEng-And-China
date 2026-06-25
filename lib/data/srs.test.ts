import { describe, expect, it } from "vitest";
import { calculateNextReview } from "@/lib/data/srs";

describe("calculateNextReview", () => {
  it("resets the interval to 0 days when quality is 'again'", () => {
    const result = calculateNextReview({
      quality: "again",
      previousIntervalDays: 12,
      previousEaseFactor: 2.5,
      reviewCount: 3,
      now: new Date("2026-01-01T00:00:00Z")
    });

    expect(result.intervalDays).toBe(0);
    expect(result.status).toBe("review");
    expect(result.nextReviewAt.toISOString().slice(0, 10)).toBe("2026-01-01");
  });

  it("lowers the ease factor when a card is marked 'again'", () => {
    const result = calculateNextReview({
      quality: "again",
      previousEaseFactor: 2.5,
      reviewCount: 2
    });

    expect(result.easeFactor).toBeLessThan(2.5);
    expect(result.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it("never lets the ease factor drop below the 1.3 floor", () => {
    const result = calculateNextReview({
      quality: "again",
      previousEaseFactor: 1.3,
      reviewCount: 10
    });

    expect(result.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it("schedules a first-time 'good' review for 1 day later", () => {
    const now = new Date("2026-01-01T00:00:00Z");
    const result = calculateNextReview({ quality: "good", reviewCount: 0, now });

    expect(result.intervalDays).toBe(1);
    expect(result.nextReviewAt.toISOString().slice(0, 10)).toBe("2026-01-02");
  });

  it("schedules a first-time 'easy' review further out than 'good'", () => {
    const now = new Date("2026-01-01T00:00:00Z");
    const easy = calculateNextReview({ quality: "easy", reviewCount: 0, now });
    const good = calculateNextReview({ quality: "good", reviewCount: 0, now });

    expect(easy.intervalDays).toBeGreaterThan(good.intervalDays);
  });

  it("grows the interval geometrically once a card has been reviewed multiple times", () => {
    const now = new Date("2026-01-01T00:00:00Z");
    const result = calculateNextReview({
      quality: "good",
      previousIntervalDays: 6,
      previousEaseFactor: 2.5,
      reviewCount: 3,
      now
    });

    expect(result.intervalDays).toBeGreaterThan(6);
  });

  it("marks a word as 'mastered' only after enough easy reviews", () => {
    const earlyEasy = calculateNextReview({ quality: "easy", reviewCount: 1 });
    const lateEasy = calculateNextReview({ quality: "easy", reviewCount: 5 });

    expect(earlyEasy.status).not.toBe("mastered");
    expect(lateEasy.status).toBe("mastered");
  });

  it("defaults to 'now' when no date is provided so it never throws", () => {
    expect(() => calculateNextReview({ quality: "good" })).not.toThrow();
  });
});
