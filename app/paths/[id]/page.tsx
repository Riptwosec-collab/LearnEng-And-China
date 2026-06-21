import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { learningPaths } from "@/lib/data/learning-paths";

export default async function PathDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const path = learningPaths.find((item) => item.id === id);
  if (!path) notFound();

  return (
    <AppShell>
      <PageHeader eyebrow={`${path.language} · ${path.level}`} title={path.title} description={path.description} />
      <Card className="p-6">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{path.lessonCount} lessons · {path.estimatedTime}</span>
          <span>{path.progress}%</span>
        </div>
        <Progress value={path.progress} className="mt-3" />
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-3xl border border-border bg-secondary/30 p-4">
              <p className="text-sm text-muted-foreground">Lesson {index + 1}</p>
              <h3 className="mt-1 font-bold">Real-life practice #{index + 1}</h3>
              <p className="mt-2 text-sm text-muted-foreground">Vocabulary · Dialogue · Quiz · Speaking</p>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
