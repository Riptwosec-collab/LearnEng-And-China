import { getOrCreateUserProfile } from "@/lib/auth/profile";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const profile = await getOrCreateUserProfile();
  const [words, dueReviews, recentWriting, recentSpeaking] = await Promise.all([
    prisma.userVocabularyProgress.count({ where: { userProfileId: profile.id } }),
    prisma.reviewQueue.count({ where: { userProfileId: profile.id, dueAt: { lte: new Date() } } }),
    prisma.writingSubmission.findMany({ where: { userProfileId: profile.id }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.speakingSession.findMany({ where: { userProfileId: profile.id }, orderBy: { createdAt: "desc" }, take: 5 })
  ]);

  return Response.json({ profile, summary: { words, dueReviews }, recentWriting, recentSpeaking });
}
