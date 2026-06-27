"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, Brain, Headphones, Mic2, PenLine, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUiLanguage } from "@/lib/ui-language";

type Lesson = {
  id: string;
  title?: string;
  description?: string;
  language?: string;
  level?: string;
  progress?: number;
  xpReward?: number;
  steps?: Array<{ id: string }>;
};

type LessonProgress = Record<string, { completedSteps: string[]; completed: boolean; updatedAt: string }>;

const progressKey = "linguaquest:lesson-progress";

const quickSkills = [
  { title: "Vocabulary", href: "/vocabulary", icon: Brain, helper: "จำคำศัพท์ + SRS" },
  { title: "Speaking", href: "/speaking", icon: Mic2, helper: "ฝึกพูด + roleplay" },
  { title: "Listening", href: "/listening", icon: Headphones, helper: "ฟัง + dictation" },
  { title: "Reading", href: "/reading", icon: BookOpen, helper: "อ่าน passage" },
  { title: "Writing", href: "/writing", icon: PenLine, helper: "แก้ประโยคด้วย AI" }
];

function loadProgress(): LessonProgress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(progressKey) ?? "{}") as LessonProgress;
  } catch {
    return {};
  }
}

function lessonPercent(lesson: Lesson, progress: LessonProgress) {
  const saved = progress[lesson.id];
  if (saved?.completed) return 100;
  const totalSteps = lesson.steps?.length ?? 0;
  if (totalSteps > 0) return Math.round(((saved?.completedSteps.length ?? 0) / totalSteps) * 100);
  return lesson.progress ?? 0;
}

export default function LearnPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<LessonProgress>({});
  const [status, setStatus] = useState("loading");
  const { t } = useUiLanguage();

  const loadLessons = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/lessons", { cache: "no-store" });
      const payload = (await response.json()) as { data?: Lesson[] };
      setLessons(payload.data ?? []);
      setProgress(loadProgress());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    async function init() { await loadLessons(); }
    void init();
  }, [loadLessons]);

  const completedCount = useMemo(() => lessons.filter((lesson) => lessonPercent(lesson, progress) >= 100).length, [lessons, progress]);
  const continueLesson = useMemo(() => lessons.find((lesson) => lessonPercent(lesson, progress) < 100) ?? lessons[0], [lessons, progress]);
  const recommended = useMemo(() => lessons.slice(0, 9), [lessons]);

  return (
    <AppShell>
      <PageHeader eyebrow={t("learnEyebrow")} title={t("learnTitle")} description={t("learnDesc")} />

      <div className="space-y-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {quickSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <Link key={skill.title} href={skill.href}>
                <Card className="group h-full p-5 transition hover:-translate-y-1 hover:border-cyan-300/50">
                  <span className="inline-flex rounded-2xl bg-cyan-400/10 p-3 text-cyan-300"><Icon className="size-5" /></span>
                  <h3 className="mt-4 text-xl font-black">{skill.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{skill.helper}</p>
                </Card>
              </Link>
            );
          })}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="p-5"><p className="text-sm text-muted-foreground">{t("learnStatus")}</p><p className="mt-2 text-2xl font-black capitalize">{status}</p></Card>
          <Card className="p-5"><p className="text-sm text-muted-foreground">{t("learnLessons")}</p><p className="mt-2 text-2xl font-black">{lessons.length}</p></Card>
          <Card className="p-5"><p className="text-sm text-muted-foreground">{t("learnCompleted")}</p><p className="mt-2 text-2xl font-black text-cyan-300">{completedCount}</p></Card>
        </section>

        <Card className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge variant="outline">{t("learnFlow")}</Badge>
              <h2 className="mt-3 text-2xl font-black">{t("learnTodayTitle")}</h2>
              <p className="text-sm text-muted-foreground">{t("learnTodayDesc")}</p>
            </div>
            <Button variant="glass" onClick={() => void loadLessons()}><RotateCcw className="size-4" /> {t("learnRefresh")}</Button>
          </div>

          {continueLesson ? (
            <div className="mt-5 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-sm text-muted-foreground">{t("learnContinueLesson")}</p>
              <h3 className="mt-1 text-2xl font-black">{continueLesson.title ?? continueLesson.id}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{continueLesson.description}</p>
              <div className="mt-4 flex flex-wrap gap-2"><Badge>{continueLesson.language}</Badge><Badge variant="outline">{continueLesson.level}</Badge><Badge variant="outline">{lessonPercent(continueLesson, progress)}%</Badge></div>
              <Progress className="mt-4" value={lessonPercent(continueLesson, progress)} />
              <Button className="mt-4" asChild><Link href={`/lessons/${continueLesson.id}`}>Start / Continue <ArrowRight className="size-4" /></Link></Button>
            </div>
          ) : null}
        </Card>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black">{t("learnAllLessons")}</h2>
            <Badge variant="outline">{recommended.length} shown</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recommended.map((lesson) => {
              const percent = lessonPercent(lesson, progress);
              return (
                <Card key={lesson.id} className="p-5">
                  <div className="flex flex-wrap gap-2"><Badge>{lesson.language}</Badge><Badge variant="outline">{lesson.level}</Badge><Badge variant="outline">{lesson.xpReward ?? 0} XP</Badge></div>
                  <h3 className="mt-3 text-xl font-black">{lesson.title ?? lesson.id}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{lesson.description}</p>
                  <Progress className="mt-4" value={percent} />
                  <div className="mt-2 text-sm text-muted-foreground">{t("learnProgressLabel")} {percent}%</div>
                  <Button className="mt-4 w-full" asChild><Link href={`/lessons/${lesson.id}`}>{percent >= 100 ? t("learnReviewBtn") : t("learnStartBtn")}</Link></Button>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
