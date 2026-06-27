import { CheckCircle2, Circle, Lock, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

type TimelineLesson = {
  id: string;
  status: "completed" | "in_progress" | "ready" | "locked";
  order?: number;
  estimatedMins?: number;
  title: string;
  objectives?: string[];
};

const icons = {
  completed: CheckCircle2,
  in_progress: PlayCircle,
  ready: Circle,
  locked: Lock
};

export function LessonTimeline({ lessons }: { lessons: TimelineLesson[] }) {
  return (
    <Card className="p-5">
      <h2 className="text-2xl font-black">Lesson Timeline</h2>
      <p className="mt-2 text-sm text-muted-foreground">เรียงลำดับบทเรียนจากพื้นฐาน → ใช้จริง → ทดสอบ</p>
      <div className="mt-6 space-y-4">
        {lessons.slice(0, 8).map((lesson, index) => {
          const Icon = icons[lesson.status] ?? Circle;
          return (
            <div key={lesson.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="rounded-full border border-border bg-secondary p-2 text-cyan-300"><Icon className="size-4" /></span>
                {index < Math.min(lessons.length, 8) - 1 ? <span className="h-full w-px bg-border" /> : null}
              </div>
              <div className="pb-4">
                <p className="text-xs text-muted-foreground">Lesson {lesson.order} · {lesson.estimatedMins} นาที</p>
                <h3 className="font-bold">{lesson.title}</h3>
                <p className="text-sm text-muted-foreground">{lesson.objectives?.slice(0, 2).join(" · ")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
