import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { vocabularyDrafts } from "@/lib/data/phase8-admin";

export default function AdminVocabularyPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Admin Vocabulary" title="Vocabulary CMS" description="Preview vocabulary records before database CRUD is connected." />
      <div className="grid gap-4 lg:grid-cols-2">
        {vocabularyDrafts.map((word) => (
          <Card key={word.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{word.language} {word.cefrLevel}</p>
                <h2 className="mt-2 text-2xl font-black">{word.word}</h2>
                <p className="text-sm text-muted-foreground">{word.thaiMeaning}</p>
              </div>
              <span className="rounded-full border px-3 py-1 text-xs">{word.cmsStatus}</span>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
