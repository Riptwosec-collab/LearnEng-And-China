import { NextResponse } from "next/server";
import { getDailyReviewQueue, vocabularyStats } from "@/lib/data/phase4-vocabulary";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? 16);
  return NextResponse.json({ queue: getDailyReviewQueue(limit), stats: vocabularyStats });
}
