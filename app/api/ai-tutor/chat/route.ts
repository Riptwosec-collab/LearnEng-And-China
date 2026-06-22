import { aiPromptTemplates, getAiTutorMockReply } from "@/lib/data/phase7-grammar-ai";
import { callOpenAiJson } from "@/lib/ai/openai";

export async function GET() {
  return Response.json({ templates: aiPromptTemplates, mode: process.env.NEXT_PUBLIC_ENABLE_MOCK_AI === "true" ? "mock" : "openai-ready" });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const message = String(body.message ?? "");
  const language = body.language ?? "english";
  const learnerLevel = body.learnerLevel ?? "A1";
  const fallback = getAiTutorMockReply(message);

  const result = await callOpenAiJson({
    system: aiPromptTemplates.roleplayConversation.system,
    user: { task: "ai_tutor_chat", language, learnerLevel, message, replyInThai: true },
    fallback: { reply: fallback, thai_hint: "โหมด mock: ใส่ OPENAI_API_KEY และปิด NEXT_PUBLIC_ENABLE_MOCK_AI เพื่อใช้ AI จริง" }
  });

  return Response.json({ ...result, templates: aiPromptTemplates });
}
