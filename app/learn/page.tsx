import { FeatureGrid } from "@/components/dashboard/feature-grid";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";

export default function LearnPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Learn Hub" title="ศูนย์รวมการเรียนทุกสกิล" description="Phase 1 เตรียม navigation และ component system สำหรับต่อ lesson steps, exercises และ AI-generated quiz ใน Phase 3-7" />
      <FeatureGrid />
    </AppShell>
  );
}
