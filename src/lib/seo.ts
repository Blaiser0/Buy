import type { Metadata } from "next";
import type { Product } from "@/lib/db/types";

export const SITE_URL = "https://www.buyubeauty.pe";
export const SITE_NAME = "Buyú Beauty";
export const HOME_TITLE = "Buyú Beauty | Skincare Coreano y K-Beauty en Perú";
export const HOME_DESCRIPTION =
  "Descubre skincare coreano y K-Beauty en Perú con Buyú Beauty. Explora marcas reconocidas y productos de cosmética coreana para tu rutina de cuidado de la piel.";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string,
): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_PE",
      type: "website",
      ...(image ? { images: [{ url: image, alt: title }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function productImageUrl(image: string | null): string | undefined {
  if (!image) return undefined;
  try {
    const url = new URL(image, SITE_URL);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function productDescription(description: string | null): string {
  const text = (description ?? "").replace(/\s+/g, " ").trim();
  if (text.length <= 160) return text;
  const excerpt = text.slice(0, 157);
  const boundary = excerpt.lastIndexOf(" ");
  return `${excerpt.slice(0, boundary > 100 ? boundary : 157)}…`;
}

export function productJsonLd(product: Product) {
  const image = productImageUrl(product.image_url);
  const url = `${SITE_URL}/productos/${encodeURIComponent(product.id)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    productID: product.id,
    url,
    ...(image ? { image: [image] } : {}),
    ...(product.description?.trim() ? { description: product.description.trim() } : {}),
    ...(Number.isFinite(product.price) && product.price >= 0
      ? {
          offers: {
            "@type": "Offer",
            url,
            price: product.price,
            priceCurrency: "PEN",
            ...(Number.isFinite(product.stock_quantity)
              ? {
                  availability: product.stock_quantity > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                }
              : {}),
          },
        }
      : {}),
  };
}

// Escape HTML delimiters in database text before embedding it in a script.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
