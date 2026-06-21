import { NextResponse } from "next/server";
import { categorySeeds, learningPathSeeds, vocabularySeeds } from "@/lib/data/phase2-dataset";
import { getLessonById } from "@/lib/data/phase3-learning";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLessonById(id);

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const path = learningPathSeeds.find((item) => item.id === lesson.pathId);
  const category = categorySeeds.find((item) => item.id === lesson.categoryId);
  const vocabulary = vocabularySeeds
    .filter((word) => word.language === lesson.language && (word.categoryId === lesson.categoryId || word.category === lesson.categoryId))
    .slice(0, 12);

  return NextResponse.json({
    data: {
      lesson,
      path,
      category,
      vocabulary
    }
  });
}
