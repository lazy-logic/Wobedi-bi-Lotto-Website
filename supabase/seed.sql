-- =============================================================================
-- Seed data for Wobedi Bi Lotto.
--
-- IDEMPOTENT — safe to re-run. ON CONFLICT clauses update existing rows
-- instead of erroring on duplicate slugs / draw numbers (which is what
-- happens with a plain INSERT after the first run).
--
-- Re-running this file:
--   * Refreshes draw_date for each draw to the latest occurrence of its
--     scheduled weekday (so dates never go stale).
--   * Updates game copy / logo paths if they've changed.
--   * Does NOT delete games or draws that exist in the DB but aren't in
--     this file. To do a hard reset, uncomment the TRUNCATE block below.
--
-- Run via the Supabase CLI:    supabase db push && psql ... -f supabase/seed.sql
-- Or paste into Studio's SQL editor.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Optional hard reset. Uncomment to wipe games + draws before re-seeding.
-- The CASCADE on draws.game_id will clear winning_numbers via the FK.
-- ---------------------------------------------------------------------------
-- truncate table draws restart identity cascade;
-- truncate table games restart identity cascade;

-- ---------------------------------------------------------------------------
-- Games (active catalogue, matches lib/games.ts)
--
-- Removed by owner 2026-04-30: 787, Atena, Caritas Lottery, Super 6,
-- plus the two USSD-only games (Lucky 3, Daywa 5/39 Direct) — the
-- marketing site no longer surfaces USSD as a play channel.
--
-- The DELETE below cleans up the legacy USSD games from databases that
-- were seeded before this change. Safe no-op on a fresh DB.
--
-- ON CONFLICT (slug) DO UPDATE so re-running refreshes the row contents.
-- ---------------------------------------------------------------------------
delete from games where slug in ('lucky-3', 'daywa-5-39-direct');


insert into games (slug, name, hook, long_description, schedule, schedule_label, channel, channel_detail, prize_structure, featured, introduced_year, sort_order, logo_url, external_event_ids) values
  ('national-week-lotto', 'National Week Lotto',
    'Ghana''s flagship game, running since December 1962.',
    'Our oldest and most patronised draw. Pick five numbers from 1 to 90 and play across the country, online, or via your local agent.',
    array['saturday'], 'Saturdays', 'standard', null, '5/90 fixed odds', true, 1962, 10, '/games/national-weekly.png', array[6]),

  ('mid-week', 'Mid Week',
    'Our second-most-popular draw, launched August 2003.',
    'A 5/90 fixed-odds game that breaks up the working week. Same simple format as Saturday''s Week Lotto, drawn every Wednesday.',
    array['wednesday'], 'Wednesdays', 'standard', null, '5/90 fixed odds', true, 2003, 20, '/games/mid-week.png', array[3]),

  ('monday-special', 'Monday Special',
    'Welcomes you back from the weekend.',
    'A fresh 5/90 fixed-odds draw to begin the week. Same trusted format, fresh chance.',
    array['monday'], 'Mondays', 'standard', null, '5/90 fixed odds', false, 2005, 30, '/games/monday-special.png', array[1]),

  ('lucky-tuesday', 'Lucky Tuesday',
    'For people with lucky numbers.',
    'A Tuesday-specific draw celebrated by players who carry their lucky numbers through the week.',
    array['tuesday'], 'Tuesdays', 'standard', null, null, false, 2007, 40, '/games/lucky-tuesday.png', array[2]),

  ('fortune-thursday', 'Fortune Thursday',
    'Designed to turn fortunes around.',
    'A 5/90 fixed-odds Thursday draw. The mid-week reset for players who didn''t catch Wednesday.',
    array['thursday'], 'Thursdays', 'standard', null, '5/90 fixed odds', false, null, 50, '/games/fortune-thursday.png', array[4]),

  ('friday-bonanza', 'Friday Bonanza',
    'Positive energy for the weekend.',
    'A Friday-evening draw built around hope and a soft start to the weekend.',
    array['friday'], 'Fridays', 'standard', null, null, false, 2007, 60, '/games/friday-bonanza.png', array[5]),

  ('sunday-aseda', 'Sunday Aseda',
    'Aseda is Twi for thanksgiving. Drawn every Sunday.',
    'A 5/90 fixed-odds draw introduced in July 2022. The name carries a reminder: this is a game of gratitude, not desperation.',
    array['sunday'], 'Sundays', 'standard', null, '5/90 fixed odds', true, 2022, 70, '/games/sunday-aseda.png', array[7]),

  ('vag-lotto', 'VAG Lotto',
    'Run with Veterans Administration Ghana since July 2019.',
    'A partnership game launched with Veterans Administration Ghana. A portion of proceeds supports veteran welfare.',
    array['monday','tuesday','wednesday','thursday','friday','saturday'], 'Mon–Sat', 'standard', null, null, false, 2019, 80, '/games/vag-lotto.png', array[14, 15, 16, 17, 18, 19]),

  ('noon-rush', 'Noon Rush',
    'A midday play.',
    'A midday-cadence game drawn Monday through Saturday — six chances around the lunchtime window.',
    array['monday','tuesday','wednesday','thursday','friday','saturday'], 'Mon–Sat', 'standard', null, null, false, null, 150, '/games/noon-rush.png', array[8, 9, 10, 11, 12, 13])

