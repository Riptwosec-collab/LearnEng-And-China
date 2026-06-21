import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { WordCard } from "@/components/vocabulary/word-card";
import { vocabularySamples } from "@/lib/data/vocabulary";

export default async function VocabularyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const word = vocabularySamples.find((item) => item.id === id);
  if (!word) notFound();

  return (
    <AppShell>
      <PageHeader eyebrow="Word Detail" title={word.chineseHanzi ?? word.word} description="หน้ารายละเอียดคำศัพท์พร้อมตัวอย่าง ประโยคจริง ปุ่มฟังเสียง และ progress action" />
      <WordCard word={word} />
    </AppShell>
  );
}
