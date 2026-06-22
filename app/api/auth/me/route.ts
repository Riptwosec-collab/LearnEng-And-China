import { getSupabaseUser, getOrCreateUserProfile } from "@/lib/auth/profile";

export async function GET() {
  const user = await getSupabaseUser();
  if (!user) return Response.json({ user: null, profile: null }, { status: 401 });
  const profile = await getOrCreateUserProfile();
  return Response.json({ user: { id: user.id, email: user.email }, profile });
}
