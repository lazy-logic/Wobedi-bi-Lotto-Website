-- =============================================================================
-- Lotus API sync — schema additions
--
-- The cron at /api/cron/sync-results pulls draw results from the Moovon Lotus
-- API (http://18.119.94.68/api/draw/checkDraw) and upserts them here. Two new
-- columns make that work:
--
--   games.external_event_ids  — array of Lotus eventIds owned by this game.
--                               Multi-value because Noon Rush + VAG Lotto are
--                               6 weekday events on Lotus that collapse to one
--                               game on the marketing site.
--   draws.external_id         — Lotus eventOccurrenceId as text. Unique, so
--                               the cron can ON CONFLICT upsert idempotently.
--                               Nullable: pre-existing mock draws have no
--                               upstream counterpart.
--
-- Mapping (from Lotus /events response, 2026-05-13):
--   monday-special      → 1
--   lucky-tuesday       → 2
--   mid-week            → 3
--   fortune-thursday    → 4
--   friday-bonanza      → 5
--   national-week-lotto → 6
--   sunday-aseda        → 7
--   noon-rush           → 8, 9, 10, 11, 12, 13   (Mon–Sat Noonrush events)
--   vag-lotto           → 14, 15, 16, 17, 18, 19 (Mon–Sat Morning VAG events)
-- =============================================================================

alter table games
  add column if not exists external_event_ids integer[] not null default '{}';

alter table draws
  add column if not exists external_id text unique;

-- Populate the mapping on any rows that already exist. No-op on a fresh DB
-- (seed.sql inserts these values directly).
update games set external_event_ids = array[1]                              where slug = 'monday-special';
update games set external_event_ids = array[2]                              where slug = 'lucky-tuesday';
update games set external_event_ids = array[3]                              where slug = 'mid-week';
update games set external_event_ids = array[4]                              where slug = 'fortune-thursday';
update games set external_event_ids = array[5]                              where slug = 'friday-bonanza';
update games set external_event_ids = array[6]                              where slug = 'national-week-lotto';
update games set external_event_ids = array[7]                              where slug = 'sunday-aseda';
update games set external_event_ids = array[8, 9, 10, 11, 12, 13]           where slug = 'noon-rush';
update games set external_event_ids = array[14, 15, 16, 17, 18, 19]         where slug = 'vag-lotto';
