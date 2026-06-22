import { aiPromptTemplates } from "@/lib/ai/prompt-templates";
import { callOpenAiJson } from "@/lib/ai/openai";
import { scoreWritingPreview } from "@/lib/data/phase6-reading-writing";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const text = String(body.text ?? "");
  const language = body.language ?? "english";
  const learnerLevel = body.learnerLevel ?? "A1";
  const desiredTone = body.desiredTone ?? "polite";
  const fallback = scoreWritingPreview(text);

  const result = await callOpenAiJson({
    system: aiPromptTemplates.correctWriting.system,
    user: { language, learnerLevel, desiredTone, text },
    fallback: { result: fallback }
  });

  return Response.json(result);
}
