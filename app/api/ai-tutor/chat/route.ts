import { aiPromptTemplates, getAiTutorMockReply } from "@/lib/data/phase7-grammar-ai";
import { callOpenAiJson } from "@/lib/ai/openai";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

export async function GET() {
  return Response.json({ templates: aiPromptTemplates, mode: process.env.NEXT_PUBLIC_ENABLE_MOCK_AI === "true" ? "mock" : "openai-ready" });
}

export async function POST(request: Request) {
  const rateLimit = await checkRateLimit(`ai-tutor-chat:${getClientIp(request)}`, 15, 60_000);
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit);

  const body = await request.json().catch(() => ({}));
  const message = String(body.message ?? "");
  const language = body.language ?? "english";
  const learnerLevel = body.learnerLevel ?? "A1";
  const fallback = getAiTutorMockReply(message);

  const result = await callOpenAiJson({
    system: aiPromptTemplates.roleplay.system,
    user: { task: "ai_tutor_chat", language, learnerLevel, message, replyInThai: true },
    fallback: { reply: fallback, thai_hint: "โหมด mock: ใส่ OPENAI_API_KEY และปิด NEXT_PUBLIC_ENABLE_MOCK_AI เพื่อใช้ AI จริง" }
  });

  return Response.json({ ...result, templates: aiPromptTemplates });
}
