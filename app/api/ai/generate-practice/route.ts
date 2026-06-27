import { callOpenAiJson } from "@/lib/ai/openai";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    language?: string;
    learnerLevel?: string;
    weaknessTags?: string[];
    count?: number;
  };

  const weaknessTags = body.weaknessTags?.length ? body.weaknessTags : ["be-verb", "daily-life"];
  const fallback = {
    title: "แบบฝึกเพิ่มจากจุดอ่อน",
    items: weaknessTags.slice(0, 3).map((tag, index) => ({
      id: `practice-${index + 1}`,
      prompt: `แต่งประโยคสั้น ๆ โดยใช้หัวข้อ ${tag}`,
      explanationTh: "ฝึกใช้ pattern ซ้ำในบริบทใหม่ เพื่อให้จำได้จริง"
    }))
  };

  const result = await callOpenAiJson({
    system: "Create short language practice tasks for Thai learners. Return JSON only.",
    user: {
      task: "generate_practice",
      language: body.language ?? "english",
      learnerLevel: body.learnerLevel ?? "A1",
      weaknessTags,
      count: Math.min(Number(body.count ?? 3), 5),
      replyInThai: true
    },
    fallback
  });

  return Response.json(result);
}
