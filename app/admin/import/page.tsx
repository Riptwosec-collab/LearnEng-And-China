import { UploadCloud } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminImportPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Import" title="นำเข้า Vocabulary CSV/JSON" description="Phase 8 จะ parse CSV, validate schema, preview errors และ import เข้า Supabase PostgreSQL" />
      <Card className="grid place-items-center border-dashed p-12 text-center">
        <UploadCloud className="size-12 text-cyan-300" />
        <h2 className="mt-4 text-2xl font-black">Drop CSV/JSON here</h2>
        <p className="mt-2 text-muted-foreground">รองรับ field ตาม vocabulary schema ที่กำหนด</p>
        <Button className="mt-5">เลือกไฟล์</Button>
      </Card>
    </AppShell>
  );
}
