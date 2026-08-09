export const PRODUCT_CATEGORIES = [
  "Limpiadores",
  "Tónicos",
  "Sueros y Ampollas",
  "Hidratantes",
  "Protectores Solares",
  "Maquillaje",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export function isProductCategory(value: string): value is ProductCategory {
  return (PRODUCT_CATEGORIES as readonly string[]).includes(value);
}
