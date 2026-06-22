import { getOrCreateUserProfile } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

function nextReview(status: string) {
  const now = Date.now();
  const days = status === "mastered" ? 21 : status === "remembered" ? 7 : status === "difficult" ? 1 : 3;
  return new Date(now + days * 24 * 60 * 60 * 1000);
}

export async function POST(request: Request) {
  try {
    const session = await getOrCreateUserProfile();
    if (!session) return Response.json({ error: "login_required" }, { status: 401 });
    const body = await request.json();
    const vocabularyId = String(body.vocabularyId ?? "");
    const status = String(body.status ?? "learning") as "new" | "learning" | "remembered" | "review" | "difficult" | "mastered";
    if (!vocabularyId) return Response.json({ error: "vocabularyId_required" }, { status: 400 });

    const progress = await prisma.userVocabularyProgress.upsert({
      where: { userProfileId_vocabularyId: { userProfileId: session.profile.id, vocabularyId } },
      update: { status, reviewCount: { increment: 1 }, lastReviewedAt: new Date(), nextReviewAt: nextReview(status) },
      create: { userProfileId: session.profile.id, vocabularyId, status, reviewCount: 1, lastReviewedAt: new Date(), nextReviewAt: nextReview(status) }
    });

    return Response.json({ progress });
  } catch (error) {
    return Response.json({ error: "progress_update_failed", detail: String(error) }, { status: 500 });
  }
}
