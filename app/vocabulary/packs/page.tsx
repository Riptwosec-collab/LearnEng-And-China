import Link from "next/link";
import { Play, RotateCcw, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { generatedVocabularySummary } from "@/lib/data/vocabulary-seeds";

const packs = [
  {
    id: "english-600",
    title: "English 600 Essential Words",
    description: "A1-C1 vocabulary for daily life, travel, business, IT support and network engineer English.",
    count: generatedVocabularySummary.english.count,
    levels: "A1 150 · A2 150 · B1 120 · B2 100 · C1 80",
    href: "/vocabulary?source=generated_english_600",
    quizHref: "/tests",
    source: "generated_english_600",
    exportFile: "data/generated/vocabulary-english-600.json",
    progress: 0
  },
  {
    id: "chinese-600",
    title: "Chinese 600 Essential Words",
    description: "HSK 1-5 Mandarin vocabulary with Hanzi, Pinyin, Thai pronunciation, examples and mini quiz.",
    count: generatedVocabularySummary.chinese.count,
    levels: "HSK1 150 · HSK2 150 · HSK3 120 · HSK4 100 · HSK5 80",
    href: "/vocabulary?source=generated_chinese_600",
    quizHref: "/tests",
    source: "generated_chinese_600",
    exportFile: "data/generated/vocabulary-chinese-600.json",
    progress: 0
  }
];

export default function VocabularyPacksPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Vocabulary Pack" title="ชุดคำศัพท์ 600 + 600" description="เลือก pack เพื่อเริ่มเรียน ทบทวน ทำ quiz หรือ export ข้อมูลคำศัพท์ใหม่" />

      <div className="grid gap-5 lg:grid-cols-2">
        {packs.map((pack) => (
          <Card key={pack.id} className="overflow-hidden p-6">
            <Badge variant="success"><Sparkles className="size-3" /> {pack.source}</Badge>
            <h2 className="mt-4 text-3xl font-black">{pack.title}</h2>
            <p className="mt-2 text-muted-foreground">{pack.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-secondary/40 p-4"><p className="text-sm text-muted-foreground">Words</p><p className="text-3xl font-black">{pack.count}</p></div>
              <div className="rounded-2xl bg-secondary/40 p-4"><p className="text-sm text-muted-foreground">Levels</p><p className="text-sm font-bold leading-6">{pack.levels}</p></div>
            </div>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Progress</span><span>{pack.progress}%</span></div>
              <Progress value={pack.progress} />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button asChild><Link href={pack.href}><Play className="size-4" /> เริ่มเรียน</Link></Button>
              <Button asChild variant="outline"><Link href="/review"><RotateCcw className="size-4" /> ทบทวน</Link></Button>
              <Button asChild variant="outline"><Link href={pack.quizHref}>Quiz</Link></Button>
              <div className="rounded-2xl border border-border bg-secondary/30 px-4 py-3 text-xs text-muted-foreground">Export: <code className="text-cyan-300">{pack.exportFile}</code></div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
