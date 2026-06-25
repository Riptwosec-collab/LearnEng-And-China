import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";

export async function getSupabaseUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

export async function requireSupabaseUser() {
  const user = await getSupabaseUser();
  if (!user) redirect("/auth/login");
  return user;
}

export async function getOrCreateUserProfile() {
  const authUser = await requireSupabaseUser();
  const email = authUser.email ?? `${authUser.id}@linguaquest.local`;

  const user = await prisma.user.upsert({
    where: { email },
    update: { authUserId: authUser.id },
    create: {
      authUserId: authUser.id,
      email,
      profile: {
        create: {
          displayName: authUser.user_metadata?.name ?? email.split("@")[0],
          nativeLanguage: "th"
        }
      }
    },
    include: { profile: true }
  });

  if (!user.profile) {
    return prisma.userProfile.create({
      data: { userId: user.id, displayName: email.split("@")[0], nativeLanguage: "th" }
    });
  }

  return user.profile;
}
