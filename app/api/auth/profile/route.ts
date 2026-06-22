import { getOrCreateUserProfile } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getOrCreateUserProfile();
    if (!session) return Response.json({ user: null, profile: null, authenticated: false }, { status: 200 });
    return Response.json({ user: session.user, profile: session.profile, authenticated: true });
  } catch (error) {
    return Response.json({ error: "profile_unavailable", detail: String(error) }, { status: 500 });
  }
}
