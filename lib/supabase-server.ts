/**
 * SSR-aware Supabase clients for server components, route handlers, and
 * middleware. Wraps @supabase/ssr so cookie reads/writes are wired correctly.
 *
 * Three flavours:
 *  - createServerClient(cookies)      — read-only cookie access (server components)
 *  - createRouteClient(cookies)       — read+write cookie access (route handlers)
 *  - createMiddlewareClient(req, res) — read+write across middleware request/response
 *
 * Each call returns a fresh client because cookies() is request-scoped — never
 * cache across requests.
 *
 * `isSupabaseConfigured()` lets callers gracefully fall back to in-memory mocks
 * when env vars aren't set. The site stays browseable without a Supabase project.
 */
import { createServerClient as createSsrServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import type { NextRequest, NextResponse } from "next/server";
import type { Database } from "./database.types";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

type CookieStoreReadOnly = {
  getAll: () => { name: string; value: string }[];
};

type CookieStoreReadWrite = CookieStoreReadOnly & {
  set: (name: string, value: string, options?: CookieOptions) => void;
};

/**
 * Server Component client. Cookie writes are no-ops by design — server
 * components can't set headers. If you need to write cookies (login/logout),
 * use a route handler with createRouteClient instead.
 */
export function createServerClient(cookieStore: CookieStoreReadOnly) {
  return createSsrServerClient<Database>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {
          // No-op in server components.
        },
      },
    },
  );
}

/**
 * Route Handler / Server Action client. Has full cookie read+write so it can
 * persist session updates from sign-in / sign-out flows.
 */
export function createRouteClient(cookieStore: CookieStoreReadWrite) {
  return createSsrServerClient<Database>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet: CookieToSet[]) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );
}

/**
 * Middleware client. Reads cookies off the request, mutates the response so
 * refreshed sessions are propagated downstream.
 */
export function createMiddlewareClient(req: NextRequest, res: NextResponse) {
  return createSsrServerClient<Database>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet: CookieToSet[]) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            res.cookies.set(name, value, options);
          });
        },
      },
    },
  );
}

/**
 * Service-role client for trusted server-only writes (cron jobs, admin scripts).
 * Bypasses RLS — NEVER expose to the browser or import from a client component.
 *
 * Distinct from the SSR clients above: no cookie wiring, no per-request session;
 * just a raw JWT-authenticated REST client keyed by SUPABASE_SERVICE_ROLE_KEY.
 */
export function createServiceClient() {
  return createClient<Database>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

function requireEnv(key: string): string {
  const v = process.env[key];
  if (!v) {
    throw new Error(
      `Missing env var ${key}. See docs/supabase-setup.md for setup steps.`,
    );
  }
  return v;
}
