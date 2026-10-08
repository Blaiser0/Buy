BEGIN;
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS logo_url text;
-- Logos use the existing public products bucket under brand-logos/.
-- Its existing admin-only write policies remain unchanged.
NOTIFY pgrst, 'reload schema';
COMMIT;
