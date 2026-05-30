/**
 * Moovon Lotus API client.
 *
 * One responsibility: hit `GET {LOTUS_API_BASE_URL}/draw/checkDraw` with a
 * date range and return parsed, type-safe rows. Authentication is a static
 * bearer token from `LOTUS_API_TOKEN`. Read more in the Postman collection
 * at repo root (`Lotus.postman_collection (3).json`).
 *
 * SERVER-ONLY. The Lotus token is sensitive; never import this from a
 * client component.
 *
 * Security note: the production base URL is HTTP, not HTTPS, so the token
 * travels in plaintext on every request. Pressure the Lotus team to add TLS
 * — until then this only works on trusted networks (e.g. EC2-to-EC2 within
 * the same AWS region).
 */

export type LotusCheckDrawRow = {
  eventOccurrenceId: number;
  eventId: number;
  eventNumber: string;
  eventName: string;
  gameName: string;
  eventDate: string;
  /** Comma-separated winning numbers ("23,45,67,12,89") or the string "Pending". */
  result: string;
  drawDate: string | null;
  preDraw: number | null;
  postDraw1: number | null;
  postDraw2: number | null;
  manualDraw: number | null;
  certificateUrl: string | null;
  payoutRatio: number | null;
};

type LotusCheckDrawResponse = {
  status: boolean;
  message: string;
  data: LotusCheckDrawRow[] | null;
};

export class LotusApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = "LotusApiError";
  }
}

function requireEnv(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var ${key}`);
  return v;
}

/**
 * Fetch the list of recent draws within [fromDate, toDate] (inclusive, ISO
 * YYYY-MM-DD). Returns every row Lotus knows about in that window, including
 * ones where `result === "Pending"` — the caller filters those out.
 *
 * Retries up to 3 times on transport errors (connect timeout, socket reset),
 * which we've seen on the Windows dev machine — undici flakes ~1 in 3 against
 * this server even when curl succeeds in <1s. Does NOT retry on auth or
 * status:false errors (those are stable conditions, retrying won't help).
 *
 * Throws `LotusApiError` on the final non-transient failure.
 */
export async function fetchCheckDraw(params: {
  fromDate: string;
  toDate: string;
  signal?: AbortSignal;
}): Promise<LotusCheckDrawRow[]> {
  const base = requireEnv("LOTUS_API_BASE_URL").replace(/\/+$/, "");
  const token = requireEnv("LOTUS_API_TOKEN");
  const url = `${base}/draw/checkDraw?fromDate=${encodeURIComponent(params.fromDate)}&toDate=${encodeURIComponent(params.toDate)}`;

  const MAX_ATTEMPTS = 3;
  let lastTransportError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    let res: Response;
    try {
      res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
        signal: params.signal,
      });
    } catch (err) {
      // Transport-layer failure (connect timeout, DNS, socket reset). Retry
      // with a short pause — these are usually intermittent.
      lastTransportError = err;
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((r) => setTimeout(r, 500 * attempt));
        continue;
      }
      const cause = err instanceof Error && err.cause instanceof Error ? err.cause.message : undefined;
      throw new LotusApiError(
        `Lotus checkDraw transport failure after ${MAX_ATTEMPTS} attempts${cause ? `: ${cause}` : ""}`,
        0,
        { cause, error: err instanceof Error ? err.message : String(err) },
      );
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new LotusApiError(
        `Lotus checkDraw ${res.status} ${res.statusText}`,
        res.status,
        text,
      );
    }

    const body = (await res.json()) as LotusCheckDrawResponse;
    if (!body.status) {
      throw new LotusApiError(
        `Lotus checkDraw responded with status:false — ${body.message}`,
        res.status,
        body,
      );
    }
    return body.data ?? [];
  }

  // Unreachable, but TypeScript wants it.
  throw new LotusApiError("Lotus checkDraw: exhausted retries", 0, lastTransportError);
}

// Result-state sentinels Lotus returns when a draw hasn't been drawn yet.
// The Postman doc mentions "Pending"; production actually returns "OPEN" —
// we accept either (and any future variant) by checking against this set.
const NOT_YET_DRAWN = new Set(["pending", "open"]);

/**
 * Parse the comma-separated `result` string into an int array. Returns null
 * when the draw hasn't happened yet or the string is malformed — the cron
 * treats that as "skip this row".
 */
export function parseDrawNumbers(result: string): number[] | null {
  if (!result) return null;
  const trimmed = result.trim();
  if (NOT_YET_DRAWN.has(trimmed.toLowerCase())) return null;
  const parts = trimmed.split(",").map((s) => Number.parseInt(s.trim(), 10));
  if (parts.some((n) => !Number.isFinite(n))) return null;
  return parts;
}
