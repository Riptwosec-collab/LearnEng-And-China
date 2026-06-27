import { NextResponse } from "next/server";
import { getQuestionsForTest, getTestById } from "@/lib/data/test-center";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testId = searchParams.get("testId") ?? "placement-english-core";
  const test = getTestById(testId);

  if (!test) return NextResponse.json({ error: "Test not found" }, { status: 404 });

  const questions = getQuestionsForTest(test.id).map((item) => ({
    id: item.id,
    language: item.language,
    level: item.level,
    skill: item.skill,
    category: item.category,
    type: item.type,
    question: item.question,
    choices: item.choices ?? [],
    difficulty: item.difficulty,
    tags: item.tags,
    sourceLessonId: item.sourceLessonId
  }));

  return NextResponse.json({ data: { test, questions, startedAt: new Date().toISOString() } });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { testId?: string };
  const url = new URL(request.url);
  url.searchParams.set("testId", body.testId ?? "placement-english-core");
  return GET(new Request(url));
}
