import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(`speech-stt:${getClientIp(request)}`, 15, 60_000);
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit);

  const apiKey = process.env.OPENAI_API_KEY;
  const mock = process.env.NEXT_PUBLIC_ENABLE_MOCK_SPEECH === "true";
  if (!apiKey || mock) {
    return Response.json({ mode: "mock", text: "I would like to order coffee, please.", confidence: 0.86 });
  }

  const incoming = await request.formData();
  const file = incoming.get("file");
  if (!(file instanceof File)) return Response.json({ error: "audio_file_required" }, { status: 400 });

  const form = new FormData();
  form.append("file", file);
  form.append("model", process.env.OPENAI_STT_MODEL ?? "gpt-4o-mini-transcribe");

  const result = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form
  });

  if (!result.ok) return Response.json({ error: "stt_failed", detail: await result.text() }, { status: 500 });
  return Response.json({ mode: "openai", ...(await result.json()) });
}
