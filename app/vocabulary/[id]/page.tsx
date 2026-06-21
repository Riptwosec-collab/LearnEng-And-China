import { notFound } from "next/navigation";
import { BookmarkPlus, Brain, Volume2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getVocabularyById } from "@/lib/data/phase4-vocabulary";

export default async function VocabularyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const word = getVocabularyById(id);
  if (!word) notFound();
  const title = word.chineseHanzi ?? word.word;

  return (
    <AppShell>
      <PageHeader eyebrow="Word Detail" title={title} description="Meaning, examples, progress, review schedule and AI practice actions." />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.7fr]">
        <Card className="p-6">
          <div className="flex flex-wrap gap-2">
            <Badge>{word.language}</Badge>
            <Badge variant="outline">{word.cefrLevel}{word.hskLevel ? ` · HSK ${word.hskLevel}` : ""}</Badge>
            <Badge variant="outline">{word.partOfSpeech}</Badge>
          </div>
          <h2 className="mt-5 text-5xl font-black">{title}</h2>
          <p className="mt-2 text-cyan-300">{word.pinyin ?? word.ipa}</p>
          <p className="mt-4 text-2xl font-bold">{word.thaiMeaning}</p>
          <p className="mt-1 text-muted-foreground">Thai pronunciation: {word.thaiPronunciation}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-secondary/40 p-4"><p className="text-sm text-muted-foreground">Example</p><p className="mt-2 font-semibold">{word.exampleSentence}</p><p className="mt-1 text-sm text-muted-foreground">{word.exampleTranslationTh}</p></div>
            <div className="rounded-3xl bg-secondary/40 p-4"><p className="text-sm text-muted-foreground">Daily life</p><p className="mt-2 font-semibold">{word.dailyLifeSentence}</p></div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button><Volume2 className="size-4" /> Listen</Button>
            <Button variant="secondary"><Brain className="size-4" /> AI sentence</Button>
            <Button variant="glass"><BookmarkPlus className="size-4" /> Favorite</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-2xl font-black">Memory progress</h3>
          <p className="mt-2 text-sm text-muted-foreground">Current status: {word.progressStatus}</p>
          <div className="mt-5 space-y-4">
            <div><div className="mb-2 flex justify-between text-sm"><span>Accuracy</span><span>{word.progress?.accuracy ?? 0}%</span></div><Progress value={word.progress?.accuracy ?? 0} /></div>
            <div><div className="mb-2 flex justify-between text-sm"><span>Ease factor</span><span>{word.progress?.easeFactor ?? 2.5}</span></div><Progress value={Math.min(100, ((word.progress?.easeFactor ?? 2.5) / 3) * 100)} /></div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="secondary">Again</Button>
            <Button variant="secondary">Hard</Button>
            <Button>Good</Button>
            <Button variant="glass">Easy</Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
