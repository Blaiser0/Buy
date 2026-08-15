import type { Product } from "@/lib/db/types";
import {
  detectBrandFromProductName,
  type BrandInfo,
} from "@/lib/products/brands";
import { PRODUCT_CATEGORIES } from "@/lib/products/categories";

export function normalizeSearchQuery(query: string | null | undefined) {
  return (query ?? "").trim().replace(/\s+/g, " ");
}

export type CatalogFilters = {
  q: string;
  categoria: string;
  marca: string;
  precio: string;
  stock: string;
};

export const PRICE_RANGES = [
  { id: "0-80", label: "Hasta S/ 80", min: 0, max: 80 },
  { id: "80-120", label: "S/ 81 – S/ 120", min: 81, max: 120 },
  { id: "120-200", label: "S/ 121 – S/ 200", min: 121, max: 200 },
  { id: "200+", label: "Más de S/ 200", min: 201, max: Number.POSITIVE_INFINITY },
] as const;

export type PriceRangeId = (typeof PRICE_RANGES)[number]["id"];

export function emptyCatalogFilters(): CatalogFilters {
  return { q: "", categoria: "", marca: "", precio: "", stock: "" };
}

export function parseCatalogFilters(params: {
  q?: string | string[];
  categoria?: string | string[];
  marca?: string | string[];
  precio?: string | string[];
  stock?: string | string[];
}): CatalogFilters {
  return {
    q: normalizeSearchQuery(firstParam(params.q)),
    categoria: normalizeSearchQuery(firstParam(params.categoria)),
    marca: normalizeSearchQuery(firstParam(params.marca)).toLowerCase(),
    precio: normalizeSearchQuery(firstParam(params.precio)).toLowerCase(),
    stock: normalizeSearchQuery(firstParam(params.stock)).toLowerCase(),
  };
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function filterProductsByQuery(products: Product[], query: string) {
  const needle = normalizeSearchQuery(query).toLowerCase();
  if (!needle) return products;

  return products.filter((product) => {
    const haystack = [
      product.name,
      product.description ?? "",
      product.category,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(needle);
  });
}

export function filterProductsByCategory(
  products: Product[],
  category: string,
) {
  const needle = normalizeSearchQuery(category).toLowerCase();
  if (!needle) return products;

  return products.filter((product) =>
    product.category.toLowerCase().includes(needle),
  );
}

export function filterProductsByBrand(products: Product[], brandSlug: string) {
  const slug = normalizeSearchQuery(brandSlug).toLowerCase();
  if (!slug) return products;

  return products.filter((product) => {
    const brand = detectBrandFromProductName(product.name);
    return brand?.slug === slug;
  });
}

export function filterProductsByPrice(products: Product[], priceId: string) {
  const range = PRICE_RANGES.find((item) => item.id === priceId);
  if (!range) return products;

  return products.filter((product) => {
    if (product.price < range.min) return false;
    if (range.max === Number.POSITIVE_INFINITY) return true;
    return product.price <= range.max;
  });
}

export function filterProductsByStock(products: Product[], stock: string) {
  if (stock === "disponible") {
    return products.filter((product) => product.stock_quantity > 0);
  }
  if (stock === "agotado") {
    return products.filter((product) => product.stock_quantity <= 0);
  }
  return products;
}

export function applyCatalogFilters(
  products: Product[],
  filters: CatalogFilters,
) {
  let result = products;
  result = filterProductsByCategory(result, filters.categoria);
  result = filterProductsByBrand(result, filters.marca);
  result = filterProductsByPrice(result, filters.precio);
  result = filterProductsByStock(result, filters.stock);
  result = filterProductsByQuery(result, filters.q);
  return result;
}

export function productsSearchHref(query: string) {
  return buildProductsHref({ ...emptyCatalogFilters(), q: query });
}

export function productsCategoryHref(category: string) {
  return buildProductsHref({ ...emptyCatalogFilters(), categoria: category });
}

export function buildProductsHref(
  filters: Partial<CatalogFilters>,
  base: Partial<CatalogFilters> = {},
) {
  const next: CatalogFilters = {
    ...emptyCatalogFilters(),
    ...base,
    ...filters,
  };

  const params = new URLSearchParams();
  if (next.q) params.set("q", next.q);
  if (next.categoria) params.set("categoria", next.categoria);
  if (next.marca) params.set("marca", next.marca);
  if (next.precio) params.set("precio", next.precio);
  if (next.stock) params.set("stock", next.stock);

  const query = params.toString();
  return query ? `/productos?${query}` : "/productos";
}

export function hasActiveCatalogFilters(filters: CatalogFilters) {
  return Boolean(
    filters.q ||
      filters.categoria ||
      filters.marca ||
      filters.precio ||
      filters.stock,
  );
}

export function getAvailableBrands(products: Product[]): BrandInfo[] {
  const map = new Map<string, BrandInfo>();
  for (const product of products) {
    const brand = detectBrandFromProductName(product.name);
    if (brand && !map.has(brand.id)) {
      map.set(brand.id, brand);
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "es", { sensitivity: "base" }),
  );
}

export function getAvailableCategories(products: Product[]) {
  const counts = new Map<string, number>();
  for (const category of PRODUCT_CATEGORIES) {
    counts.set(category, 0);
  }
  for (const product of products) {
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
  }
  return PRODUCT_CATEGORIES.filter((category) => (counts.get(category) ?? 0) > 0).map(
    (category) => ({
      name: category,
      count: counts.get(category) ?? 0,
      matchKey: category.split(" ")[0] ?? category,
    }),
  );
}

export function categoryMatchesFilter(
  categoryName: string,
  filterValue: string,
) {
  const needle = normalizeSearchQuery(filterValue).toLowerCase();
  if (!needle) return false;
  return categoryName.toLowerCase().includes(needle);
}
