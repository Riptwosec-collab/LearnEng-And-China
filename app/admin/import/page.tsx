import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { importPreviewRows } from "@/lib/data/phase8-admin";

export default function AdminImportPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Import Center" title="CSV and JSON Preview" description="Review sample rows before running a real import." />
      <Card className="p-6">
        <h2 className="text-2xl font-black">Import preview</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page is ready for a file picker and validation table.</p>
      </Card>
      <div className="mt-6 grid gap-3">
        {importPreviewRows.map((row) => (
          <Card key={row.row} className="grid gap-2 p-4 md:grid-cols-6">
            <span>Row {row.row}</span>
            <span>{row.language}</span>
            <span className="font-bold">{row.word}</span>
            <span>{row.thai_meaning}</span>
            <span>{row.cefr_level}</span>
            <span className="rounded-full border px-3 py-1 text-xs">{row.status}</span>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
