/**
 * Shared stub-page component used by routes that exist for navigation
 * purposes but aren't fully built yet (How to play, Agents, News, Contact,
 * Legal/*).
 *
 * Uses the shared PageHeader for the blue header band, then renders the
 * "coming soon" content body underneath. Replace each stub with its real
 * page when content is ready — the metadata export above already gives it
 * the right page title.
 */
import { Container } from "./Container";
import { PageHeader } from "./PageHeader";

type StubPageProps = {
  eyebrow: string;
  title: string;
  body: string;
  upcoming?: string[];
};

export function StubPage({ eyebrow, title, body, upcoming }: StubPageProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={body} />

      {upcoming && upcoming.length > 0 && (
        <section className="py-16 md:py-20">
          <Container>
            <div className="max-w-2xl rounded-2xl border border-brand-border bg-brand-paper-muted p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted mb-4">
                Coming with the next iteration
              </p>
              <ul className="space-y-3 text-sm text-brand-ink">
                {upcoming.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-brand-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
