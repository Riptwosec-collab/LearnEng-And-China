import { NextResponse } from "next/server";
import { scoreSpeakingTranscript, speakingSessionMock } from "@/lib/data/phase5-speaking-listening";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const target = body.targetSentence ?? speakingSessionMock.targetSentence;
  const transcript = body.transcript ?? speakingSessionMock.userTranscript;
  return NextResponse.json({ result: scoreSpeakingTranscript(target, transcript), mode: "mock" });
}
