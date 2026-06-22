import { importPreviewRows } from "@/lib/data/phase8-admin";

export async function GET() {
  return Response.json({ rows: importPreviewRows, totalRows: importPreviewRows.length });
}
