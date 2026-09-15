import type { MetadataRoute } from "next";
import { getDb } from "@/lib/db";

const origin = "https://www.buyubeauty.pe";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "/",
    "/productos",
    "/marcas",
    "/sobre-nosotros",
    "/contacto",
    "/preguntas-frecuentes",
  ];

  const staticPages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${origin}${path}`,
  }));

  try {
    const products = await getDb().products.list();
    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${origin}/productos/${encodeURIComponent(product.id)}`,
    }));

    return [...staticPages, ...productPages];
  } catch (error) {
    console.error("[sitemap] No se pudieron cargar los productos", {
      message: error instanceof Error ? error.message : String(error),
    });
    return staticPages;
  }
}
