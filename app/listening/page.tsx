"use client";
import { Headphones, Play, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listeningPracticeItems } from "@/lib/data/phase5-speaking-listening";
import { useUiLanguage } from "@/lib/ui-language";

const current = listeningPracticeItems[0];

export default function ListeningPage() {
  const { t } = useUiLanguage();
  return (
    <AppShell>
      <PageHeader eyebrow={t("listeningEyebrow")} title={t("listeningTitle")} description={t("listeningDesc")} />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-3xl bg-cyan-300/10 text-cyan-300"><Headphones /></span>
            <div>
              <Badge>{current.language} · {current.level}</Badge>
              <h2 className="mt-2 text-2xl font-black">{current.title}</h2>
              <p className="text-muted-foreground">{current.accent}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button><Play className="size-4" /> {t("listeningPlay")}</Button>
            {current.speedOptions.map((speed) => <Button key={speed} variant="secondary">{speed}x</Button>)}
            <Button variant="glass"><RotateCcw className="size-4" /> {t("listeningReplay")}</Button>
          </div>
          <div className="mt-6 rounded-3xl bg-secondary/40 p-5 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">{t("listeningTranscript")}</p>
            <p className="mt-2">{current.transcriptVisible ? current.transcript : "Hidden until answer is submitted."}</p>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-2xl font-black">{t("listeningQuestions")}</h3>
          <p className="mt-3 font-semibold">{current.comprehensionQuestion}</p>
          <div className="mt-4 space-y-3">
            {current.choices.map((choice) => <Button key={choice} className="w-full justify-start" variant={choice === current.answer ? "secondary" : "glass"}>{choice}</Button>)}
          </div>
        </Card>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {listeningPracticeItems.slice(1, 9).map((item) => (
          <Card key={item.id} className="p-5">
            <Badge variant="outline">{item.language} · {item.level}</Badge>
            <h3 className="mt-3 font-black">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.accent}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
