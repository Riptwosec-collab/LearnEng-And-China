import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";

export default function AdminLessonsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Admin Lessons" title="จัดการบทเรียน" description="เตรียมสำหรับสร้าง lesson, lesson_steps, exercises, quiz และ daily mission" />
      <Card className="p-6">Lesson editor placeholder for Phase 8.</Card>
    </AppShell>
  );
}
