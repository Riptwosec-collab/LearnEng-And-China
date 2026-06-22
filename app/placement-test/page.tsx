import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { placementQuestions, recommendPlacementLevel } from "@/lib/data/phase11-user-progress";

export default function PlacementTestPage() {
  const demoLevel = recommendPlacementLevel(64);
  return (
    <AppShell>
      <PageHeader eyebrow="Placement Test" title="ทดสอบระดับก่อนเริ่ม" description="ครอบคลุม vocabulary, grammar, reading, listening และ speaking แบบสั้น" />
      <Card className="mb-5 p-5">
        <p className="text-sm text-muted-foreground">Demo score 64 แนะนำเริ่มที่</p>
        <h2 className="mt-2 text-4xl font-black">{demoLevel}</h2>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        {placementQuestions.map((q, index) => (
          <Card key={q.id} className="p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-violet-300">Question {index + 1} - {q.skill}</p>
            <h2 className="mt-2 text-lg font-bold">{q.prompt}</h2>
            <p className="mt-3 text-sm text-muted-foreground">Target level: {q.level}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
