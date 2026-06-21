import { NextResponse } from "next/server";
import { lessonSeeds, lessonStepSeeds } from "@/lib/data/phase2-dataset";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pathId = searchParams.get("pathId");
  const language = searchParams.get("language");
  const data = lessonSeeds
    .filter((lesson) => (pathId ? lesson.pathId === pathId : true))
    .filter((lesson) => (language ? lesson.language === language : true))
    .map((lesson) => ({ ...lesson, steps: lessonStepSeeds.filter((step) => step.lessonId === lesson.id) }));

  return NextResponse.json({ data, count: data.length });
}
