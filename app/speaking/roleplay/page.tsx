import { Bot, Mic } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const scenarios = ["สั่งอาหาร", "ซื้อของในร้านสะดวกซื้อ", "ขึ้นแท็กซี่", "ถามทาง", "Check-in โรงแรม", "สนามบิน", "โรงพยาบาล", "สมัครงาน", "ประชุม", "ขอความช่วยเหลือฉุกเฉิน"];

export default function RoleplayPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="AI Roleplay" title="เลือกสถานการณ์จริงแล้วฝึกพูด" description="แต่ละ scenario จะมี conversation card, record button, feedback และ save progress" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {scenarios.map((scenario) => (
          <Card key={scenario} className="p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300"><Bot className="size-5" /></span>
              <h2 className="text-xl font-black">{scenario}</h2>
            </div>
            <Button className="mt-5 w-full"><Mic className="size-4" /> เริ่ม Roleplay</Button>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
