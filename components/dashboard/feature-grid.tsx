import { Bot, Headphones, Mic, PenLine, Repeat2, ScrollText } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  { title: "Speaking Roleplay", body: "record button, waveform, mock scoring และ AI feedback", icon: Mic },
  { title: "Listening Lab", body: "audio speed, transcript toggle, dictation และ comprehension quiz", icon: Headphones },
  { title: "Reading Lab", body: "passage, vocabulary highlight, bilingual toggle และ summary", icon: ScrollText },
  { title: "Writing Lab", body: "before/after correction, score และ natural rewrite", icon: PenLine },
  { title: "AI Tutor", body: "chat, quick prompts, explain grammar และ roleplay", icon: Bot },
  { title: "Review Queue", body: "flashcards, SRS, daily review และ weak words", icon: Repeat2 }
];

export function FeatureGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {features.map((feature) => (
        <Card key={feature.title} className="p-5">
          <span className="grid size-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300">
            <feature.icon className="size-5" />
          </span>
          <h3 className="mt-5 text-xl font-black">{feature.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.body}</p>
        </Card>
      ))}
    </div>
  );
}
