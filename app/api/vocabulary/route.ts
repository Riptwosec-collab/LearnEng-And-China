import { NextResponse } from "next/server";
import { vocabularySamples } from "@/lib/data/vocabulary";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language");
  const level = searchParams.get("level");
  const category = searchParams.get("category");
  const query = searchParams.get("q")?.toLowerCase();
  const limit = Math.min(Number(searchParams.get("limit") ?? 100), 500);

  const results = vocabularySamples
    .filter((item) => (language ? item.language === language : true))
    .filter((item) => (level ? item.cefrLevel === level : true))
    .filter((item) => (category ? item.category === category || item.categoryId === category : true))
    .filter((item) => {
      if (!query) return true;
      return [item.word, item.chineseHanzi, item.pinyin, item.thaiMeaning, item.thaiPronunciation, item.exampleSentence]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query));
    })
    .slice(0, limit);

  return NextResponse.json({ data: results, count: results.length, totalMockCount: vocabularySamples.length });
}
