import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Routes that require the user to be logged in
const PROTECTED_PREFIXES = ["/dashboard", "/learn", "/paths", "/lessons", "/vocabulary", "/review", "/flashcards", "/speaking", "/listening", "/reading", "/writing", "/grammar", "/ai-tutor", "/progress", "/profile", "/settings", "/admin", "/placement-test", "/onboarding"];

// Routes that require admin access
const ADMIN_PREFIXES = ["/admin", "/api/admin"];

function getAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return new Set(
    raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass-through for static assets (already excluded by matcher, belt-and-suspenders)
  if (pathname.startsWith("/_next") || pathname.startsWith("/api/health")) {
    return NextResponse.next({ request });
  }

  // Refresh Supabase session tokens in cookies
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured (local dev without env), skip auth checks
  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isAdmin = ADMIN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // ── 1. Not logged in → redirect to login ────────────────────────────────
  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── 2. Admin routes → verify admin email ────────────────────────────────
  if (isAdmin && user) {
    const adminEmails = getAdminEmails();
    const email = (user.email ?? "").toLowerCase();

    if (adminEmails.size > 0 && !adminEmails.has(email)) {
      // API routes → 403 JSON
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "forbidden", message: "Admin access required." },
          { status: 403 }
        );
      }
      // Page routes → redirect home with error param
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = "/dashboard";
      homeUrl.searchParams.set("error", "forbidden");
      return NextResponse.redirect(homeUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
