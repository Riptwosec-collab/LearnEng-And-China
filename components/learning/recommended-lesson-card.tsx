import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type RecommendedLesson = {
  id: string;
  title: string;
  pathTitle?: string;
  level?: string;
  estimatedMins?: number;
  xpReward?: number;
};

export function RecommendedLessonCard({ lesson }: { lesson: RecommendedLesson }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge variant="warning">AI Recommended</Badge>
          <h3 className="mt-3 text-xl font-black">{lesson.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">จาก path: {lesson.pathTitle}</p>
        </div>
        <span className="rounded-2xl bg-amber-400/10 p-3 text-amber-300"><Sparkles className="size-5" /></span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
        <div className="rounded-2xl bg-secondary/40 p-3"><b className="block text-foreground">{lesson.level}</b>Level</div>
        <div className="rounded-2xl bg-secondary/40 p-3"><b className="block text-foreground">{lesson.estimatedMins}</b>Min</div>
        <div className="rounded-2xl bg-secondary/40 p-3"><b className="block text-foreground">{lesson.xpReward}</b>XP</div>
      </div>
      <Button asChild className="mt-5 w-full" variant="glass">
        <Link href={`/lessons/${lesson.id}`}>เรียนต่อ <ArrowRight className="size-4" /></Link>
      </Button>
    </Card>
  );
}
