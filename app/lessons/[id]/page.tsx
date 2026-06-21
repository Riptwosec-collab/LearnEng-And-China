import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, CheckCircle2, Headphones, MessageCircle, Mic2, PenLine, Sparkles, Target } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { categorySeeds, learningPathSeeds, vocabularySeeds } from "@/lib/data/phase2-dataset";
import { getLessonById } from "@/lib/data/phase3-learning";

const stepIconMap: Record<string, any> = {
  vocabulary: BookOpen,
  dialogue: MessageCircle,
  listening: Headphones,
  speaking: Mic2,
  reading: BookOpen,
  writing: PenLine,
  grammar: Target,
  quiz: CheckCircle2,
  mission: Sparkles
};

export default async function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) notFound();

  const path = learningPathSeeds.find((item) => item.id === lesson.pathId);
  const category = categorySeeds.find((item) => item.id === lesson.categoryId);
  const words = vocabularySeeds
    .filter((word) => word.language === lesson.language && (word.categoryId === lesson.categoryId || word.category === lesson.categoryId))
    .slice(0, 6);

  return (
    <AppShell>
      <PageHeader eyebrow={`${path?.title ?? "Learning Path"} · Lesson ${lesson.order}`} title={lesson.title} description={lesson.description} />

      <section className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <Card className="p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={lesson.language === "chinese" ? "warning" : "default"}>{lesson.language}</Badge>
                <Badge variant="outline">{lesson.level}</Badge>
                <Badge variant="outline">{category?.icon} {category?.nameTh}</Badge>
                <Badge variant="success">{lesson.xpReward} XP</Badge>
              </div>
              <h2 className="mt-4 text-3xl font-black">Lesson Flow</h2>
              <p className="mt-2 text-muted-foreground">ทำครบตามลำดับเพื่อเก็บ progress: vocabulary, dialogue, listening, speaking, reading, writing, grammar, quiz และ daily mission</p>
            </div>
            <Button asChild variant="glass"><Link href={`/paths/${lesson.pathId}` as never}>กลับไป path</Link></Button>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Lesson progress</span><span>{lesson.progress}%</span></div>
            <Progress value={lesson.progress} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {lesson.steps.map((step) => {
              const Icon = stepIconMap[step.type] ?? BookOpen;
              return (
                <div key={step.id} className="rounded-3xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-start gap-3">
                    <span className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300"><Icon className="size-5" /></span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Step {step.order}</p>
                      <h3 className="mt-1 font-black capitalize">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.content.instructionTh}</p>
                      <p className="mt-2 text-xs text-muted-foreground">~{step.content.estimatedMinutes} นาที</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="text-2xl font-black">Objectives</h2>
            <div className="mt-4 space-y-3">
              {lesson.objectives.map((objective) => (
                <div key={objective} className="flex gap-3 rounded-2xl bg-secondary/30 p-3 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 text-emerald-300" />
                  <span>{objective}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-2xl font-black">Vocabulary in this lesson</h2>
            <div className="mt-4 space-y-3">
              {words.map((word) => (
                <Link key={word.id} href={`/vocabulary/${word.id}` as never} className="block rounded-3xl border border-border bg-secondary/30 p-4 transition hover:border-cyan-300/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-black">{word.word}</p>
                      <p className="text-sm text-muted-foreground">{word.thaiMeaning}</p>
                    </div>
                    <Badge variant="outline">{word.cefrLevel}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{word.exampleSentence}</p>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-2xl font-black">Mini Quiz Preview</h2>
            <p className="mt-2 text-sm text-muted-foreground">หลังจบบท ระบบจะสร้าง quiz จากคำศัพท์และ grammar ในบทนี้</p>
            <Button className="mt-5 w-full">Start lesson mock</Button>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}
