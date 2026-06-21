import { PathCard } from "@/components/dashboard/path-card";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { learningPaths } from "@/lib/data/learning-paths";

export default function PathsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Learning Paths" title="เส้นทางเรียนหลัก" description="เริ่มจาก Daily Life, Travel, Work, School, Conversation Booster, Grammar และ AI Roleplay" />
      <div className="grid gap-4 lg:grid-cols-2">
        {learningPaths.map((path) => <PathCard key={path.id} path={path} />)}
      </div>
    </AppShell>
  );
}
