import { getOpenAiClient, getTextModel } from "@/lib/ai/openai-client";

export async function runAiText(input: string, instructions: string) {
  const openai = getOpenAiClient();
  if (!openai) return null;
  const response = await openai.responses.create({
    model: getTextModel(),
    instructions,
    input
  });
  return response.output_text ?? "";
}
