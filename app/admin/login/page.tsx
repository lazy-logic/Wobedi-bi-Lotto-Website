/**
 * /admin/login — sign-in page.
 *
 * The form posts to /api/admin/login (route handler), which calls
 * supabase.auth.signInWithPassword and redirects on success.
 *
 * Honours ?from=<path> so middleware can redirect back to the originally
 * requested page after sign-in. Surfaces ?error=... messages from the
 * route handler inline.
 */
import Image from "next/image";
import { isSupabaseConfigured } from "@/lib/supabase-server";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const fromRaw = params.from;
  const errorRaw = params.error;
  const from = typeof fromRaw === "string" && fromRaw.startsWith("/admin") ? fromRaw : "/admin";
  const error = typeof errorRaw === "string" ? errorRaw : null;
  const configured = isSupabaseConfigured();

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-paper-sunken px-4">
      <div className="w-full max-w-sm">
        {/* Logo shown as-is on a white chip (the page sits on a dark surface). */}
        <span className="mx-auto mb-8 inline-flex items-center justify-center rounded-xl bg-white p-2 ring-1 ring-black/5">
          <Image
            src="/brand/wobedibi-logo.png"
            alt="Wobedi Bi Lotto"
            width={257}
            height={257}
            className="h-12 w-12 object-contain block"
          />
        </span>
        <div className="rounded-lg border border-brand-border bg-brand-paper p-8">
          <h1 className="font-display text-2xl text-brand-ink mb-2">Sign in</h1>
          <p className="text-sm text-brand-ink-muted mb-6">
            Restricted to the Wobedi Bi Lotto admin role.
          </p>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-md border border-brand-danger/40 bg-brand-danger/5 px-3 py-2 text-xs text-brand-danger"
            >
              {error}
            </div>
          )}

          {!configured && (
            <div
              role="alert"
              className="mb-5 rounded-md border border-brand-warning/40 bg-brand-warning/5 px-3 py-2 text-xs text-brand-ink"
            >
              Supabase env vars are not set. See <code className="code">docs/supabase-setup.md</code>.
            </div>
          )}

          <form action="/api/admin/login" method="post" className="space-y-4">
            <input type="hidden" name="from" value={from} />
            <label className="block">
              <span className="text-xs font-medium text-brand-ink-muted uppercase tracking-wider">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className="mt-1 w-full h-11 px-3 rounded-md border border-brand-border bg-brand-paper text-base focus:border-brand-primary"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-brand-ink-muted uppercase tracking-wider">
                Password
              </span>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="mt-1 w-full h-11 px-3 rounded-md border border-brand-border bg-brand-paper text-base focus:border-brand-primary"
              />
            </label>
            <button
              type="submit"
              className="w-full h-11 rounded-md bg-brand-primary text-white font-medium hover:bg-brand-primary-deep transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
