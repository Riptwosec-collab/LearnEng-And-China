import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { dashboardStats } from "@/lib/data/dashboard";

export default function ProgressPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Progress" title="วัดผลการเรียนทั้งหมด" description="Overall progress, English/Chinese progress, skill scores, recent mistakes และ heatmap" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{dashboardStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</div>
    </AppShell>
  );
}
