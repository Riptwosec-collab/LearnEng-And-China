import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ReadingPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Reading Lab" title="อ่านบทความสั้นตามระดับ" description="ไฮไลต์คำศัพท์ กดดูคำแปล สรุปใจความ และบันทึกคำศัพท์เข้าคลังส่วนตัว" />
      <Card className="p-6">
        <h2 className="text-2xl font-black">A Day at a Cafe</h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          I usually study at a small cafe near my office. The cafe is quiet in the morning, so I can focus on my work. I order an iced latte and review my vocabulary cards.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button>แปลทีละประโยค</Button>
          <Button variant="secondary">ทำ Quiz</Button>
          <Button variant="glass">บันทึกคำศัพท์</Button>
        </div>
      </Card>
    </AppShell>
  );
}
