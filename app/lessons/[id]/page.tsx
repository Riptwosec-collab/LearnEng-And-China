import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AppShell>
      <PageHeader eyebrow={`Lesson ${id}`} title="Real-life lesson template" description="Vocabulary → Dialogue → Listening → Speaking → Reading → Writing → Mini Quiz → Daily Mission" />
      <Card className="p-6">
        <h2 className="text-2xl font-black">Ordering at a cafe</h2>
        <p className="mt-3 text-muted-foreground">This page is ready for lesson_steps and exercises from database in Phase 2-3.</p>
        <Button className="mt-6">Start lesson</Button>
      </Card>
    </AppShell>
  );
}
