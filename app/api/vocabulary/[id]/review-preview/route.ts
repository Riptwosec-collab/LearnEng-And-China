import { NextResponse } from "next/server";
import { getVocabularyById, previewNextReview } from "@/lib/data/phase4-vocabulary";
import type { WordProgressStatus } from "@/types";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const word = getVocabularyById(id);
  if (!word) return NextResponse.json({ error: "Word not found" }, { status: 404 });

  const { searchParams } = new URL(request.url);
  const quality = (searchParams.get("quality") ?? "good") as "again" | "hard" | "good" | "easy";
  const currentStatus = (word.progressStatus ?? "new") as WordProgressStatus;
  return NextResponse.json({ wordId: id, quality, preview: previewNextReview(currentStatus, quality), mode: "mock" });
}
