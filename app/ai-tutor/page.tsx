import { Bot, Send, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { aiPromptTemplates, aiTutorMessages, aiTutorQuickPrompts } from "@/lib/data/phase7-grammar-ai";

export default function AiTutorPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Phase 7 AI Tutor" title="AI Tutor" description="Chat UI, quick prompts, correction card, prompt templates and JSON output contract for OpenAI API." />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card className="p-5">
          <div className="space-y-4">
            {aiTutorMessages.map((message, index) => (
              <div key={index} className={`rounded-3xl p-4 ${message.role === "assistant" ? "bg-secondary/40" : "bg-cyan-300/10"}`}>
                <div className="flex items-start gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300"><Bot className="size-5" /></span>
                  <div><p className="font-bold capitalize">{message.role}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{message.content}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <Input placeholder="Ask AI Tutor..." />
            <Button size="icon"><Send className="size-4" /></Button>
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2"><Sparkles className="size-5 text-cyan-300" /><h3 className="text-xl font-black">Quick prompts</h3></div>
            <div className="mt-4 flex flex-wrap gap-2">{aiTutorQuickPrompts.map((prompt) => <Badge key={prompt} variant="outline">{prompt}</Badge>)}</div>
          </Card>
          <Card className="p-5">
            <h3 className="text-xl font-black">Prompt templates</h3>
            <div className="mt-4 space-y-3">{Object.entries(aiPromptTemplates).map(([key, value]) => <div key={key} className="rounded-2xl bg-secondary/40 p-3"><p className="font-semibold">{key}</p><p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{value.system}</p></div>)}</div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