on conflict (slug) do update set
  name               = excluded.name,
  hook               = excluded.hook,
  long_description   = excluded.long_description,
  schedule           = excluded.schedule,
  schedule_label     = excluded.schedule_label,
  channel            = excluded.channel,
  channel_detail     = excluded.channel_detail,
  prize_structure    = excluded.prize_structure,
  featured           = excluded.featured,
  introduced_year    = excluded.introduced_year,
  sort_order         = excluded.sort_order,
  logo_url           = excluded.logo_url,
  external_event_ids = excluded.external_event_ids;

-- ---------------------------------------------------------------------------
-- Draws (recent winning numbers — for dev only; real data comes from the
-- ingestion pipeline once it exists, see super prompt §8 step 7).
--
-- Each game's most-recent draw uses the LAST OCCURRENCE of its scheduled
-- weekday relative to today, not arbitrary current_date - N offsets. That
-- way Mid Week never appears as drawn on a Thursday.
--
-- Postgres DOW: 0 = Sunday ... 6 = Saturday.
-- Formula:   current_date - ((extract(dow from current_date)::int - <dow> + 7) % 7)
--
-- ON CONFLICT (game_id, draw_number) DO UPDATE so re-running refreshes the
-- draw_date (always points at the latest occurrence) and the numbers.
-- ---------------------------------------------------------------------------
insert into draws (game_id, draw_number, draw_date, numbers, source) values
  -- National Week Lotto — Saturdays (dow 6)
  ((select id from games where slug = 'national-week-lotto'), 2154,
    current_date - ((extract(dow from current_date)::int - 6 + 7) % 7),
    array[12, 27, 34, 56, 78], 'nla'),
  ((select id from games where slug = 'national-week-lotto'), 2153,
    current_date - ((extract(dow from current_date)::int - 6 + 7) % 7) - 7,
    array[4, 19, 33, 47, 81], 'nla'),

  -- Mid Week — Wednesdays (dow 3)
  ((select id from games where slug = 'mid-week'),            1187,
    current_date - ((extract(dow from current_date)::int - 3 + 7) % 7),
    array[7, 18, 31, 49, 82], 'nla'),
  ((select id from games where slug = 'mid-week'),            1186,
    current_date - ((extract(dow from current_date)::int - 3 + 7) % 7) - 7,
    array[11, 23, 36, 54, 69], 'nla'),

  -- Sunday Aseda — Sundays (dow 0)
  ((select id from games where slug = 'sunday-aseda'),         198,
    current_date - ((extract(dow from current_date)::int - 0 + 7) % 7),
    array[5, 14, 29, 48, 71], 'nla'),
  ((select id from games where slug = 'sunday-aseda'),         197,
    current_date - ((extract(dow from current_date)::int - 0 + 7) % 7) - 7,
    array[16, 28, 39, 55, 80], 'nla'),

  -- Monday Special — Mondays (dow 1)
  ((select id from games where slug = 'monday-special'),      1124,
    current_date - ((extract(dow from current_date)::int - 1 + 7) % 7),
    array[10, 24, 37, 51, 70], 'nla'),

  -- Lucky Tuesday — Tuesdays (dow 2)
  ((select id from games where slug = 'lucky-tuesday'),       1320,
    current_date - ((extract(dow from current_date)::int - 2 + 7) % 7),
    array[13, 30, 45, 62, 87], 'nla'),

  -- Fortune Thursday — Thursdays (dow 4)
  ((select id from games where slug = 'fortune-thursday'),    1156,
    current_date - ((extract(dow from current_date)::int - 4 + 7) % 7),
    array[15, 22, 40, 53, 75], 'nla'),

  -- Friday Bonanza — Fridays (dow 5)
  ((select id from games where slug = 'friday-bonanza'),      1232,
    current_date - ((extract(dow from current_date)::int - 5 + 7) % 7),
    array[8, 26, 35, 50, 77], 'nla')

on conflict (game_id, draw_number) do update set
  draw_date = excluded.draw_date,
  numbers   = excluded.numbers,
  source    = excluded.source;

-- The sync_winning_numbers trigger above will populate the winning_numbers
-- table automatically — no manual insert needed here.
