import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

function getSpeechProvider() {
  const selected = (process.env.AI_PROVIDER ?? "").toLowerCase();
  if (selected === "groq") return "groq";
  if (selected === "openai") return "openai";
  return process.env.GROQ_API_KEY && !process.env.OPENAI_API_KEY ? "groq" : "openai";
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(`speech-stt:${getClientIp(request)}`, 15, 60_000);
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit);

  const mock = process.env.NEXT_PUBLIC_ENABLE_MOCK_SPEECH === "true";
  const provider = getSpeechProvider();
  const apiKey = provider === "groq" ? process.env.GROQ_API_KEY : process.env.OPENAI_API_KEY;

  if (!apiKey || mock) {
    return Response.json({ mode: "mock", text: "I would like to order coffee, please.", confidence: 0.86 });
  }

  const incoming = await request.formData();
  const file = incoming.get("file");
  if (!(file instanceof File)) return Response.json({ error: "audio_file_required" }, { status: 400 });

  const form = new FormData();
  form.append("file", file);
  form.append("model", provider === "groq" ? process.env.GROQ_STT_MODEL ?? "whisper-large-v3-turbo" : process.env.OPENAI_STT_MODEL ?? "gpt-4o-mini-transcribe");

  const endpoint = provider === "groq" ? "https://api.groq.com/openai/v1/audio/transcriptions" : "https://api.openai.com/v1/audio/transcriptions";
  const result = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form
  });

  if (!result.ok) return Response.json({ error: "stt_failed", detail: await result.text() }, { status: 500 });
  return Response.json({ mode: provider, ...(await result.json()) });
}
