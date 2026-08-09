-- Add product category for storefront badges and admin filtering
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'Hidratantes';

ALTER TABLE public.products
DROP CONSTRAINT IF EXISTS products_category_check;

ALTER TABLE public.products
ADD CONSTRAINT products_category_check
CHECK (category IN (
  'Limpiadores',
  'Tónicos',
  'Sueros y Ampollas',
  'Hidratantes',
  'Protectores Solares',
  'Maquillaje'
));

CREATE INDEX IF NOT EXISTS products_category_idx ON public.products (category);
