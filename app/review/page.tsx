"use client";
import Link from "next/link";
import { RotateCcw, Volume2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { flashcardDecks, getDailyReviewQueue, vocabularyStats } from "@/lib/data/phase4-vocabulary";
import { useUiLanguage } from "@/lib/ui-language";

const queue = getDailyReviewQueue(12);
const current = queue[0];

export default function ReviewPage() {
  const { t } = useUiLanguage();
  return (
    <AppShell>
      <PageHeader eyebrow={t("reviewEyebrow")} title={t("reviewTitle")} description={t("reviewDesc")} />
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card className="p-5"><p className="text-sm text-muted-foreground">{t("reviewDueToday")}</p><p className="mt-2 text-3xl font-black">{vocabularyStats.dueToday}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">{t("reviewMastered")}</p><p className="mt-2 text-3xl font-black">{vocabularyStats.mastered}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">{t("reviewFavorites")}</p><p className="mt-2 text-3xl font-black">{vocabularyStats.favorites}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">{t("reviewQueue")}</p><p className="mt-2 text-3xl font-black text-cyan-300">{queue.length}</p></Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6 text-center">
          <div className="flex justify-center gap-2"><Badge>{current.language}</Badge><Badge variant="outline">{current.cefrLevel}</Badge></div>
          <p className="mt-5 text-sm text-muted-foreground">{t("reviewFront")}</p>
          <h2 className="mt-3 text-5xl font-black">{current.chineseHanzi ?? current.word}</h2>
          <p className="mt-2 text-cyan-300">{current.pinyin ?? current.ipa}</p>
          <p className="mt-3 text-xl font-bold">{current.thaiMeaning}</p>
          <Progress value={current.progress?.accuracy ?? 64} className="mt-6" />
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Button variant="secondary">{t("reviewAgain")}</Button>
            <Button variant="secondary">{t("reviewHard")}</Button>
            <Button>{t("reviewGood")}</Button>
            <Button variant="glass">{t("reviewEasy")}</Button>
          </div>
          <Button className="mt-4" variant="glass"><Volume2 className="size-4" /> Listen</Button>
        </Card>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {flashcardDecks.map((deck) => <Card key={deck.id} className="p-5"><p className="text-sm text-cyan-300">{deck.mode}</p><h3 className="mt-1 text-xl font-black">{deck.title}</h3><p className="mt-2 text-sm text-muted-foreground">{deck.description}</p></Card>)}
          </div>
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-black">{t("reviewFavoriteDecks")}</h3><Button size="sm" variant="glass"><RotateCcw className="size-4" /> {t("refresh")}</Button></div>
            <div className="space-y-3">
              {queue.slice(0, 6).map((word) => <Link key={word.id} href={`/vocabulary/${word.id}`} className="flex items-center justify-between rounded-2xl bg-secondary/40 p-3"><span className="font-semibold">{word.chineseHanzi ?? word.word}</span><span className="text-sm text-muted-foreground">{word.progressStatus}</span></Link>)}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
