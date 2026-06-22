import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { onboardingGoals } from "@/lib/data/phase11-user-progress";

export default function OnboardingPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Phase 11 Onboarding" title="ตั้งค่าเป้าหมายก่อนเริ่มเรียน" description="เลือกเป้าหมายหลักเพื่อแนะนำ path และระดับเริ่มต้น" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {onboardingGoals.map((goal) => (
          <Card key={goal.id} className="p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Start {goal.recommendedLevel}</p>
            <h2 className="mt-2 text-xl font-black">{goal.title}</h2>
            <Link className="mt-4 inline-block rounded-full border px-4 py-2 text-sm" href="/placement-test">ทำ placement test</Link>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
