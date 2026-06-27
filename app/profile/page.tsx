"use client";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { achievements, learnerProfile } from "@/lib/data/phase11-user-progress";
import { useUiLanguage } from "@/lib/ui-language";

export default function ProfilePage() {
  const { t } = useUiLanguage();
  return (
    <AppShell>
      <PageHeader eyebrow={t("profileEyebrow")} title={t("profileTitle")} description={t("profileDesc")} />
      <Card className="p-6">
        <h2 className="text-3xl font-black">{learnerProfile.name}</h2>
        <p className="mt-2 text-muted-foreground">{learnerProfile.mainGoal}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white/5 p-4">{t("profileEnglish")}<br /><b>{learnerProfile.englishLevel}</b></div>
          <div className="rounded-2xl bg-white/5 p-4">{t("profileChinese")}<br /><b>{learnerProfile.chineseLevel}</b></div>
          <div className="rounded-2xl bg-white/5 p-4">{t("profileGoal")}<br /><b>{learnerProfile.dailyGoal} {t("profileMin")}</b></div>
          <div className="rounded-2xl bg-white/5 p-4">{t("profileStreak")}<br /><b>{learnerProfile.streak} {t("profileDays")}</b></div>
        </div>
      </Card>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {achievements.map((badge) => <Card key={badge.id} className="p-5"><h3 className="font-black">{badge.title}</h3><p className="mt-2 text-sm text-muted-foreground">{badge.description}</p></Card>)}
      </div>
    </AppShell>
  );
}
