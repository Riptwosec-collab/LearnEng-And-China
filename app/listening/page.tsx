import { Headphones, Play, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ListeningPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Listening Lab" title="ฟังประโยค บทสนทนา และ Dictation" description="รองรับ transcript toggle, ปรับความเร็ว 0.75x/1x/1.25x, สำเนียงหลายแบบ และ tone practice ภาษาจีนใน Phase 5" />
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-3xl bg-cyan-300/10 text-cyan-300"><Headphones /></span>
          <div>
            <h2 className="text-2xl font-black">Airport Announcement A2</h2>
            <p className="text-muted-foreground">ฟังแล้วเลือกคำตอบ + เขียน dictation</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button><Play className="size-4" /> Play 1x</Button>
          <Button variant="secondary">0.75x</Button>
          <Button variant="secondary">1.25x</Button>
          <Button variant="glass"><RotateCcw className="size-4" /> Replay sentence</Button>
        </div>
        <div className="mt-6 rounded-3xl bg-secondary/40 p-5 text-sm text-muted-foreground">
          Transcript hidden. กดปุ่มเพื่อเปิด transcript หลังตอบคำถาม
        </div>
      </Card>
    </AppShell>
  );
}
