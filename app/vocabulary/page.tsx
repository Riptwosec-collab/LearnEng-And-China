"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { WordCard } from "@/components/vocabulary/word-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { flashcardDecks, searchVocabulary, vocabularyStats } from "@/lib/data/phase4-vocabulary";
import { useUiLanguage } from "@/lib/ui-language";

const words = searchVocabulary({ limit: 24 });

export default function VocabularyPage() {
  const { t } = useUiLanguage();
  return (
    <AppShell>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge>{t("vocabEyebrow")}</Badge>
          <h1 className="mt-3 text-4xl font-black">{t("vocabTitle")}</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">{t("vocabDesc")}</p>
        </div>
        <Button asChild variant="glass"><Link href="/flashcards">{t("vocabOpenFlashcards")}</Link></Button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card className="p-5"><p className="text-sm text-muted-foreground">{t("vocabTotal")}</p><p className="mt-2 text-3xl font-black">{vocabularyStats.totalWords}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">{t("vocabEnglish")}</p><p className="mt-2 text-3xl font-black">{vocabularyStats.englishWords}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">{t("vocabChinese")}</p><p className="mt-2 text-3xl font-black">{vocabularyStats.chineseWords}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">{t("vocabDueToday")}</p><p className="mt-2 text-3xl font-black text-cyan-300">{vocabularyStats.dueToday}</p></Card>
      </div>

      <Card className="mb-6 p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10" placeholder={t("vocabSearchPlaceholder")} />
          </div>
          <select className="h-12 rounded-2xl border border-input bg-background/50 px-4 text-sm">
            <option>{t("vocabEnglish")}</option><option>{t("vocabChinese")}</option>
          </select>
          <select className="h-12 rounded-2xl border border-input bg-background/50 px-4 text-sm">
            <option>{t("vocabAllLevels")}</option><option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>C1</option>
          </select>
        </div>
      </Card>

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {flashcardDecks.map((deck) => (
          <Card key={deck.id} className="p-5">
            <p className="text-sm font-semibold text-cyan-300">{deck.mode}</p>
            <h2 className="mt-2 text-xl font-black">{deck.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{deck.description}</p>
            <p className="mt-4 text-2xl font-black">{deck.count} {t("words")}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {words.map((word) => <Link key={word.id} href={`/vocabulary/${word.id}`}><WordCard word={word} /></Link>)}
      </div>
    </AppShell>
  );
}
