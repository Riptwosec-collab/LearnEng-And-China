import { Bot, Mic } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { roleplayScenarios } from "@/lib/data/phase5-speaking-listening";

export default function RoleplayPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="AI Roleplay" title="เลือกสถานการณ์จริงแล้วฝึกพูด" description="Each scenario has AI role, opening line, target phrases, scoring rubric and save-progress-ready structure." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roleplayScenarios.map((scenario) => (
          <Card key={scenario.id} className="p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300"><Bot className="size-5" /></span>
              <div><h2 className="text-xl font-black">{scenario.title}</h2><p className="text-sm text-muted-foreground">{scenario.language} · {scenario.level}</p></div>
            </div>
            <div className="mt-4 rounded-2xl bg-secondary/40 p-3 text-sm text-muted-foreground">AI: {scenario.openingLine}</div>
            <div className="mt-4 flex flex-wrap gap-2">{scenario.targetPhrases.map((phrase) => <Badge key={phrase} variant="outline">{phrase}</Badge>)}</div>
            <Button className="mt-5 w-full"><Mic className="size-4" /> Start roleplay</Button>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
