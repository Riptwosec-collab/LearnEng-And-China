import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";

const topics = ["Present Simple → daily routine", "Modal verbs → ขออนุญาต/แนะนำ", "了 → เหตุการณ์เกิดขึ้นแล้ว", "Measure words → ลักษณนามจีน"];

export default function GrammarPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Grammar in Real Life" title="Grammar ที่ผูกกับสถานการณ์จริง" description="ไม่ท่องทฤษฎีอย่างเดียว แต่เชื่อมกับ speaking, writing, dialogue และ mini quiz" />
      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((topic) => <Card key={topic} className="p-5 text-lg font-bold">{topic}</Card>)}
      </div>
    </AppShell>
  );
}
