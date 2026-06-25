import { NextResponse } from "next/server";
import { validateVocabularyRow, vocabularyImportColumns } from "@/lib/data/import-schema";

type VocabularyImportRow = Record<string, unknown>;
type ValidationResult = ReturnType<typeof validateVocabularyRow> & { index: number };

function isVocabularyImportRow(row: unknown): row is VocabularyImportRow {
  return row !== null && typeof row === "object" && !Array.isArray(row);
}

function getRowsFromBody(body: unknown): unknown[] {
  if (body === null || typeof body !== "object" || !("rows" in body)) {
    return [];
  }

  const rows = (body as { rows?: unknown }).rows;
  return Array.isArray(rows) ? rows : [];
}

export async function GET() {
  return NextResponse.json({ columns: vocabularyImportColumns });
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const rows: VocabularyImportRow[] = getRowsFromBody(body).filter(isVocabularyImportRow);
  const validation: ValidationResult[] = rows.map((row, index) => ({ index, ...validateVocabularyRow(row) }));

  return NextResponse.json({
    ok: validation.every((item) => item.ok),
    totalRows: rows.length,
    validRows: validation.filter((item) => item.ok).length,
    invalidRows: validation.filter((item) => !item.ok),
    mode: "mock-preview"
  });
}
