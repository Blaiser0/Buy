import type { Product } from "@/lib/db/types";

export type BrandInfo = {
  id: string;
  name: string;
  slug: string;
  logoPath: string;
  /** Product photo shown under the logo: /brands/<slug>_prod.png */
  productImagePath: string;
  searchQuery: string;
  tagline: string;
  description: string;
  accent: string;
};

/**
 * Known brand matchers (order matters: longer / more specific first).
 */
const BRAND_RULES: Array<{
  id: string;
  name: string;
  slug: string;
  searchQuery: string;
  tagline: string;
  description: string;
  accent: string;
  match: (normalizedName: string) => boolean;
}> = [
  {
    id: "beauty-of-joseon",
    name: "Beauty of Joseon",
    slug: "beauty-of-joseon",
    searchQuery: "Beauty of Joseon",
    tagline: "Tradición coreana",
    description:
      "Fórmulas inspiradas en la dinastía Joseon: arroz, ginseng y protectores con glow natural.",
    accent: "#F7E8EA",
    match: (n) => n.includes("beauty of joseon"),
  },
  {
    id: "centellian24",
    name: "Centellian24",
    slug: "centellian24",
    searchQuery: "Centellian",
    tagline: "Madeca care",
    description:
      "Cuidado clínico con centella y activos Madeca para calmar, recuperar y luminosidad.",
    accent: "#FCE8EC",
    match: (n) => n.includes("centellian"),
  },
  {
    id: "skin1004",
    name: "SKIN1004",
    slug: "skin1004",
    searchQuery: "SKIN1004",
    tagline: "Madagascar Centella",
    description:
      "Skincare angelical con centella de Madagascar: ampoules, toners y sun care suaves.",
    accent: "#F3DDE1",
    match: (n) => n.includes("skin1004"),
  },
  {
    id: "k-secret",
    name: "K-SECRET",
    slug: "k-secret",
    searchQuery: "K-SECRET",
    tagline: "Seoul 1988",
    description:
      "Activos potentes con estética Seúl: serums y tratamientos con carácter.",
    accent: "#FAD9DF",
    match: (n) => n.includes("k-secret") || n.includes("k secret"),
  },
  {
    id: "mixsoon",
    name: "mixsoon",
    slug: "mixsoon",
    searchQuery: "mixsoon",
    tagline: "Bean & botanicals",
    description:
      "Texturas ligeras y botánicos coreanos para hidratar sin sensación pesada.",
    accent: "#FEF0F2",
    match: (n) => n.includes("mixsoon") || n.includes("pure glow essentials"),
  },
  {
    id: "tocobo",
    name: "TOCOBO",
    slug: "tocobo",
    searchQuery: "TOCOBO",
    tagline: "Vibe moderno",
    description:
      "Sun sticks, cleansers y cremas con packaging vibrante y fórmulas diarias.",
    accent: "#F8E4E8",
    match: (n) => n.includes("tocobo"),
  },
  {
    id: "cosrx",
    name: "COSRX",
    slug: "cosrx",
    searchQuery: "COSRX",
    tagline: "Cosmetics + RX",
    description:
      "Esenciales clínicos como Snail Mucin: eficacia clara, rutinas simples.",
    accent: "#F6E6E9",
    match: (n) => n.includes("cosrx"),
  },
  {
    id: "celimax",
    name: "Celimax",
    slug: "celimax",
    searchQuery: "Celimax",
    tagline: "Pore & glow",
    description:
      "Cuidado de poros e iluminación con texturas frescas y acabados limpios.",
    accent: "#FCEEF1",
    match: (n) => n.includes("celimax"),
  },
  {
    id: "anua",
    name: "Anua",
    slug: "anua",
    searchQuery: "Anua",
    tagline: "Heartleaf calm",
    description:
      "Heartleaf, niacinamida y barreras suaves para piel sensible y glow calmo.",
    accent: "#F4DCE1",
    match: (n) => n.startsWith("anua ") || n === "anua",
  },
  {
    id: "tirtir",
    name: "TIRTIR",
    slug: "tirtir",
    searchQuery: "TIRTIR",
    tagline: "Mask Fit glow",
    description:
      "Maquillaje K-Beauty icónico: cushions y bases con cobertura luminosa.",
    accent: "#F9D5DB",
    match: (n) => n.includes("tirtir"),
  },
];

function normalize(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function toBrandInfo(
  rule: (typeof BRAND_RULES)[number],
): BrandInfo {
  return {
    id: rule.id,
    name: rule.name,
    slug: rule.slug,
    logoPath: `/brands/${rule.slug}.png`,
    productImagePath: `/brands/${rule.slug}_prod.png`,
    searchQuery: rule.searchQuery,
    tagline: rule.tagline,
    description: rule.description,
    accent: rule.accent,
  };
}

export function detectBrandFromProductName(productName: string): BrandInfo | null {
  const n = normalize(productName);
  const rule = BRAND_RULES.find((item) => item.match(n));
  if (!rule) return null;
  return toBrandInfo(rule);
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
  return BRAND_RULES.map(toBrandInfo);
}
