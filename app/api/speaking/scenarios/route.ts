import { NextResponse } from "next/server";
import { roleplayScenarios } from "@/lib/data/phase5-speaking-listening";

export async function GET() {
  return NextResponse.json({ scenarios: roleplayScenarios, total: roleplayScenarios.length });
}
