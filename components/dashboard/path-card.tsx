import Link from "next/link";
import { Lock, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { LearningPath } from "@/types";

export function PathCard({ path }: { path: LearningPath }) {
  return (
    <Card className="group p-5 transition hover:-translate-y-1 hover:border-cyan-300/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge variant={path.language === "chinese" ? "warning" : "default"}>{path.level} · {path.language}</Badge>
          <h3 className="mt-4 text-xl font-black">{path.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{path.description}</p>
        </div>
        <span className="rounded-2xl bg-secondary p-3 text-primary">
          {path.isLocked ? <Lock className="size-5" /> : <PlayCircle className="size-5" />}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{path.lessonCount} lessons · {path.estimatedTime}</span>
          <span>{path.progress}%</span>
        </div>
        <Progress value={path.progress} />
        <p className="text-xs text-muted-foreground">Next: {path.recommendedNextLesson}</p>
      </div>

      <Link href={`/paths/${path.id}` as never} className="mt-5 inline-flex text-sm font-bold text-cyan-300 hover:text-cyan-200">
        เปิดเส้นทางเรียน →
      </Link>
    </Card>
  );
}
