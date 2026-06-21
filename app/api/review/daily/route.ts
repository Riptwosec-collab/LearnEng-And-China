import { NextResponse } from "next/server";
import { vocabularySamples } from "@/lib/data/vocabulary";

export async function GET() {
  const data = vocabularySamples
    .filter((_, index) => index % 4 === 0)
    .slice(0, 30)
    .map((word, index) => ({ ...word, priority: 100 - index, reason: index % 2 === 0 ? "new_word" : "spaced_repetition" }));

  return NextResponse.json({ data, count: data.length });
}
