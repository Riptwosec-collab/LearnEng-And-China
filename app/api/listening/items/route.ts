import { NextResponse } from "next/server";
import { listeningPracticeItems } from "@/lib/data/phase5-speaking-listening";

export async function GET() {
  return NextResponse.json({ items: listeningPracticeItems, total: listeningPracticeItems.length });
}
