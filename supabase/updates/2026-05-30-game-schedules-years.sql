-- =============================================================================
-- 2026-05-30 — Game catalogue corrections
--
-- Brings the live `games` rows in line with NLA's official records and the
-- redesigned /games cards:
--   * VAG Lotto + Noon Rush  → real "Mon–Sat" schedule (no more "Schedule TBC")
--   * Monday Special         → introduced_year 2005 (per nla.com.gh)
--
-- Idempotent: re-running has no further effect. Paste into the Supabase
-- Studio SQL editor (or run via psql) against the project DB.
--
-- NOTE: ball colours are NOT stored in the DB — they come from lib/games.ts
-- via mapGameRow(), so no colour update is needed here.
-- =============================================================================

-- VAG Lotto — six draws Monday through Saturday
update games
set schedule       = array['monday','tuesday','wednesday','thursday','friday','saturday'],
    schedule_label = 'Mon–Sat'
where slug = 'vag-lotto';

-- Noon Rush — six midday draws Monday through Saturday
update games
set schedule         = array['monday','tuesday','wednesday','thursday','friday','saturday'],
    schedule_label   = 'Mon–Sat',
    long_description = 'A midday-cadence game drawn Monday through Saturday — six chances around the lunchtime window.'
where slug = 'noon-rush';

-- Monday Special — introduced 2005 (NLA official)
update games
set introduced_year = 2005
where slug = 'monday-special';

-- Verify
select slug, schedule_label, introduced_year
from games
where slug in ('vag-lotto', 'noon-rush', 'monday-special')
order by slug;
