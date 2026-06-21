import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const skillTone: Record<string, string> = {
  vocabulary: "text-cyan-300",
  speaking: "text-violet-300",
  listening: "text-blue-300",
  reading: "text-emerald-300",
  writing: "text-amber-300",
  grammar: "text-pink-300"
};

export function SkillScoreCard({ metric }: { metric: { skill: string; label: string; score: number; target: number; helper: string } }) {
  const gap = Math.max(0, metric.target - metric.score);

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Skill</p>
          <h3 className="mt-2 text-xl font-black">{metric.label}</h3>
        </div>
        <Badge variant={gap <= 10 ? "success" : "outline"}>{gap <= 10 ? "ใกล้เป้า" : `ขาด ${gap}%`}</Badge>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <p className={`text-4xl font-black ${skillTone[metric.skill] ?? "text-cyan-300"}`}>{metric.score}</p>
        <p className="text-sm text-muted-foreground">Target {metric.target}</p>
      </div>
      <Progress value={metric.score} className="mt-4" />
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{metric.helper}</p>
    </Card>
  );
}
