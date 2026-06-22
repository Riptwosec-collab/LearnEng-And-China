import { NextResponse } from "next/server";
import { aiPromptTemplates, getAiTutorMockReply } from "@/lib/data/phase7-grammar-ai";

export async function GET() {
  return NextResponse.json({ templates: aiPromptTemplates, mode: "mock" });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const message = body.message ?? "";
  return NextResponse.json({ reply: getAiTutorMockReply(message), templates: aiPromptTemplates, mode: "mock" });
}
