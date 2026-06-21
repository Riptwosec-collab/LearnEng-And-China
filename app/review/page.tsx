import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ReviewPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Review & Memory" title="ทบทวนคำศัพท์แบบ Spaced Repetition" description="Flashcards, Daily Review, Weekly Review, คำที่ลืมบ่อย และ next review date" />
      <Card className="mx-auto max-w-xl p-6 text-center">
        <p className="text-sm text-muted-foreground">Flashcard</p>
        <h2 className="mt-3 text-5xl font-black">reservation</h2>
        <p className="mt-2 text-cyan-300">/ˌrezərˈveɪʃən/</p>
        <Progress value={62} className="mt-6" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Button variant="secondary">Again</Button>
          <Button variant="secondary">Hard</Button>
          <Button>Good</Button>
          <Button variant="glass">Easy</Button>
        </div>
      </Card>
    </AppShell>
  );
}
