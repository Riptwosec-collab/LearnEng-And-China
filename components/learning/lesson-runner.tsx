"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type LessonStep = {
  id: string;
  order?: number;
  type?: string;
  title?: string;
  content?: { instructionTh?: string; estimatedMinutes?: number; [key: string]: unknown };
};

type Lesson = {
  id: string;
  title?: string;
  description?: string;
  language?: string;
  level?: string;
  pathId?: string;
  categoryId?: string;
  xpReward?: number;
  steps?: LessonStep[];
};

type VocabularyItem = {
  id: string;
  word?: string;
  chineseHanzi?: string;
  pinyin?: string;
  ipa?: string;
  thaiMeaning?: string;
  exampleSentence?: string;
};

type LessonPayload = {
  lesson?: Lesson;
  path?: { title?: string };
  category?: { icon?: string; nameTh?: string };
  vocabulary?: VocabularyItem[];
};

type SavedLessonProgress = { completedSteps: string[]; completed: boolean; updatedAt: string };

const allProgressKey = "linguaquest:lesson-progress";

function readAllProgress(): Record<string, SavedLessonProgress> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(allProgressKey) ?? "{}") as Record<string, SavedLessonProgress>;
  } catch {
    return {};
  }
}

function writeLessonProgress(lessonId: string, value: SavedLessonProgress) {
  const all = readAllProgress();
  all[lessonId] = value;
  localStorage.setItem(allProgressKey, JSON.stringify(all));
}

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = /[\u4e00-\u9fff]/.test(text) ? "zh-CN" : "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function LessonRunner({ lessonId }: { lessonId: string }) {
  const [data, setData] = useState<LessonPayload | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadLesson() {
      setStatus("loading");
      try {
        const response = await fetch(`/api/lessons/${lessonId}`, { cache: "no-store" });
        const payload = (await response.json()) as { data?: LessonPayload };
        setData(payload.data ?? null);
        setCompletedSteps(readAllProgress()[lessonId]?.completedSteps ?? []);
        setStatus(response.ok ? "ready" : "not_found");
      } catch {
        setStatus("error");
      }
    }
    void loadLesson();
  }, [lessonId]);

  const lesson = data?.lesson;
  const steps = useMemo(() => lesson?.steps ?? [], [lesson]);
  const percent = steps.length ? Math.round((completedSteps.length / steps.length) * 100) : 0;

  function saveSteps(nextSteps: string[]) {
    setCompletedSteps(nextSteps);
    writeLessonProgress(lessonId, { completedSteps: nextSteps, completed: steps.length > 0 && nextSteps.length >= steps.length, updatedAt: new Date().toISOString() });
  }

  function completeStep(stepId: string) {
    if (!completedSteps.includes(stepId)) saveSteps([...completedSteps, stepId]);
  }

  function completeLesson() {
    saveSteps(steps.map((step) => step.id));
  }

  if (status === "loading") {
    return <Card className="p-6"><div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Loading lesson...</div></Card>;
  }

  if (!lesson) {
    return <Card className="p-6"><h2 className="text-xl font-black">Lesson not found</h2><Button className="mt-4" asChild><Link href="/learn">กลับหน้า Learn</Link></Button></Card>;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>{lesson.language}</Badge>
              <Badge variant="outline">{lesson.level}</Badge>
              <Badge variant="outline">{data?.category?.icon} {data?.category?.nameTh}</Badge>
              <Badge variant="outline">{lesson.xpReward ?? 0} XP</Badge>
            </div>
            <h2 className="mt-4 text-3xl font-black">{lesson.title}</h2>
            <p className="mt-2 text-muted-foreground">{lesson.description}</p>
          </div>
          <Button asChild variant="glass"><Link href="/learn">กลับไป Learn</Link></Button>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Lesson progress</span><span>{percent}%</span></div>
          <Progress value={percent} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {steps.map((step) => {
            const done = completedSteps.includes(step.id);
            return (
              <div key={step.id} className={`rounded-3xl border p-4 ${done ? "border-cyan-300/40 bg-cyan-300/10" : "border-border bg-secondary/30"}`}>
                <div className="flex items-start gap-3">
                  <span className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300"><CheckCircle2 className="size-5" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Step {step.order ?? ""} · {step.type}</p>
                    <h3 className="mt-1 font-black capitalize">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.content?.instructionTh ?? "ทำกิจกรรมนี้ให้ครบ แล้วกดบันทึกว่าเสร็จ"}</p>
                    <p className="mt-2 text-xs text-muted-foreground">~{step.content?.estimatedMinutes ?? 3} นาที</p>
                    <Button className="mt-3" size="sm" variant={done ? "glass" : "default"} onClick={() => completeStep(step.id)} disabled={done}>{done ? "Done" : "Mark complete"}</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={completeLesson}>Complete lesson</Button>
          <Button variant="outline" asChild><Link href="/review">ไปทบทวน</Link></Button>
          <Button variant="outline" asChild><Link href="/ai-tutor">ถาม AI Tutor</Link></Button>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-5">
          <h3 className="text-xl font-black">คำศัพท์ในบทนี้</h3>
          <div className="mt-4 space-y-3">
            {(data?.vocabulary ?? []).slice(0, 8).map((word) => {
              const display = word.chineseHanzi ?? word.word ?? word.id;
              return (
                <div key={word.id} className="rounded-2xl bg-secondary/40 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div><p className="font-bold">{display}</p><p className="text-sm text-cyan-300">{word.pinyin ?? word.ipa}</p><p className="text-sm text-muted-foreground">{word.thaiMeaning}</p></div>
                    <Button size="icon" variant="ghost" onClick={() => speak(display)}><Volume2 className="size-4" /></Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-xl font-black">Next actions</h3>
          <div className="mt-4 grid gap-3">
            <Button asChild variant="outline"><Link href="/writing">ฝึก Writing</Link></Button>
            <Button asChild variant="outline"><Link href="/speaking">ฝึก Speaking</Link></Button>
            <Button asChild variant="outline"><Link href="/progress">ดู Progress</Link></Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
