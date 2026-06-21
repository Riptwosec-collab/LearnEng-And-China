import { AppShell } from "@/components/layout/app-shell";
import { WordCard } from "@/components/vocabulary/word-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { vocabularySamples } from "@/lib/data/vocabulary";

export default function VocabularyPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <Badge>Vocabulary 10K System</Badge>
        <h1 className="mt-3 text-4xl font-black">คลังคำศัพท์ อังกฤษ + จีน</h1>
        <p className="mt-2 text-muted-foreground">Phase 1 ใช้ mock data ก่อน Phase 2 จะต่อ Supabase PostgreSQL + Prisma + CSV import</p>
      </div>
      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <Input placeholder="ค้นหาคำศัพท์ / คำแปล / pinyin / IPA" />
        <select className="h-12 rounded-2xl border border-input bg-background/50 px-4 text-sm">
          <option>All languages</option>
          <option>English</option>
          <option>Chinese</option>
        </select>
        <select className="h-12 rounded-2xl border border-input bg-background/50 px-4 text-sm">
          <option>All levels</option>
          <option>A1</option>
          <option>A2</option>
          <option>B1</option>
          <option>B2</option>
          <option>C1</option>
        </select>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {vocabularySamples.map((word) => <WordCard key={word.id} word={word} />)}
      </div>
    </AppShell>
  );
}
