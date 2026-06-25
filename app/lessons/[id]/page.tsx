import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { LessonRunner } from "@/components/learning/lesson-runner";

export default async function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AppShell>
      <PageHeader eyebrow="Interactive Lesson" title="เรียนทีละ Step" description="โหลดบทเรียนจาก API, กดทำแต่ละ step, ฟังคำศัพท์ และบันทึก progress ในเครื่อง" />
      <LessonRunner lessonId={id} />
    </AppShell>
  );
}
