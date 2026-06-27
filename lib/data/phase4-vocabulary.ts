import { categorySeeds } from "./phase2-dataset";
import { vocabularySamples as vocabularySeeds } from "./vocabulary";
import type { CefrLevel, TargetLanguage, VocabularyItem, WordProgressStatus } from "@/types";

export type VocabularySearchInput = {
  query?: string;
  language?: TargetLanguage | "all";
  level?: CefrLevel | "all";
  category?: string | "all";
  status?: WordProgressStatus | "all";
  limit?: number;
};

const statusCycle: WordProgressStatus[] = ["new", "learning", "remembered", "review", "difficult", "mastered"];
const dayMs = 24 * 60 * 60 * 1000;
const baseDate = new Date("2026-06-22T00:00:00.000Z");

export const learnerWordProgress = vocabularySeeds.map((word, index) => {
  const status = statusCycle[index % statusCycle.length];
  const dueOffset = status === "review" || status === "difficult" ? -1 : index % 5;
  return {
    wordId: word.id,
    status,
    easeFactor: Number((2.1 + (index % 6) * 0.08).toFixed(2)),
    intervalDays: [0, 1, 3, 7, 14, 30][index % 6],
    repetitions: index % 8,
    lapses: status === "difficult" ? 2 : index % 3 === 0 ? 1 : 0,
    favorite: index % 9 === 0,
    lastReviewedAt: new Date(baseDate.getTime() - (index % 12) * dayMs).toISOString(),
    nextReviewAt: new Date(baseDate.getTime() + dueOffset * dayMs).toISOString(),
    accuracy: Math.min(98, 52 + (index % 45)),
  };
});

export const vocabularyStats = {
  totalWords: vocabularySeeds.length,
  englishWords: vocabularySeeds.filter((word) => word.language === "english").length,
  chineseWords: vocabularySeeds.filter((word) => word.language === "chinese").length,
  dueToday: learnerWordProgress.filter((item) => new Date(item.nextReviewAt) <= baseDate).length,
  favorites: learnerWordProgress.filter((item) => item.favorite).length,
  mastered: learnerWordProgress.filter((item) => item.status === "mastered").length,
};

export const vocabularyFilters = {
  languages: ["all", "english", "chinese"] as const,
  levels: ["all", "A1", "A2", "B1", "B2", "C1"] as const,
  statuses: ["all", ...statusCycle] as const,
  categories: ["all", ...categorySeeds.map((item) => item.id)],
};

export function withProgress(word: VocabularyItem) {
  const progress = learnerWordProgress.find((item) => item.wordId === word.id);
  return { ...word, progressStatus: progress?.status ?? "new", progress };
}

export function searchVocabulary(input: VocabularySearchInput = {}) {
  const query = input.query?.trim().toLowerCase() ?? "";
  const limit = input.limit ?? 60;

  return vocabularySeeds
    .map(withProgress)
    .filter((word) => input.language && input.language !== "all" ? word.language === input.language : true)
    .filter((word) => input.level && input.level !== "all" ? word.cefrLevel === input.level : true)
    .filter((word) => input.category && input.category !== "all" ? word.category === input.category || word.categoryId === input.category : true)
    .filter((word) => input.status && input.status !== "all" ? word.progressStatus === input.status : true)
    .filter((word) => {
      if (!query) return true;
      return [word.word, word.chineseHanzi, word.pinyin, word.ipa, word.thaiMeaning, word.thaiPronunciation, word.exampleSentence]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    })
    .slice(0, limit);
}

export function getVocabularyById(id: string) {
  const word = vocabularySeeds.find((item) => item.id === id);
  return word ? withProgress(word) : null;
}

export function getDailyReviewQueue(limit = 16) {
  return learnerWordProgress
    .filter((item) => new Date(item.nextReviewAt) <= baseDate || item.status === "difficult" || item.status === "review")
    .sort((a, b) => new Date(a.nextReviewAt).getTime() - new Date(b.nextReviewAt).getTime())
    .slice(0, limit)
    .map((progress) => {
      const word = vocabularySeeds.find((item) => item.id === progress.wordId)!;
      return { ...word, progressStatus: progress.status, progress };
    });
}

export function previewNextReview(status: WordProgressStatus, quality: "again" | "hard" | "good" | "easy") {
  const intervalMap = { again: 0, hard: 1, good: status === "new" ? 1 : 3, easy: status === "new" ? 4 : 7 };
  const nextReviewAt = new Date(baseDate.getTime() + intervalMap[quality] * dayMs).toISOString();
  const nextStatus: WordProgressStatus = quality === "again" ? "difficult" : quality === "easy" ? "mastered" : "review";
  return { nextStatus, nextReviewAt, intervalDays: intervalMap[quality] };
}

export const flashcardDecks = [
  { id: "due-today", title: "Due Today", description: "คำที่ถึงเวลาทบทวนวันนี้", count: vocabularyStats.dueToday, mode: "srs" },
  { id: "difficult", title: "Difficult Words", description: "คำที่ลืมบ่อยหรือออกเสียงผิดบ่อย", count: learnerWordProgress.filter((item) => item.status === "difficult").length, mode: "focused" },
  { id: "favorites", title: "Favorites", description: "คำที่บันทึกไว้ใช้จริง", count: vocabularyStats.favorites, mode: "saved" },
  { id: "chinese-tones", title: "Chinese Tone Drill", description: "ฝึก pinyin และ tone จากคำจีน", count: vocabularyStats.chineseWords, mode: "tone" },
];
