import { NextResponse } from "next/server";
import { scoreTestSubmission } from "@/lib/data/test-center";
import type { TestSubmissionAnswer } from "@/types";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    lessonId?: string;
    testId?: string;
    answers?: TestSubmissionAnswer[];
  };

  const result = scoreTestSubmission({
    testId: body.testId ?? "daily-challenge-english-work",
    answers: body.answers ?? []
  });

  return NextResponse.json({
    data: {
      result,
      lessonId: body.lessonId ?? null,
      reviewQuestionIds: result.recommendedReview
    }
  });
}
