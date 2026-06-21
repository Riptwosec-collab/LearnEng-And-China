import { NextResponse } from "next/server";
import { validateVocabularyRow, vocabularyImportColumns } from "@/lib/data/import-schema";

export async function GET() {
  return NextResponse.json({ columns: vocabularyImportColumns });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const rows = Array.isArray(body?.rows) ? body.rows : [];
  const validation = rows.map((row: Record<string, unknown>, index: number) => ({ index, ...validateVocabularyRow(row) }));

  return NextResponse.json({
    ok: validation.every((item) => item.ok),
    totalRows: rows.length,
    validRows: validation.filter((item) => item.ok).length,
    invalidRows: validation.filter((item) => !item.ok),
    mode: "mock-preview"
  });
}
