import { BookmarkPlus, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { VocabularyItem } from "@/types";

export function WordCard({ word }: { word: VocabularyItem }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{word.cefrLevel}{word.hskLevel ? ` · HSK ${word.hskLevel}` : ""}</Badge>
            <Badge variant="outline">{word.partOfSpeech}</Badge>
          </div>
          <h3 className="mt-4 text-3xl font-black tracking-tight">{word.chineseHanzi ?? word.word}</h3>
          <p className="mt-1 text-sm text-cyan-300">{word.pinyin ?? word.ipa}</p>
          <p className="mt-2 text-lg font-semibold">{word.thaiMeaning}</p>
          <p className="mt-1 text-sm text-muted-foreground">คำอ่านไทย: {word.thaiPronunciation}</p>
        </div>
        <Button variant="glass" size="icon" aria-label="listen">
          <Volume2 className="size-5" />
        </Button>
      </div>

      <div className="mt-5 rounded-2xl bg-secondary/40 p-4">
        <p className="text-sm font-semibold">{word.exampleSentence}</p>
        <p className="mt-1 text-sm text-muted-foreground">{word.exampleTranslationTh}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="sm">จำแล้ว</Button>
        <Button size="sm" variant="secondary">ยังไม่จำ</Button>
        <Button size="sm" variant="glass"><BookmarkPlus className="size-4" /> Favorite</Button>
      </div>
    </Card>
  );
}
