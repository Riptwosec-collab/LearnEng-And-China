import Link from "next/link";
import { Mic, RefreshCcw, Save, Waves } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { roleplayScenarios, speakingSessionMock, waveformBars } from "@/lib/data/phase5-speaking-listening";

export default function SpeakingPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Phase 5 Speaking" title="Speaking Lab" description="Record UI, waveform, transcript scoring mock, pronunciation feedback and real roleplay scenarios." />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <Card className="p-6">
          <Badge>Restaurant scenario</Badge>
          <h2 className="mt-4 text-2xl font-black">AI: What would you like to order?</h2>
          <p className="mt-2 text-muted-foreground">Target: {speakingSessionMock.targetSentence}</p>
          <div className="my-8 flex h-32 items-end justify-center gap-2 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/5 p-6">
            {waveformBars.map((height, index) => <span key={index} className="w-2 rounded-full bg-cyan-300/70" style={{ height }} />)}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg"><Mic className="size-5" /> Record</Button>
            <Button size="lg" variant="secondary"><RefreshCcw className="size-5" /> Retry</Button>
            <Button size="lg" variant="glass"><Save className="size-5" /> Save progress</Button>
          </div>
          <Card className="mt-6 bg-secondary/30 p-4"><p className="text-sm text-muted-foreground">Transcript</p><p className="mt-1 font-semibold">{speakingSessionMock.userTranscript}</p></Card>
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-black">AI Feedback</h2>
          <div className="mt-5 space-y-4">
            {Object.entries(speakingSessionMock.scores).map(([label, value]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm"><span className="capitalize">{label}</span><span>{value}%</span></div>
                <Progress value={value} />
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl bg-secondary/40 p-4 text-sm text-muted-foreground">{speakingSessionMock.feedbackTh}</div>
          <Button asChild className="mt-6 w-full" variant="glass"><Link href="/speaking/roleplay"><Waves className="size-4" /> Open Roleplay Mode</Link></Button>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {roleplayScenarios.slice(0, 8).map((scenario) => <Card key={scenario.id} className="p-5"><Badge variant="outline">{scenario.language} · {scenario.level}</Badge><h3 className="mt-3 text-lg font-black">{scenario.title}</h3><p className="mt-2 text-sm text-muted-foreground">{scenario.estimatedMinutes} min · {scenario.turns} turns</p></Card>)}
      </div>
    </AppShell>
  );
}
