import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

function getSpeechProvider() {
  const selected = (process.env.AI_PROVIDER ?? "").toLowerCase();
  if (selected === "groq") return "groq";
  if (selected === "openai") return "openai";
  return process.env.GROQ_API_KEY && !process.env.OPENAI_API_KEY ? "groq" : "openai";
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(`speech-tts:${getClientIp(request)}`, 15, 60_000);
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit);

  const mock = process.env.NEXT_PUBLIC_ENABLE_MOCK_SPEECH === "true";
  const provider = getSpeechProvider();
  const apiKey = provider === "groq" ? process.env.GROQ_API_KEY : process.env.OPENAI_API_KEY;
  const body = await request.json().catch(() => ({}));
  const text = String(body.text ?? "Hello from LinguaQuest AI.");

  if (!apiKey || mock) {
    return Response.json({ mode: "mock", text, audioUrl: null, tip: "Use browser speechSynthesis in mock mode." });
  }

  const endpoint = provider === "groq" ? "https://api.groq.com/openai/v1/audio/speech" : "https://api.openai.com/v1/audio/speech";
  const result = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(
      provider === "groq"
        ? {
            model: process.env.GROQ_TTS_MODEL ?? "playai-tts",
            voice: body.voice ?? process.env.GROQ_TTS_VOICE ?? "Fritz-PlayAI",
            input: text,
            response_format: "wav"
          }
        : { model: process.env.OPENAI_TTS_MODEL ?? "gpt-4o-mini-tts", voice: body.voice ?? "alloy", input: text }
    )
  });

  if (!result.ok) return Response.json({ error: "tts_failed", detail: await result.text() }, { status: 500 });
  const buffer = await result.arrayBuffer();
  return new Response(buffer, { headers: { "Content-Type": provider === "groq" ? "audio/wav" : "audio/mpeg", "Cache-Control": "no-store" } });
}
