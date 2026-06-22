import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { lessonDrafts } from "@/lib/data/phase8-admin";

export default function AdminLessonsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Admin Lessons" title="Lesson CMS" description="Manage lesson drafts, steps, tasks and quiz counts." />
      <div className="grid gap-4 lg:grid-cols-2">
        {lessonDrafts.map((lesson) => (
          <Card key={lesson.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-violet-300">{lesson.level}</p>
                <h2 className="mt-2 text-xl font-black">{lesson.title}</h2>
                <p className="text-sm text-muted-foreground">Path: {lesson.pathId}</p>
              </div>
              <span className="rounded-full border px-3 py-1 text-xs">{lesson.status}</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-2xl bg-white/5 p-3">{lesson.steps}<br />steps</div>
              <div className="rounded-2xl bg-white/5 p-3">{lesson.exercises}<br />tasks</div>
              <div className="rounded-2xl bg-white/5 p-3">{lesson.quizQuestions}<br />quiz</div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
