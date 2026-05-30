/**
 * POST /api/admin/login
 *
 * Form-action target for /admin/login. Reads { email, password } from the
 * form-encoded body, signs in via Supabase Auth, and redirects to the page
 * the user was originally trying to reach (or /admin if direct).
 *
 * On error, redirects back to /admin/login?error=... — the login page
 * renders that message inline.
 */
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createRouteClient, isSupabaseConfigured } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return redirectWithError(req, "Supabase is not configured. See docs/supabase-setup.md.");
  }

  const formData = await req.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin");

  if (!email || !password) {
    return redirectWithError(req, "Email and password are required.");
  }

  const supabase = createRouteClient(await cookies());
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return redirectWithError(req, error.message);
  }

  // Only allow redirects to in-app paths.
  const target = from.startsWith("/admin") ? from : "/admin";
  return NextResponse.redirect(new URL(target, req.url));
}

function redirectWithError(req: NextRequest, message: string) {
  const url = new URL("/admin/login", req.url);
  url.searchParams.set("error", message);
  return NextResponse.redirect(url);
}
