/**
 * POST /api/admin/logout
 *
 * Clears the Supabase session cookie and redirects to /admin/login.
 */
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createRouteClient, isSupabaseConfigured } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  if (isSupabaseConfigured()) {
    const supabase = createRouteClient(await cookies());
    await supabase.auth.signOut();
  }
  return NextResponse.redirect(new URL("/admin/login", req.url));
}
