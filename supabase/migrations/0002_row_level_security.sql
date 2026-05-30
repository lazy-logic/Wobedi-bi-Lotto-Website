-- =============================================================================
-- Row Level Security
--
-- Public read on published / approved rows; authenticated write everywhere
-- (the admin role). Per super prompt §5, /admin is locked to a single admin
-- role — that narrowing happens via Supabase Auth allowlist (a JWT claim or a
-- separate `admin_users` table); the policy here trusts any authenticated
-- session and assumes the auth layer enforces the allowlist.
--
-- When multi-editor support is needed, replace the broad authenticated policies
-- with role-based ones (e.g. `auth.jwt() ->> 'role' = 'admin'`).
-- =============================================================================

alter table games           enable row level security;
alter table draws           enable row level security;
alter table winning_numbers enable row level security;
alter table agents          enable row level security;
alter table posts           enable row level security;

-- ---------------------------------------------------------------------------
-- Public read policies
-- ---------------------------------------------------------------------------
create policy "public can read games"
  on games for select
  using (true);

create policy "public can read published draws"
  on draws for select
  using (published = true);

create policy "public can read winning_numbers of published draws"
  on winning_numbers for select
  using (
    exists (
      select 1 from draws
      where draws.id = winning_numbers.draw_id
        and draws.published = true
    )
  );

create policy "public can read approved agents"
  on agents for select
  using (approved = true);

create policy "public can read published posts"
  on posts for select
  using (published_at is not null and published_at <= now());

-- ---------------------------------------------------------------------------
-- Admin (authenticated) write policies
-- ---------------------------------------------------------------------------
create policy "authenticated can manage games"
  on games for all to authenticated
  using (true) with check (true);

create policy "authenticated can manage draws"
  on draws for all to authenticated
  using (true) with check (true);

create policy "authenticated can manage winning_numbers"
  on winning_numbers for all to authenticated
  using (true) with check (true);

create policy "authenticated can manage agents"
  on agents for all to authenticated
  using (true) with check (true);

create policy "authenticated can manage posts"
  on posts for all to authenticated
  using (true) with check (true);
