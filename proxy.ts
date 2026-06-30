import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { isAdminUser } from "@/lib/auth/admin";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/learn",
  "/paths",
  "/lessons",
  "/vocabulary",
  "/review",
  "/flashcards",
  "/speaking",
  "/listening",
  "/reading",
  "/writing",
  "/grammar",
  "/ai-tutor",
  "/progress",
  "/profile",
  "/settings",
  "/admin",
  "/placement-test",
  "/onboarding"
];

const ADMIN_PREFIXES = ["/admin", "/api/admin"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api/health")) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isAdminRoute = ADMIN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && user && !(await isAdminUser(user))) {
    if (pathname.startsWith("/api/")) {
      return new NextResponse(null, { status: 403 });
    }

    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/dashboard";
    homeUrl.searchParams.set("error", "forbidden");
    return NextResponse.redirect(homeUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
