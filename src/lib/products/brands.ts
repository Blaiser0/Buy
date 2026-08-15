import type { Product } from "@/lib/db/types";

export type BrandInfo = {
  id: string;
  name: string;
  slug: string;
  /** Optional logo under /public/brands/<slug>.png|jpg|webp */
  logoPath: string;
  searchQuery: string;
};

/**
 * Known brand matchers (order matters: longer / more specific first).
 */
const BRAND_RULES: Array<{
  id: string;
  name: string;
  slug: string;
  searchQuery: string;
  match: (normalizedName: string) => boolean;
}> = [
  {
    id: "beauty-of-joseon",
    name: "Beauty of Joseon",
    slug: "beauty-of-joseon",
    searchQuery: "Beauty of Joseon",
    match: (n) => n.includes("beauty of joseon"),
  },
  {
    id: "centellian24",
    name: "Centellian24",
    slug: "centellian24",
    searchQuery: "Centellian",
    match: (n) => n.includes("centellian"),
  },
  {
    id: "skin1004",
    name: "SKIN1004",
    slug: "skin1004",
    searchQuery: "SKIN1004",
    match: (n) => n.includes("skin1004"),
  },
  {
    id: "k-secret",
    name: "K-SECRET",
    slug: "k-secret",
    searchQuery: "K-SECRET",
    match: (n) => n.includes("k-secret") || n.includes("k secret"),
  },
  {
    id: "mixsoon",
    name: "mixsoon",
    slug: "mixsoon",
    searchQuery: "mixsoon",
    match: (n) => n.includes("mixsoon") || n.includes("pure glow essentials"),
  },
  {
    id: "tocobo",
    name: "TOCOBO",
    slug: "tocobo",
    searchQuery: "TOCOBO",
    match: (n) => n.includes("tocobo"),
  },
  {
    id: "cosrx",
    name: "COSRX",
    slug: "cosrx",
    searchQuery: "COSRX",
    match: (n) => n.includes("cosrx"),
  },
  {
    id: "celimax",
    name: "Celimax",
    slug: "celimax",
    searchQuery: "Celimax",
    match: (n) => n.includes("celimax"),
  },
  {
    id: "anua",
    name: "Anua",
    slug: "anua",
    searchQuery: "Anua",
    match: (n) => n.startsWith("anua ") || n === "anua",
  },
  {
    id: "tirtir",
    name: "TIRTIR",
    slug: "tirtir",
    searchQuery: "TIRTIR",
    match: (n) => n.includes("tirtir"),
  },
];

function normalize(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export function detectBrandFromProductName(productName: string): BrandInfo | null {
  const n = normalize(productName);
  const rule = BRAND_RULES.find((item) => item.match(n));
  if (!rule) return null;
  return {
    id: rule.id,
    name: rule.name,
    slug: rule.slug,
    logoPath: `/brands/${rule.slug}.png`,
    searchQuery: rule.searchQuery,
  };
}

export type BrandWithProducts = BrandInfo & {
  products: Product[];
  coverImage: string | null;
  productCount: number;
};

export function groupProductsByBrand(products: Product[]): BrandWithProducts[] {
  const map = new Map<string, BrandWithProducts>();

  for (const product of products) {
    const brand = detectBrandFromProductName(product.name);
    if (!brand) continue;

    const existing = map.get(brand.id);
    if (existing) {
      existing.products.push(product);
      existing.productCount += 1;
      if (!existing.coverImage && product.image_url) {
        existing.coverImage = product.image_url;
      }
    } else {
      map.set(brand.id, {
        ...brand,
        products: [product],
        coverImage: product.image_url,
        productCount: 1,
      });
    }
  }

  return Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "es", { sensitivity: "base" }),
  );
}

export function getAllKnownBrands(): BrandInfo[] {
  return BRAND_RULES.map((rule) => ({
    id: rule.id,
    name: rule.name,
    slug: rule.slug,
    logoPath: `/brands/${rule.slug}.png`,
    searchQuery: rule.searchQuery,
  }));
}
