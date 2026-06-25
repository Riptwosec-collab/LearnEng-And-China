import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(`speech-tts:${getClientIp(request)}`, 15, 60_000);
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit);

  const apiKey = process.env.OPENAI_API_KEY;
  const mock = process.env.NEXT_PUBLIC_ENABLE_MOCK_SPEECH === "true";
  const body = await request.json().catch(() => ({}));
  const text = String(body.text ?? "Hello from LinguaQuest AI.");

  if (!apiKey || mock) {
    return Response.json({ mode: "mock", text, audioUrl: null, tip: "Use browser speechSynthesis in mock mode." });
  }

  const result = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: process.env.OPENAI_TTS_MODEL ?? "gpt-4o-mini-tts", voice: body.voice ?? "alloy", input: text })
  });

  if (!result.ok) return Response.json({ error: "tts_failed", detail: await result.text() }, { status: 500 });
  const buffer = await result.arrayBuffer();
  return new Response(buffer, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
}
