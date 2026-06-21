import { NextResponse } from "next/server";
import { vocabularySamples } from "@/lib/data/vocabulary";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language");
  const level = searchParams.get("level");
  const query = searchParams.get("q")?.toLowerCase();

  const results = vocabularySamples.filter((item) => {
    const matchesLanguage = language ? item.language === language : true;
    const matchesLevel = level ? item.cefrLevel === level : true;
    const matchesQuery = query
      ? [item.word, item.chineseHanzi, item.pinyin, item.thaiMeaning, item.thaiPronunciation]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(query))
      : true;
    return matchesLanguage && matchesLevel && matchesQuery;
  });

  return NextResponse.json({ data: results, count: results.length });
}
