import { NextResponse } from "next/server";
import { searchVocabulary } from "@/lib/data/phase4-vocabulary";
import type { CefrLevel, TargetLanguage, WordProgressStatus } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const words = searchVocabulary({
    query: searchParams.get("q") ?? undefined,
    language: (searchParams.get("language") as TargetLanguage | "all" | null) ?? "all",
    level: (searchParams.get("level") as CefrLevel | "all" | null) ?? "all",
    category: searchParams.get("category") ?? "all",
    status: (searchParams.get("status") as WordProgressStatus | "all" | null) ?? "all",
    limit: Number(searchParams.get("limit") ?? 60),
  });
  return NextResponse.json({ words, total: words.length });
}
