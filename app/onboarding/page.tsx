"use client";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { onboardingGoals } from "@/lib/data/phase11-user-progress";
import { useUiLanguage } from "@/lib/ui-language";

export default function OnboardingPage() {
  const { t } = useUiLanguage();
  return (
    <AppShell>
      <PageHeader eyebrow={t("onboardingEyebrow")} title={t("onboardingTitle")} description={t("onboardingDesc")} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {onboardingGoals.map((goal) => (
          <Card key={goal.id} className="p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{t("onboardingStart")} {goal.recommendedLevel}</p>
            <h2 className="mt-2 text-xl font-black">{goal.title}</h2>
            <Link className="mt-4 inline-block rounded-full border px-4 py-2 text-sm" href="/placement-test">{t("onboardingTestBtn")}</Link>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
