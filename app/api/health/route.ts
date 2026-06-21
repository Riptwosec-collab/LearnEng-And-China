import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "LinguaQuest AI",
    phase: "Phase 1 Project Setup",
    timestamp: new Date().toISOString()
  });
}
