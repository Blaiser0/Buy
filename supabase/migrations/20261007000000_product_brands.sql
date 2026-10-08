BEGIN;

CREATE TABLE IF NOT EXISTS public.brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 80),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS brands_name_unique
  ON public.brands (lower(regexp_replace(btrim(name), '\s+', ' ', 'g')));

-- Seed and assign existing products only the first time the relationship is added.
-- Re-running this migration never overwrites an administrator's brand choices.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'brand_id') THEN
    ALTER TABLE public.products ADD COLUMN brand_id uuid
      REFERENCES public.brands(id) ON DELETE RESTRICT;
    INSERT INTO public.brands (name, slug) VALUES
      ('Beauty of Joseon', 'beauty-of-joseon'), ('Centellian24', 'centellian24'),
      ('SKIN1004', 'skin1004'), ('K-SECRET', 'k-secret'), ('mixsoon', 'mixsoon'),
      ('TOCOBO', 'tocobo'), ('COSRX', 'cosrx'), ('Celimax', 'celimax'),
      ('Anua', 'anua'), ('TIRTIR', 'tirtir'), ('TONYMOLY', 'tonymoly')
    ON CONFLICT DO NOTHING;

    -- One-time migration of known identities; runtime filtering never reads names.
    WITH classified AS (
      SELECT id, CASE
        WHEN n LIKE '%beauty of joseon%' THEN 'beauty-of-joseon'
        WHEN n LIKE '%centellian%' THEN 'centellian24'
        WHEN n ~ 'skin\s*1004' THEN 'skin1004'
        WHEN n LIKE '%k-secret%' OR n LIKE '%k secret%' THEN 'k-secret'
        WHEN n LIKE '%mixsoon%' OR n LIKE '%pure glow essentials%' THEN 'mixsoon'
        WHEN n LIKE '%tocobo%' THEN 'tocobo'
        WHEN n LIKE '%cosrx%' THEN 'cosrx'
        WHEN n LIKE '%celimax%' THEN 'celimax'
        WHEN n LIKE 'anua %' OR n = 'anua' THEN 'anua'
        WHEN n LIKE '%tirtir%' THEN 'tirtir'
        WHEN n LIKE '%tonymoly%' THEN 'tonymoly'
      END AS slug
      FROM (SELECT id, lower(regexp_replace(btrim(name), '\s+', ' ', 'g')) AS n FROM public.products) names
    )
    UPDATE public.products p SET brand_id = b.id
      FROM classified c JOIN public.brands b ON b.slug = c.slug
      WHERE p.id = c.id AND p.brand_id IS NULL;
  END IF;
END $$;
CREATE INDEX IF NOT EXISTS products_brand_id_idx ON public.products(brand_id);

ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.brands TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.brands TO authenticated;
DROP POLICY IF EXISTS "Read visible brands" ON public.brands;
CREATE POLICY "Read visible brands" ON public.brands FOR SELECT TO anon, authenticated
  USING (is_visible OR public.is_admin());
DROP POLICY IF EXISTS "Admins manage brands" ON public.brands;
CREATE POLICY "Admins manage brands" ON public.brands FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Hiding a brand hides its products without altering product.is_visible.
-- Existing product visibility policies continue to apply independently.
DROP POLICY IF EXISTS "Hidden brands require admin" ON public.products;
CREATE POLICY "Hidden brands require admin" ON public.products AS RESTRICTIVE
  FOR SELECT TO anon, authenticated USING (
    public.is_admin() OR brand_id IS NULL OR EXISTS (
      SELECT 1 FROM public.brands b WHERE b.id = brand_id AND b.is_visible
    )
  );

NOTIFY pgrst, 'reload schema';
COMMIT;
