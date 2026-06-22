import { NextResponse } from "next/server";
import { getVocabularyById } from "@/lib/data/phase4-vocabulary";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const word = getVocabularyById(id);
  if (!word) return NextResponse.json({ error: "Word not found" }, { status: 404 });
  return NextResponse.json({ word });
}
