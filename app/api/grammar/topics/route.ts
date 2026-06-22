import { NextResponse } from "next/server";
import { grammarRealLifeTopics } from "@/lib/data/phase7-grammar-ai";

export async function GET() {
  return NextResponse.json({ topics: grammarRealLifeTopics, total: grammarRealLifeTopics.length });
}
