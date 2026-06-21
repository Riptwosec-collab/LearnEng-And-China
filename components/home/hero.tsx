import Link from "next/link";
import { ArrowRight, Brain, Languages, Mic2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <FadeIn>
          <Badge variant="outline" className="mb-5">English + Mandarin Chinese · A1-C1 · สำหรับผู้ใช้ไทย</Badge>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            เรียนภาษาให้ใช้ได้จริงด้วย <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">LinguaQuest AI</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            ฝึกฟัง พูด อ่าน เขียน คำศัพท์ Grammar และสนทนากับ AI Tutor ผ่านสถานการณ์ชีวิตจริง เช่น ร้านอาหาร เดินทาง ที่ทำงาน โรงพยาบาล และฉุกเฉิน
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard">เริ่มเรียนเลย <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link href="/placement-test">ทำ Placement Test</Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <Card className="neon-border p-5 lg:p-6">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-950/80 to-indigo-950/60 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today Mission</p>
                  <h2 className="text-2xl font-black">Restaurant Roleplay</h2>
                </div>
                <Sparkles className="size-6 text-cyan-300" />
              </div>

              <div className="grid gap-3">
                {[
                  { icon: Languages, title: "Vocabulary 10K", body: "ศัพท์อังกฤษ/จีน พร้อมคำอ่านไทย" },
                  { icon: Mic2, title: "Speaking Score", body: "AI ตรวจ pronunciation + fluency" },
                  { icon: Brain, title: "Memory System", body: "SRS ทบทวนคำที่ลืมบ่อย" }
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300"><item.icon className="size-5" /></span>
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p className="text-sm text-slate-400">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
