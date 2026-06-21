import { Mic, RefreshCcw, Save, Waves } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function SpeakingPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Speaking Lab" title="ฝึกพูดกับ AI Roleplay" description="Phase 1 ทำ UI สำหรับอัดเสียง, waveform, transcript และ scoring mock เพื่อรอต่อ Web Speech API / STT ใน Phase 5" />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <Card className="p-6">
          <Badge>Restaurant scenario</Badge>
          <h2 className="mt-4 text-2xl font-black">AI: What would you like to order?</h2>
          <p className="mt-2 text-muted-foreground">เป้าหมาย: ตอบเป็นประโยคธรรมชาติ เช่น “I’d like an iced latte, please.”</p>
          <div className="my-8 flex h-32 items-center justify-center rounded-[2rem] border border-cyan-300/20 bg-cyan-300/5">
            <Waves className="size-20 text-cyan-300" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg"><Mic className="size-5" /> กดอัดเสียง</Button>
            <Button size="lg" variant="secondary"><RefreshCcw className="size-5" /> พูดใหม่</Button>
            <Button size="lg" variant="glass"><Save className="size-5" /> บันทึก Progress</Button>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-black">AI Feedback</h2>
          <div className="mt-5 space-y-4">
            {[["Pronunciation", 78], ["Fluency", 72], ["Confidence", 81]].map(([label, value]) => (
              <div key={label as string}>
                <div className="mb-2 flex justify-between text-sm"><span>{label}</span><span>{value}%</span></div>
                <Progress value={value as number} />
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl bg-secondary/40 p-4 text-sm text-muted-foreground">
            Suggestion: ลองออกเสียง “latte” ให้เสียงท้ายชัดขึ้น และเติม please เพื่อให้สุภาพขึ้น
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
