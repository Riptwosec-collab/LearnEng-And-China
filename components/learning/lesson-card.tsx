import Link from "next/link";
import { CheckCircle2, Clock3, Lock, PlayCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Lesson = {
  id: string;
  title: string;
  description?: string;
  level?: string;
  status: string;          // string from data; narrowed internally via statusMap lookup
  isRecommended?: boolean;
  estimatedMins?: number;
  steps?: unknown[];
  xpReward?: number;
  progress?: number;
};

const statusMap = {
  completed:   { label: "เรียนแล้ว",    icon: CheckCircle2, badge: "success"  as const },
  in_progress: { label: "กำลังเรียน",   icon: PlayCircle,   badge: "default"  as const },
  ready:       { label: "พร้อมเรียน",   icon: Sparkles,     badge: "outline"  as const },
  locked:      { label: "ยังล็อก",      icon: Lock,         badge: "outline"  as const },
};

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const status = statusMap[lesson.status as keyof typeof statusMap] ?? statusMap.ready;
  const Icon = status.icon;
  const disabled = lesson.status === "locked";

  return (
    <Card className="group p-5 transition hover:-translate-y-1 hover:border-cyan-300/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={status.badge}>{status.label}</Badge>
            <Badge variant="outline">{lesson.level}</Badge>
            {lesson.isRecommended ? <Badge variant="warning">แนะนำวันนี้</Badge> : null}
          </div>
          <h3 className="mt-4 text-xl font-black leading-tight">{lesson.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{lesson.description}</p>
        </div>
        <span className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300"><Icon className="size-5" /></span>
      </div>

      <div className="mt-5 grid gap-3 rounded-3xl border border-border bg-secondary/25 p-4 text-sm text-muted-foreground sm:grid-cols-3">
        <span className="flex items-center gap-2"><Clock3 className="size-4" /> {lesson.estimatedMins} นาที</span>
        <span>{lesson.steps?.length ?? 0} steps</span>
        <span>{lesson.xpReward ?? 40} XP</span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>Lesson progress</span>
          <span>{lesson.progress}%</span>
        </div>
        <Progress value={lesson.progress} />
      </div>

      <Button asChild className="mt-5 w-full" variant={disabled ? "outline" : "default"}>
        <Link href={disabled ? "#" : `/lessons/${lesson.id}`}>
          {disabled ? "ปลดล็อกหลังจบบทก่อนหน้า" : "เปิดบทเรียน"}
        </Link>
      </Button>
    </Card>
  );
}
