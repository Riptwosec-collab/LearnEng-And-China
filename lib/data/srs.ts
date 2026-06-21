import type { WordProgressStatus } from "@/types";

export type ReviewQuality = "again" | "hard" | "good" | "easy";

const qualityScore: Record<ReviewQuality, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5
};

export function calculateNextReview(input: {
  quality: ReviewQuality;
  previousIntervalDays?: number;
  previousEaseFactor?: number;
  reviewCount?: number;
  now?: Date;
}) {
  const now = input.now ?? new Date();
  const score = qualityScore[input.quality];
  const previousEase = input.previousEaseFactor ?? 2.5;
  const reviewCount = input.reviewCount ?? 0;
  let easeFactor = Math.max(1.3, previousEase + (0.1 - (5 - score) * (0.08 + (5 - score) * 0.02)));
  let intervalDays = input.previousIntervalDays ?? 0;

  if (input.quality === "again") {
    intervalDays = 0;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else if (reviewCount <= 0) {
    intervalDays = input.quality === "easy" ? 3 : 1;
  } else if (reviewCount === 1) {
    intervalDays = input.quality === "hard" ? 2 : 6;
  } else {
    const multiplier = input.quality === "hard" ? 1.2 : input.quality === "easy" ? easeFactor + 0.3 : easeFactor;
    intervalDays = Math.max(1, Math.round(intervalDays * multiplier));
  }

  const nextReviewAt = new Date(now);
  nextReviewAt.setDate(now.getDate() + intervalDays);
  const status: WordProgressStatus = input.quality === "again" ? "review" : reviewCount > 4 && input.quality === "easy" ? "mastered" : "learning";

  return { quality: input.quality, nextReviewAt, intervalDays, easeFactor, status };
}
