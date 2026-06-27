"use client";
import { Wand2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { writingCorrectionMock, writingLabPrompts } from "@/lib/data/phase6-reading-writing";
import { useUiLanguage } from "@/lib/ui-language";

const prompt = writingLabPrompts[0];

export default function WritingPage() {
  const { t } = useUiLanguage();
  return (
    <AppShell>
      <PageHeader eyebrow={t("writingEyebrow")} title={t("writingTitle")} description={t("writingDesc")} />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card className="p-6">
          <Badge>{prompt.language} · {prompt.level} · {prompt.writingType}</Badge>
          <h2 className="mt-4 text-2xl font-black">{prompt.title}</h2>
          <p className="mt-2 text-muted-foreground">{prompt.promptTarget}</p>
          <textarea className="mt-5 min-h-48 w-full rounded-3xl border border-input bg-background/50 p-4 outline-none focus:ring-2 focus:ring-ring" placeholder={t("writingPlaceholder")} />
          <div className="mt-4 flex flex-wrap gap-3">
            <Button><Wand2 className="size-4" /> {t("writingAiCorrect")}</Button>
            <Button variant="secondary">{t("writingShowSample")}</Button>
            <Button variant="glass">{t("writingSaveDraft")}</Button>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-2xl font-black">{t("writingScorePreview")}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{writingCorrectionMock.explanationTh}</p>
          <div className="mt-5 space-y-3">{Object.entries(writingCorrectionMock.scores).map(([label, value]) => <div key={label}><div className="mb-1 flex justify-between text-sm"><span className="capitalize">{label}</span><span>{value}%</span></div><Progress value={value} /></div>)}</div>
          <div className="mt-5 flex flex-wrap gap-2">{writingCorrectionMock.suggestedVocabulary.map((word) => <Badge key={word} variant="outline">{word}</Badge>)}</div>
        </Card>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {writingLabPrompts.slice(1, 9).map((item) => (
          <Card key={item.id} className="p-5">
            <Badge variant="outline">{item.language} · {item.level}</Badge>
            <h3 className="mt-3 font-black">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.writingType} · {item.estimatedMinutes} min</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
