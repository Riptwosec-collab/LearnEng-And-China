import { recommendPlacementLevel } from "@/lib/data/phase11-user-progress";

export async function GET() {
  return Response.json({ score: 64, recommendedLevel: recommendPlacementLevel(64) });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({ score: 0 }));
  const score = Number(body.score ?? 0);
  return Response.json({ score, recommendedLevel: recommendPlacementLevel(score) });
}
