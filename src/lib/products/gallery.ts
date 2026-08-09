/**
 * Extra gallery images keyed by normalized product name.
 * Falls back to the product's single image_url when no entry exists.
 */
const PRODUCT_GALLERIES: Record<string, string[]> = {
  "skin1004 madagascar centella hyalu-cica silky-fit sun stick": [
    "/skin1004-sun-stick-1.jpg",
    "/skin1004-sun-stick-2.jpg",
    "/skin1004-sun-stick-3.jpg",
    "/skin1004-sun-stick-4.jpg",
  ],
};

function normalizeName(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getProductGalleryImages(
  productName: string,
  fallbackImageUrl: string | null,
): string[] {
  const mapped = PRODUCT_GALLERIES[normalizeName(productName)];
  if (mapped?.length) return mapped;
  return fallbackImageUrl ? [fallbackImageUrl] : [];
}
