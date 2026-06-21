import { Bot, Send } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AiTutorPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="AI Tutor" title="ครูส่วนตัวสำหรับอังกฤษและจีน" description="Phase 7 จะต่อ OpenAI API พร้อม prompt templates, JSON output และบันทึกจุดอ่อนของผู้ใช้" />
      <Card className="mx-auto max-w-4xl p-5">
        <div className="rounded-3xl bg-secondary/40 p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300"><Bot className="size-5" /></span>
            <div>
              <p className="font-bold">AI Tutor</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">ถามคำศัพท์ grammar หรือให้ช่วย roleplay ได้เลย เช่น “ช่วยสอนประโยคสั่งกาแฟแบบสุภาพ”</p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex gap-3">
          <Input placeholder="ถาม AI Tutor..." />
          <Button size="icon"><Send className="size-4" /></Button>
        </div>
      </Card>
    </AppShell>
  );
}
