import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db/prisma";

export async function getCurrentSupabaseUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

export async function getOrCreateUserProfile() {
  const authUser = await getCurrentSupabaseUser();
  if (!authUser?.email) return null;

  const user = await prisma.user.upsert({
    where: { email: authUser.email },
    update: { authUserId: authUser.id },
    create: { authUserId: authUser.id, email: authUser.email }
  });

  const profile = await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      displayName: authUser.user_metadata?.name ?? authUser.email.split("@")[0],
      nativeLanguage: "th",
      dailyGoalWords: 30,
      dailyGoalMinutes: 15,
      timezone: "Asia/Bangkok"
    }
  });

  return { authUser, user, profile };
}
