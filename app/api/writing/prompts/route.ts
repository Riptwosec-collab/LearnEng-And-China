import { NextResponse } from "next/server";
import { writingLabPrompts } from "@/lib/data/phase6-reading-writing";

export async function GET() {
  return NextResponse.json({ prompts: writingLabPrompts, total: writingLabPrompts.length });
}
