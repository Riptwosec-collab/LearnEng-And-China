"use client";
import { BookOpen, Languages } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { readingLabItems } from "@/lib/data/phase6-reading-writing";
import { useUiLanguage } from "@/lib/ui-language";

const current = readingLabItems[0];

export default function ReadingPage() {
  const { t } = useUiLanguage();
  return (
    <AppShell>
      <PageHeader eyebrow={t("readingEyebrow")} title={t("readingTitle")} description={t("readingDesc")} />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card className="p-6">
          <Badge>{current.language} · {current.level} · {current.readingTimeMinutes} min</Badge>
          <h2 className="mt-4 text-3xl font-black">{current.title}</h2>
          <p className="mt-5 leading-8 text-muted-foreground">{current.passage}</p>
          <div className="mt-6 rounded-3xl bg-secondary/40 p-5">
            <div className="flex items-center gap-2 font-bold"><Languages className="size-4" /> {t("readingTranslation")}</div>
            <p className="mt-2 text-sm text-muted-foreground">{current.translationTh}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button><BookOpen className="size-4" /> {t("readingQuiz")}</Button>
            <Button variant="secondary">{t("readingSaveWords")}</Button>
            <Button variant="glass">{t("readingAiSummary")}</Button>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-2xl font-black">{t("vocabTitle")}</h3>
          <div className="mt-4 flex flex-wrap gap-2">{current.keyVocabulary.map((word) => <Badge key={word} variant="outline">{word}</Badge>)}</div>
          <h3 className="mt-6 text-2xl font-black">{t("readingAiSummary")}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{current.summaryTh}</p>
          <h3 className="mt-6 text-2xl font-black">{t("readingQuestions")}</h3>
          <div className="mt-3 space-y-3">{current.comprehensionQuestions.map((item) => <div key={item.question} className="rounded-2xl bg-secondary/40 p-3 text-sm"><p className="font-semibold">{item.question}</p><p className="text-muted-foreground">{item.answer}</p></div>)}</div>
        </Card>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {readingLabItems.slice(1, 9).map((item) => (
          <Card key={item.id} className="p-5">
            <Badge variant="outline">{item.language} · {item.level}</Badge>
            <h3 className="mt-3 font-black">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.readingTimeMinutes} minutes</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
