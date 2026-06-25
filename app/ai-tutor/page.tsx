"use client";

import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { aiPromptTemplates, aiTutorMessages, aiTutorQuickPrompts } from "@/lib/data/phase7-grammar-ai";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type AiTutorResponse = {
  mode?: string;
  data?: Record<string, unknown>;
  error?: string;
};

function readAiReply(payload: AiTutorResponse) {
  const data = payload.data ?? {};
  const directReply = data.reply ?? data.text ?? data.openingLine ?? data.meaningTh ?? data.correctedText;
  if (typeof directReply === "string" && directReply.trim()) return directReply;

  const expectedReplies = data.expectedReplies;
  if (Array.isArray(expectedReplies) && expectedReplies.length > 0) {
    return expectedReplies.map(String).join("\n");
  }

  if (payload.error) return `AI error: ${payload.error}`;
  return JSON.stringify(data, null, 2);
}

export default function AiTutorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(aiTutorMessages as ChatMessage[]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("ready");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(messageText = input) {
    const message = messageText.trim();
    if (!message || isLoading) return;

    setInput("");
    setIsLoading(true);
    setMode("sending");
    setMessages((current) => [...current, { role: "user", content: message }]);

    try {
      const response = await fetch("/api/ai-tutor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language: "english", learnerLevel: "A1", replyInThai: true })
      });

      const payload = (await response.json()) as AiTutorResponse;
      setMode(payload.mode ?? (response.ok ? "ai" : "error"));
      setMessages((current) => [...current, { role: "assistant", content: readAiReply(payload) }]);
    } catch (error) {
      setMode("error");
      setMessages((current) => [...current, { role: "assistant", content: error instanceof Error ? error.message : "Cannot connect to AI Tutor." }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppShell>
      <PageHeader eyebrow="Phase 7 AI Tutor" title="AI Tutor" description="Chat with Groq/OpenAI-compatible AI, use quick prompts, and see the provider mode after each reply." />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Badge variant="outline">Mode: {mode}</Badge>
            {isLoading ? <span className="text-sm text-muted-foreground">AI is thinking...</span> : null}
          </div>

          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`rounded-3xl p-4 ${message.role === "assistant" ? "bg-secondary/40" : "bg-cyan-300/10"}`}>
                <div className="flex items-start gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300"><Bot className="size-5" /></span>
                  <div><p className="font-bold capitalize">{message.role}</p><p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{message.content}</p></div>
                </div>
              </div>
            ))}
          </div>

          <form className="mt-5 flex gap-3" onSubmit={(event) => { event.preventDefault(); void sendMessage(); }}>
            <Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask AI Tutor..." />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}><Send className="size-4" /></Button>
          </form>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2"><Sparkles className="size-5 text-cyan-300" /><h3 className="text-xl font-black">Quick prompts</h3></div>
            <div className="mt-4 flex flex-wrap gap-2">
              {aiTutorQuickPrompts.map((prompt) => (
                <Button key={prompt} type="button" variant="outline" size="sm" onClick={() => void sendMessage(prompt)} disabled={isLoading}>{prompt}</Button>
              ))}
            </div>
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
