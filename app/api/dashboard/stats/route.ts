import { NextResponse } from "next/server";
import { phase2DatasetSummary } from "@/lib/data/phase2-dataset";

export async function GET() {
  return NextResponse.json({
    phase: "Phase 2 Database & Mock Data",
    summary: phase2DatasetSummary,
    stats: {
      overallProgress: 12,
      englishProgress: 18,
      chineseProgress: 9,
      vocabularyRemembered: 42,
      wordsToReviewToday: 24,
      speakingScore: 71,
      listeningScore: 68,
      readingScore: 74,
      writingScore: 66,
      currentStreak: 5,
      xp: 1280,
      weakPoints: ["Chinese tones", "Past simple", "Email tone"],
      recommendedLesson: "Ordering coffee naturally"
    }
  });
}
