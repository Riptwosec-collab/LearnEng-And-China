import { NextResponse } from "next/server";
import { validateVocabularyRow, vocabularyImportColumns } from "@/lib/data/import-schema";

type VocabularyImportRow = Record<string, unknown>;
type ValidationResult = ReturnType<typeof validateVocabularyRow> & { index: number };

export async function GET() {
  return NextResponse.json({ columns: vocabularyImportColumns });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const rows: VocabularyImportRow[] = Array.isArray(body?.rows)
    ? body.rows.filter((row): row is VocabularyImportRow => row !== null && typeof row === "object" && !Array.isArray(row))
    : [];
  const validation: ValidationResult[] = rows.map((row, index) => ({ index, ...validateVocabularyRow(row) }));

  return NextResponse.json({
    ok: validation.every((item: ValidationResult) => item.ok),
    totalRows: rows.length,
    validRows: validation.filter((item: ValidationResult) => item.ok).length,
    invalidRows: validation.filter((item: ValidationResult) => !item.ok),
    mode: "mock-preview"
  });
}
