import { NextResponse } from "next/server";
import { phase3Dashboard } from "@/lib/data/phase3-learning";

export async function GET() {
  return NextResponse.json({
    data: phase3Dashboard,
    meta: {
      phase: 3,
      source: "mock_phase3_learning_model",
      description: "Dashboard learning summary for progress cards, skill score, weekly plan and recommendations"
    }
  });
}
