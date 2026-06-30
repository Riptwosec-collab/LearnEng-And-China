import { getPrisma } from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export function getAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return new Set(
    raw
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export async function isAdminUser(user: { id?: string; email?: string | null }) {
  const email = (user.email ?? "").toLowerCase();
  const adminEmails = getAdminEmails();

  if (email && adminEmails.has(email)) return true;

  try {
    const profileFilters: Prisma.UserProfileWhereInput[] = [];
    if (user.id) profileFilters.push({ user: { authUserId: user.id } });
    if (email) profileFilters.push({ user: { email } });
    if (profileFilters.length === 0) return false;

    const profile = await getPrisma().userProfile.findFirst({
      where: { OR: profileFilters },
      select: { role: true }
    });

    return profile?.role === "admin";
  } catch {
    return false;
  }
}
