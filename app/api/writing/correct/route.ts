import { NextResponse } from "next/server";
import { scoreWritingPreview } from "@/lib/data/phase6-reading-writing";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const text = body.text ?? "";
  return NextResponse.json({ result: scoreWritingPreview(text), mode: "mock" });
}
