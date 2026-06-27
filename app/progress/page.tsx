"use client";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { achievements, learnerProfile, progressHeatmap, recentMistakes } from "@/lib/data/phase11-user-progress";
import { useUiLanguage } from "@/lib/ui-language";

export default function ProgressPage() {
  const { t } = useUiLanguage();
  return (
    <AppShell>
      <PageHeader eyebrow={t("progressEyebrow")} title={t("progressTitle")} description={t("progressDesc")} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5"><p className="text-sm text-muted-foreground">{t("progressXP")}</p><p className="text-3xl font-black">{learnerProfile.xp}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">{t("progressStreak")}</p><p className="text-3xl font-black">{learnerProfile.streak} {t("days")}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">{t("progressRemembered")}</p><p className="text-3xl font-black">{learnerProfile.wordsRemembered}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">{t("progressReviewToday")}</p><p className="text-3xl font-black">{learnerProfile.wordsDueToday}</p></Card>
      </div>
      <Card className="mt-5 p-5">
        <h2 className="text-xl font-black">{t("progressHeatmap")}</h2>
        <div className="mt-4 grid grid-cols-7 gap-2">{progressHeatmap.map((d) => <div key={d.day} className="rounded-xl bg-cyan-300/20 p-2 text-center text-xs">{d.day}<br />{d.xp}</div>)}</div>
      </Card>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-xl font-black">{t("progressAchievements")}</h2>
          <div className="mt-4 space-y-3">{achievements.map((a) => <p key={a.id} className="text-sm"><b>{a.title}</b> - {a.unlocked ? t("progressUnlocked") : t("progressLocked")}</p>)}</div>
        </Card>
        <Card className="p-5">
          <h2 className="text-xl font-black">{t("progressMistakes")}</h2>
          <div className="mt-4 space-y-3">{recentMistakes.map((m) => <p key={m.item} className="text-sm"><b>{m.skill}</b>: {m.note}</p>)}</div>
        </Card>
      </div>
    </AppShell>
  );
}
