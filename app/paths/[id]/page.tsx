import { notFound } from "next/navigation";
import { LessonCard } from "@/components/learning/lesson-card";
import { LessonTimeline } from "@/components/learning/lesson-timeline";
import { PathProgressPanel } from "@/components/learning/path-progress-panel";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { categorySeeds, vocabularySeeds } from "@/lib/data/phase2-dataset";
import { getLessonsForPath, getPathSummary } from "@/lib/data/phase3-learning";
import { learningPaths } from "@/lib/data/learning-paths";

export default async function PathDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const path = learningPaths.find((item) => item.id === id);
  if (!path) notFound();

  const lessons = getLessonsForPath(path.id);
  const summary = getPathSummary(path.id);
  const categories = Array.from(new Set(lessons.map((lesson) => lesson.categoryId)))
    .map((categoryId) => categorySeeds.find((category) => category.id === categoryId))
    .filter(Boolean)
    .slice(0, 8);
  const pathWords = vocabularySeeds.filter((word) => categories.some((category) => category?.id === word.categoryId || category?.id === word.category));

  return (
    <AppShell>
      <PageHeader eyebrow={`${path.language} · ${path.level}`} title={path.title} description={path.description} />
      <PathProgressPanel path={path} summary={summary} />

      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-black">Lessons in this path</h2>
              <p className="text-sm text-muted-foreground">ทุกบทมี Vocabulary → Dialogue → Listening → Speaking → Reading → Writing → Grammar → Quiz → Mission</p>
            </div>
            <Badge variant="outline">{lessons.length} generated lessons</Badge>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {lessons.slice(0, 10).map((lesson) => <LessonCard key={lesson.id} lesson={lesson} />)}
          </div>
        </div>

        <div className="space-y-6">
          <LessonTimeline lessons={lessons} />
          <Card className="p-5">
            <h2 className="text-2xl font-black">Path Coverage</h2>
            <p className="mt-2 text-sm text-muted-foreground">หมวดและคำศัพท์ที่ path นี้จะเจอ</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => category ? <Badge key={category.id} variant="outline">{category.icon} {category.nameTh}</Badge> : null)}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-2xl bg-secondary/40 p-3"><b className="block text-2xl text-foreground">{pathWords.length}</b>Words</div>
              <div className="rounded-2xl bg-secondary/40 p-3"><b className="block text-2xl text-foreground">{categories.length}</b>Categories</div>
              <div className="rounded-2xl bg-secondary/40 p-3"><b className="block text-2xl text-foreground">{path.skillFocus.length}</b>Skills</div>
            </div>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}
