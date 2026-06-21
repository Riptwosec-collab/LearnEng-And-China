import { NextResponse } from "next/server";
import { learningPaths } from "@/lib/data/learning-paths";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language");
  const level = searchParams.get("level");
  const data = learningPaths
    .filter((item) => (language ? item.language === language || item.language === "mixed" : true))
    .filter((item) => (level ? item.level === level : true));

  return NextResponse.json({ data, count: data.length });
}
