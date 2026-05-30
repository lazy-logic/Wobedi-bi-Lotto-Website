/**
 * GameTileSkeleton — pulse placeholder mirroring the redesigned "draw poster"
 * GameTile geometry (colour header band with ball + game-name headline, then a
 * white body with hook + footer) so the games grid reserves layout before data
 * resolves (no CLS, no blank space).
 */
export function GameTileSkeleton() {
  return (
    <div
      aria-hidden
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-border bg-white animate-pulse"
    >
      {/* Header band */}
      <div className="bg-brand-paper-sunken px-6 pt-6 pb-7">
        <div className="flex items-center justify-between">
          <div className="w-16 h-16 rounded-full bg-brand-border" />
          <div className="h-5 w-16 rounded-full bg-brand-border" />
        </div>
        <div className="mt-5 h-7 w-32 rounded bg-brand-border" />
        <div className="mt-2 h-2.5 w-24 rounded bg-brand-border" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
        <div className="h-3.5 w-full rounded bg-brand-border" />
        <div className="mt-2 h-3.5 w-5/6 rounded bg-brand-border" />
        <div className="mt-auto pt-5 flex items-center justify-between border-t border-brand-border">
          <div className="h-3.5 w-24 rounded bg-brand-border" />
          <div className="h-4 w-14 rounded bg-brand-border" />
        </div>
      </div>
    </div>
  );
}
