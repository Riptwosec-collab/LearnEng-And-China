import { expandedVocabulary1000 } from "@/lib/data/phase18-vocabulary-expansion";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const language = url.searchParams.get("language");
  const take = Math.min(Number(url.searchParams.get("take") ?? 50), 200);
  const rows = expandedVocabulary1000.filter((row) => !language || row.language === language).slice(0, take);
  return Response.json({ totalGenerated: expandedVocabulary1000.length, returned: rows.length, rows });
}
