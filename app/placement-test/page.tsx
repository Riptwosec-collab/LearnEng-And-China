import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PlacementTestPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Placement Test" title="ทดสอบระดับก่อนเริ่ม" description="ทดสอบคำศัพท์ grammar reading listening และ speaking แบบสั้น เพื่อแนะนำระดับ A1-C1 / HSK" />
      <Card className="p-6"><p className="mb-4 text-muted-foreground">Demo question: Choose the correct sentence.</p><Button>เริ่มทำแบบทดสอบ</Button></Card>
    </AppShell>
  );
}
