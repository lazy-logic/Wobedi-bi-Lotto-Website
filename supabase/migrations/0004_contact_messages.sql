-- =============================================================================
-- contact_messages
--
-- Submissions from the public /contact form. The form POSTs to a Next.js
-- server action (app/contact/actions.ts) which validates the input and inserts
-- one row here; the /admin/messages inbox reads, marks-read, and deletes them.
--
-- This is the "MySQL table" half of a classic PHP/MySQL contact form, kept
-- entirely in-house (Postgres) — no email service, no third-party form handler.
--
-- RLS model (intentionally narrower than the other tables):
--   - the PUBLIC (anon) role may INSERT only — anyone can send a message, but
--     nobody anonymous can read, update, or delete what's been sent.
--   - the AUTHENTICATED role (the single admin) may do everything — read the
--     inbox, mark messages read, delete them.
-- This keeps the inbox private while letting the form work without auth.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- table
-- ---------------------------------------------------------------------------
create table contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  -- one of the form's subject values; kept as free text (not an enum) so the
  -- form's subject list can grow without a migration.
  subject     text not null default 'general',
  message     text not null,
  -- light triage state for the inbox.
  read        boolean not null default false,
  -- captured server-side for basic abuse triage; never shown publicly.
  ip          text,
  user_agent  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- newest-first inbox listing.
create index contact_messages_created_at_idx on contact_messages (created_at desc);
-- quick "unread only" filter.
create index contact_messages_unread_idx on contact_messages (created_at desc) where read = false;

-- shared updated_at trigger (function defined in 0001_initial_schema.sql).
create trigger contact_messages_set_updated_at
  before update on contact_messages
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table contact_messages enable row level security;

-- Public may submit, but only INSERT — never read/update/delete.
create policy "public can submit contact messages"
  on contact_messages for insert
  to anon, authenticated
  with check (true);

-- The admin (any authenticated session) manages the inbox.
create policy "authenticated can read contact messages"
  on contact_messages for select
  to authenticated
  using (true);

create policy "authenticated can update contact messages"
  on contact_messages for update
  to authenticated
  using (true) with check (true);

create policy "authenticated can delete contact messages"
  on contact_messages for delete
  to authenticated
  using (true);
