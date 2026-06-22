import { prisma } from "@/lib/db/prisma";
import { vocabularySamples } from "@/lib/data/vocabulary";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const language = url.searchParams.get("language") ?? undefined;
  const level = url.searchParams.get("level") ?? undefined;
  const take = Number(url.searchParams.get("take") ?? 50);

  try {
    const words = await prisma.vocabulary.findMany({
      where: {
        ...(language ? { language: language as "english" | "chinese" } : {}),
        ...(level ? { cefrLevel: level as "A1" | "A2" | "B1" | "B2" | "C1" } : {})
      },
      include: { category: true },
      orderBy: [{ frequencyScore: "desc" }, { word: "asc" }],
      take: Math.min(take, 200)
    });
    return Response.json({ source: "database", count: words.length, words });
  } catch {
    return Response.json({ source: "mock", count: vocabularySamples.length, words: vocabularySamples.slice(0, take) });
  }
}
