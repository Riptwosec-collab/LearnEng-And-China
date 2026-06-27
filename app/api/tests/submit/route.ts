import { NextResponse } from "next/server";
import { scoreTestSubmission } from "@/lib/data/test-center";
import type { TestSubmissionAnswer } from "@/types";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { testId?: string; answers?: TestSubmissionAnswer[] };

  if (!body.testId) {
    return NextResponse.json({ error: "testId is required" }, { status: 400 });
  }

  try {
    const result = scoreTestSubmission({ testId: body.testId, answers: body.answers ?? [] });
    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Cannot score test" }, { status: 404 });
  }
}
