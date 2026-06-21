import { NextResponse } from "next/server";
import { learningPathSeeds } from "@/lib/data/phase2-dataset";
import { getLessonsForPath, getPathSummary } from "@/lib/data/phase3-learning";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const path = learningPathSeeds.find((item) => item.id === id);

  if (!path) {
    return NextResponse.json({ error: "Path not found" }, { status: 404 });
  }

  return NextResponse.json({
    data: {
      path,
      summary: getPathSummary(id),
      lessons: getLessonsForPath(id)
    }
  });
}
