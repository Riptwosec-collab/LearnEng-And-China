import { NextResponse } from "next/server";
import { readingLabItems } from "@/lib/data/phase6-reading-writing";

export async function GET() {
  return NextResponse.json({ passages: readingLabItems, total: readingLabItems.length });
}
