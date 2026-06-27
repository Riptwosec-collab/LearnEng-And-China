import { callOpenAiJson } from "@/lib/ai/openai";
import { getQuestionById } from "@/lib/data/test-center";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { questionId?: string; userAnswer?: string };
  const question = body.questionId ? getQuestionById(body.questionId) : null;

  const fallback = {
    explanationTh: question?.explanationTh ?? "ดูโจทย์อีกครั้ง แล้วเทียบกับ pattern หลักของบทเรียน",
    memoryTipTh: "จำเป็นประโยคตัวอย่างสั้น ๆ และลองแต่งประโยคใหม่ 1 ประโยค",
    practice: ["ลองตอบโจทย์เดิมอีกครั้ง", "เขียนตัวอย่างใหม่ที่ใช้คำหรือ grammar เดียวกัน"]
  };

  const result = await callOpenAiJson({
    system: "You are a Thai AI tutor. Explain language quiz answers briefly in Thai. Return JSON only.",
    user: {
      task: "explain_answer",
      question: question?.question,
      expectedAnswer: question?.answer,
      userAnswer: body.userAnswer,
      explanationTh: question?.explanationTh,
      limit: "short"
    },
    fallback
  });

  return Response.json(result);
}
