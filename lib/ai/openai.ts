type JsonRecord = Record<string, unknown>;

type AiJsonOptions = {
  system: string;
  user: JsonRecord;
  fallback: JsonRecord;
  model?: string;
};

function extractText(payload: JsonRecord) {
  const output = payload.output as Array<{ content?: Array<{ text?: string }> }> | undefined;
  return output?.flatMap((item) => item.content ?? []).map((item) => item.text ?? "").join("\n").trim() ?? "";
}

export async function callOpenAiJson({ system, user, fallback, model }: AiJsonOptions) {
  const apiKey = process.env.OPENAI_API_KEY;
  const enabled = process.env.NEXT_PUBLIC_ENABLE_MOCK_AI !== "true";
  if (!apiKey || !enabled) return { mode: "mock", data: fallback };

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model ?? process.env.OPENAI_TEXT_MODEL ?? "gpt-4.1-mini",
      instructions: system,
      input: JSON.stringify(user),
      text: { format: { type: "json_object" } },
      max_output_tokens: 900
    })
  });

  if (!response.ok) return { mode: "fallback", data: fallback, error: await response.text() };
  const payload = (await response.json()) as JsonRecord;
  const text = extractText(payload);
  try {
    return { mode: "openai", data: JSON.parse(text) as JsonRecord };
  } catch {
    return { mode: "openai_text", data: { text } };
  }
}
