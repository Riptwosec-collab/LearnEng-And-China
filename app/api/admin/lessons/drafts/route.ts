import { lessonDrafts } from "@/lib/data/phase8-admin";

export async function GET() {
  return Response.json({ lessonDrafts });
}
