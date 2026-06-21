import Link from "next/link";
import { ArrowRight, BookOpenCheck, CalendarClock, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function PathProgressPanel({ path, summary }: { path: any; summary: any }) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant={path.language === "chinese" ? "warning" : "default"}>{path.language}</Badge>
            <Badge variant="outline">{path.level}</Badge>
            <Badge variant="outline">{path.estimatedTime}</Badge>
          </div>
          <h2 className="mt-4 text-3xl font-black">{path.title}</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">{path.description}</p>
        </div>
        <Button asChild>
          <Link href={`/lessons/${summary.nextLessonId}` as never}>เรียนบทถัดไป <ArrowRight className="size-4" /></Link>
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-secondary/30 p-4">
          <BookOpenCheck className="size-5 text-cyan-300" />
          <p className="mt-3 text-2xl font-black">{summary.completedLessons}/{summary.totalLessons}</p>
          <p className="text-sm text-muted-foreground">Lessons completed</p>
        </div>
        <div className="rounded-3xl border border-border bg-secondary/30 p-4">
          <Target className="size-5 text-violet-300" />
          <p className="mt-3 text-2xl font-black">{summary.progress}%</p>
          <p className="text-sm text-muted-foreground">Path progress</p>
        </div>
        <div className="rounded-3xl border border-border bg-secondary/30 p-4">
          <CalendarClock className="size-5 text-emerald-300" />
          <p className="mt-3 text-2xl font-black">{summary.estimatedMinsToday} นาที</p>
          <p className="text-sm text-muted-foreground">แผนเรียนวันนี้</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm text-muted-foreground">
          <span>Overall path progress</span>
          <span>{summary.progress}%</span>
        </div>
        <Progress value={summary.progress} />
      </div>
    </Card>
  );
}
