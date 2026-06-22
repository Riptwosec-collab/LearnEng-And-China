type JsonRecord = Record<string, unknown>;

type AiJsonOptions = {
  system: string;
  user: JsonRecord;
  fallback: JsonRecord;
  model?: string;
};

type Provider = "openai" | "openrouter" | "gemini";

function getProvider(): Provider {
  const selected = (process.env.AI_PROVIDER ?? "").toLowerCase();
  if (selected === "openrouter" || selected === "gemini" || selected === "openai") return selected;
  if (process.env.OPENROUTER_API_KEY) return "openrouter";
  if (process.env.GEMINI_API_KEY) return "gemini";
  return "openai";
}

function readResponseText(payload: JsonRecord) {
  const output = payload.output as Array<{ content?: Array<{ text?: string }> }> | undefined;
  return output?.flatMap((item) => item.content ?? []).map((item) => item.text ?? "").join("\n").trim() ?? "";
}

function readChatText(payload: JsonRecord) {
  const choices = payload.choices as Array<{ message?: { content?: string } }> | undefined;
  return choices?.[0]?.message?.content?.trim() ?? "";
}

function readGeminiText(payload: JsonRecord) {
  const candidates = payload.candidates as Array<{ content?: { parts?: Array<{ text?: string }> } }> | undefined;
  return candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("\n").trim() ?? "";
}

function parseJsonText(text: string, provider: string) {
  try {
    return { mode: provider, data: JSON.parse(text) as JsonRecord };
  } catch {
    return { mode: `${provider}_text`, data: { text } };
  }
}

async function callOpenAi({ system, user, fallback, model }: AiJsonOptions) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { mode: "mock", data: fallback };

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model ?? process.env.OPENAI_TEXT_MODEL ?? process.env.AI_TEXT_MODEL ?? "gpt-4.1-mini",
      instructions: system,
      input: JSON.stringify(user),
      text: { format: { type: "json_object" } },
      max_output_tokens: 900
    })
  });

  if (!response.ok) return { mode: "fallback", data: fallback, error: await response.text() };
  return parseJsonText(readResponseText((await response.json()) as JsonRecord), "openai");
}

async function callOpenRouter({ system, user, fallback, model }: AiJsonOptions) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return { mode: "mock", data: fallback };

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      "X-OpenRouter-Title": process.env.NEXT_PUBLIC_APP_NAME ?? "LinguaQuest AI"
    },
    body: JSON.stringify({
      model: model ?? process.env.OPENROUTER_TEXT_MODEL ?? process.env.AI_TEXT_MODEL ?? "google/gemini-flash-1.5",
      messages: [
        { role: "system", content: `${system}\nReturn valid JSON only.` },
        { role: "user", content: JSON.stringify(user) }
      ],
      response_format: { type: "json_object" },
      max_tokens: 900
    })
  });

  if (!response.ok) return { mode: "fallback", data: fallback, error: await response.text() };
  return parseJsonText(readChatText((await response.json()) as JsonRecord), "openrouter");
}

async function callGemini({ system, user, fallback, model }: AiJsonOptions) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { mode: "mock", data: fallback };

  const geminiModel = model ?? process.env.GEMINI_TEXT_MODEL ?? process.env.AI_TEXT_MODEL ?? "gemini-1.5-flash";
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: `${system}\nReturn valid JSON only.` }] },
      contents: [{ role: "user", parts: [{ text: JSON.stringify(user) }] }],
      generationConfig: {
        responseMimeType: "application/json",
        maxOutputTokens: 900
      }
    })
  });

  if (!response.ok) return { mode: "fallback", data: fallback, error: await response.text() };
  return parseJsonText(readGeminiText((await response.json()) as JsonRecord), "gemini");
}

export async function callOpenAiJson(options: AiJsonOptions) {
  const enabled = process.env.NEXT_PUBLIC_ENABLE_MOCK_AI !== "true";
  if (!enabled) return { mode: "mock", data: options.fallback };

  const provider = getProvider();
  if (provider === "openrouter") return callOpenRouter(options);
  if (provider === "gemini") return callGemini(options);
  return callOpenAi(options);
}
