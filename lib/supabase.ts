/**
 * Supabase clients.
 *
 * Two flavours:
 *  - getSupabaseServerClient()   — for Server Components & route handlers.
 *                                   Anon key only; reads honour the public RLS
 *                                   policies in 0002_row_level_security.sql.
 *  - getSupabaseServiceClient()  — for trusted server code that needs to bypass
 *                                   RLS (the results-ingest pipeline, the admin
 *                                   write paths). Uses the SERVICE_ROLE key —
 *                                   NEVER expose this to the browser.
 *
 * Env vars expected:
 *   NEXT_PUBLIC_SUPABASE_URL          — https://<project>.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY     — the anon/public key
 *   SUPABASE_SERVICE_ROLE_KEY         — the service role key (server-only!)
 *
 * NOTE: This file imports `@supabase/supabase-js`, which is not yet in
 * package.json. Add it before using:
 *   npm install @supabase/supabase-js
 *
 * For server-side auth in middleware/route handlers (e.g. /admin), use
 * @supabase/ssr instead — install when implementing the auth flow.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

let cachedServer: SupabaseClient<Database> | null = null;
let cachedService: SupabaseClient<Database> | null = null;

export function getSupabaseServerClient(): SupabaseClient<Database> {
  if (cachedServer) return cachedServer;
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anon = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  cachedServer = createClient<Database>(url, anon, {
    auth: { persistSession: false },
  });
  return cachedServer;
}

export function getSupabaseServiceClient(): SupabaseClient<Database> {
  if (cachedService) return cachedService;
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const service = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  cachedService = createClient<Database>(url, service, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedService;
}

function requireEnv(key: string): string {
  const v = process.env[key];
  if (!v) {
    throw new Error(
      `Missing env var ${key}. Add it to .env.local (see README.md "Quick start").`,
    );
  }
  return v;
}
