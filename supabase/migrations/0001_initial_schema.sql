-- =============================================================================
-- Initial schema for Wobedi Bi Lotto website
--
-- Tables (per super prompt §5/§6):
--   games            — catalogue of NLA-licensed draws
--   draws            — one row per draw event (date, number, the numbers themselves)
--   winning_numbers  — normalised one-row-per-ball (analytics queries)
--   agents           — approved Accra agents for the locator
--   posts            — news / charity-impact / winners' blog posts
--
-- Design notes:
--   - draws.numbers and bonus_numbers stay as int[] columns so the UI can render
--     a draw in one query. The winning_numbers table mirrors this in normalised
--     form for analytics ("how often did 42 appear?"). A trigger keeps them in
--     sync, so writers only insert into draws.
--   - All tables get an updated_at trigger via the shared set_updated_at function.
--   - RLS is enabled in 0002_row_level_security.sql.
-- =============================================================================

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- Helper: updated_at trigger, reused on every table
-- ---------------------------------------------------------------------------
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- games
-- ---------------------------------------------------------------------------
create table games (
  id              uuid primary key default uuid_generate_v4(),
  slug            text not null unique,
  name            text not null,
  hook            text not null,
  long_description text not null,
  -- schedule is an array of day names ("monday" .. "sunday", "daily") matching
  -- the union type in lib/games.ts. Empty array means "schedule TBC".
  schedule        text[] not null default '{}',
  schedule_label  text not null,
  draw_time       text,
  price_ghs       numeric(10, 2),
  channel         text not null check (channel in ('standard', 'ussd', 'pos')),
  channel_detail  text,
  prize_structure text,
  featured        boolean not null default false,
  introduced_year integer,
  logo_url        text,
  sort_order      integer not null default 100,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index games_featured_idx on games (featured) where featured = true;
create index games_sort_order_idx on games (sort_order);

create trigger games_updated_at
  before update on games
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- draws
-- ---------------------------------------------------------------------------
create table draws (
  id            uuid primary key default uuid_generate_v4(),
  game_id       uuid not null references games(id) on delete cascade,
  draw_number   integer not null,
  draw_date     date not null,
  drawn_at      timestamptz,
  numbers       integer[] not null,
  bonus_numbers integer[] not null default '{}',
  source        text not null default 'nla' check (source in ('nla', 'manual', 'admin')),
  -- `published` lets the admin stage a draw before it's visible publicly.
  -- Public RLS policy below filters by this flag.
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  -- One canonical (game, draw_number) pair — prevents duplicate ingest from the pipeline.
  unique (game_id, draw_number)
);

create index draws_game_date_idx       on draws (game_id, draw_date desc);
create index draws_published_date_idx  on draws (draw_date desc) where published = true;

create trigger draws_updated_at
  before update on draws
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- winning_numbers (normalised, kept in sync via trigger)
-- ---------------------------------------------------------------------------
create table winning_numbers (
  draw_id   uuid not null references draws(id) on delete cascade,
  position  integer not null,
  value     integer not null,
  is_bonus  boolean not null default false,
  primary key (draw_id, position, is_bonus)
);

create index winning_numbers_value_idx on winning_numbers (value);

-- Sync trigger: when a draw is inserted or its numbers/bonus_numbers change,
-- rebuild the per-ball rows.
create or replace function sync_winning_numbers() returns trigger as $$
begin
  delete from winning_numbers where draw_id = new.id;

  insert into winning_numbers (draw_id, position, value, is_bonus)
    select new.id, ord::int, val, false
    from unnest(new.numbers) with ordinality as t(val, ord);

  if array_length(new.bonus_numbers, 1) > 0 then
    insert into winning_numbers (draw_id, position, value, is_bonus)
      select new.id, ord::int, val, true
      from unnest(new.bonus_numbers) with ordinality as t(val, ord);
  end if;

  return new;
end;
$$ language plpgsql;

create trigger draws_sync_winning_numbers
  after insert or update of numbers, bonus_numbers on draws
  for each row execute function sync_winning_numbers();

-- ---------------------------------------------------------------------------
-- agents
-- ---------------------------------------------------------------------------
create table agents (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  area        text not null,
  address     text not null,
  phone       text,
  -- Opening hours as a JSON object keyed by day, e.g. { "mon": "08:00-20:00", ... }
  hours_json  jsonb,
  lat         numeric(10, 7),
  lng         numeric(10, 7),
  approved    boolean not null default true,
  sort_order  integer not null default 100,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index agents_area_idx on agents (area) where approved = true;
create index agents_approved_idx on agents (approved);

create trigger agents_updated_at
  before update on agents
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- posts (news / charity / winners)
-- ---------------------------------------------------------------------------
create table posts (
  id              uuid primary key default uuid_generate_v4(),
  slug            text not null unique,
  title           text not null,
  excerpt         text not null,
  body_mdx        text not null,
  hero_image_url  text,
  category        text not null check (category in ('charity', 'winners', 'company')),
  -- Null `published_at` = draft. Public RLS only reveals rows where this is set
  -- AND in the past, so authors can schedule posts.
  published_at    timestamptz,
  author_id       uuid references auth.users(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index posts_category_published_idx on posts (category, published_at desc) where published_at is not null;

create trigger posts_updated_at
  before update on posts
  for each row execute function set_updated_at();
