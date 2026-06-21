import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WritingPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Writing Lab" title="ฝึกเขียนแล้วให้ AI ตรวจ" description="รองรับ diary, email, chat message, caption, resume, cover letter และ paragraph พร้อม before/after correction" />
      <Card className="p-6">
        <h2 className="text-2xl font-black">Prompt: Write a short email to reschedule a meeting.</h2>
        <textarea className="mt-5 min-h-48 w-full rounded-3xl border border-input bg-background/50 p-4 outline-none focus:ring-2 focus:ring-ring" placeholder="พิมพ์คำตอบของคุณที่นี่..." />
        <div className="mt-4 flex flex-wrap gap-3">
          <Button>ส่งให้ AI ตรวจ</Button>
          <Button variant="secondary">ดูตัวอย่าง</Button>
        </div>
      </Card>
    </AppShell>
  );
}
