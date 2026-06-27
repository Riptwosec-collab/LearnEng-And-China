import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { searchVocabulary, vocabularyStats } from "@/lib/data/phase4-vocabulary";

const generatedPreview = searchVocabulary({ source: "generated_english_600", limit: 6 });
const chinesePreview = searchVocabulary({ source: "generated_chinese_600", limit: 6 });

export default function AdminVocabularyPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Admin Vocabulary" title="Vocabulary CMS" description="Preview generated vocabulary records before database CRUD is connected." />

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card className="p-5"><p className="text-sm text-muted-foreground">All vocabulary</p><p className="mt-2 text-3xl font-black">{vocabularyStats.totalWords}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">English pack</p><p className="mt-2 text-3xl font-black text-cyan-300">{vocabularyStats.generatedEnglish600}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">Chinese pack</p><p className="mt-2 text-3xl font-black text-cyan-300">{vocabularyStats.generatedChinese600}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">Source filter</p><p className="mt-2 text-sm font-bold">generated_english_600 / generated_chinese_600</p></Card>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-5">
        <select className="h-12 rounded-2xl border border-input bg-background/50 px-4 text-sm"><option>source: all</option><option>generated_english_600</option><option>generated_chinese_600</option></select>
        <select className="h-12 rounded-2xl border border-input bg-background/50 px-4 text-sm"><option>language: all</option><option>english</option><option>chinese</option></select>
        <select className="h-12 rounded-2xl border border-input bg-background/50 px-4 text-sm"><option>publish: all</option><option>published</option><option>unpublished</option></select>
        <select className="h-12 rounded-2xl border border-input bg-background/50 px-4 text-sm"><option>CEFR: all</option><option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>C1</option></select>
        <select className="h-12 rounded-2xl border border-input bg-background/50 px-4 text-sm"><option>Export selected</option><option>JSON</option><option>CSV</option></select>
      </div>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black">English generated preview</h2><Badge variant="outline">generated_english_600</Badge></div>
        <div className="grid gap-4 lg:grid-cols-2">
          {generatedPreview.map((word) => (
            <Card key={word.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{word.language} {word.cefrLevel}</p>
                  <h3 className="mt-2 text-2xl font-black">{word.word}</h3>
                  <p className="text-sm text-muted-foreground">{word.thaiMeaning}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{word.source}</p>
                </div>
                <span className="rounded-full border px-3 py-1 text-xs">{word.isPublished ? "published" : "draft"}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black">Chinese generated preview</h2><Badge variant="outline">generated_chinese_600</Badge></div>
        <div className="grid gap-4 lg:grid-cols-2">
          {chinesePreview.map((word) => (
            <Card key={word.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{word.language} {word.cefrLevel} HSK{word.hskLevel}</p>
                  <h3 className="mt-2 text-2xl font-black">{word.word}</h3>
                  <p className="text-sm text-cyan-300">{word.pinyin}</p>
                  <p className="text-sm text-muted-foreground">{word.thaiMeaning}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{word.source}</p>
                </div>
                <span className="rounded-full border px-3 py-1 text-xs">{word.isPublished ? "published" : "draft"}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
