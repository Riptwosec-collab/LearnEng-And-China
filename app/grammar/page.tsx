import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { grammarRealLifeTopics } from "@/lib/data/phase7-grammar-ai";

const current = grammarRealLifeTopics[0];

export default function GrammarPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Phase 7 Grammar" title="Grammar in Real Life" description="Grammar lessons connected to daily situations, mini quiz, speaking practice and writing practice." />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card className="p-6">
          <Badge>{current.language} · {current.level}</Badge>
          <h2 className="mt-4 text-3xl font-black">{current.title}</h2>
          <p className="mt-3 text-muted-foreground">{current.explanationTh}</p>
          <div className="mt-5 rounded-3xl bg-secondary/40 p-5"><p className="text-sm text-muted-foreground">Pattern</p><p className="mt-1 font-semibold">{current.pattern}</p></div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">{current.examples.map((example) => <div key={example.target} className="rounded-2xl bg-secondary/30 p-4"><p className="font-semibold">{example.target}</p><p className="mt-1 text-sm text-muted-foreground">{example.th}</p></div>)}</div>
        </Card>
        <Card className="p-6">
          <h3 className="text-2xl font-black">Mini quiz</h3>
          <p className="mt-3 font-semibold">{current.miniQuiz.question}</p>
          <div className="mt-4 space-y-3">{current.miniQuiz.choices.map((choice) => <Button key={choice} className="w-full justify-start" variant={choice === current.miniQuiz.answer ? "secondary" : "glass"}>{choice}</Button>)}</div>
          <div className="mt-6 rounded-3xl bg-cyan-300/5 p-4 text-sm text-muted-foreground"><p className="font-semibold text-foreground">Practice</p><p className="mt-2">Speaking: {current.practice.speaking}</p><p>Writing: {current.practice.writing}</p></div>
        </Card>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{grammarRealLifeTopics.slice(1, 10).map((topic) => <Card key={topic.id} className="p-5"><Badge variant="outline">{topic.language} · {topic.level}</Badge><h3 className="mt-3 text-xl font-black">{topic.title}</h3><p className="mt-2 text-sm text-muted-foreground">{topic.realLifeSituation}</p></Card>)}</div>
    </AppShell>
  );
}
