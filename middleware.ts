/**
 * Edge middleware — runs before every matched request.
 *
 * Two responsibilities:
 *   1. Refresh the Supabase session cookie on every request so server components
 *      see an up-to-date auth state. This is REQUIRED by @supabase/ssr.
 *   2. Gate /admin/* behind an authenticated session. Unauthed → /admin/login.
 *
 * The matcher excludes Next.js internals + static assets so this runs on actual
 * page/route requests only.
 */
import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase-server";
import { isSupabaseConfigured } from "@/lib/supabase-server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // If Supabase isn't configured yet, skip the auth gate so the rest of the
  // site stays browseable. Admin routes will work without auth — fine for
  // local exploration; do NOT deploy without configuring Supabase first.
  if (!isSupabaseConfigured()) return res;

  const supabase = createMiddlewareClient(req, res);
  const { data: { user } } = await supabase.auth.getUser();

  const isAdminPath = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPath = req.nextUrl.pathname === "/admin/login";

  if (isAdminPath && !isLoginPath && !user) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (isLoginPath && user) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.searchParams.delete("from");
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: [
    // Run on everything except Next internals and static files.
    "/((?!_next/static|_next/image|favicon.ico|brand|app-screenshot|inspiration|.*\\.(?:png|jpg|jpeg|svg|webp|avif)$).*)",
  ],
};
