import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { WordCard } from "@/components/vocabulary/word-card";
import { vocabularySamples } from "@/lib/data/vocabulary";

export default function AdminVocabularyPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Admin Vocabulary" title="จัดการคำศัพท์" description="CRUD vocabulary พร้อม schema รองรับ IPA, pinyin, คำอ่านไทย, quiz, tags และ SRS metadata" />
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">{vocabularySamples.map((word) => <WordCard key={word.id} word={word} />)}</div>
    </AppShell>
  );
}
