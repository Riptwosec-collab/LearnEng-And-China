import { callOpenAiJson } from "@/lib/ai/openai";
import { aiPromptTemplates } from "@/lib/ai/prompt-templates";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(`quiz-generate:${getClientIp(request)}`, 10, 60_000);
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit);

  const body = await request.json().catch(() => ({}));
  const fallback = {
    questions: [
      { question: "Choose the best meaning of 'reservation'.", choices: ["การจอง", "การเดินทาง", "การประชุม", "ใบเสร็จ"], answer: "การจอง", explanation_th: "reservation ใช้เมื่อจองโต๊ะ ห้องพัก หรือตั๋ว" }
    ]
  };

  const result = await callOpenAiJson({
    system: "Create original language-learning quiz questions for Thai learners. Return JSON only.",
    user: {
      task: "generate_quiz",
      language: body.language ?? "english",
      learnerLevel: body.learnerLevel ?? "A1",
      topic: body.topic ?? "daily life",
      count: Math.min(Number(body.count ?? 5), 10),
      output: aiPromptTemplates.correctWriting.outputJson
    },
    fallback
  });

  return Response.json(result);
}
