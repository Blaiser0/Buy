import Link from "next/link";
import { notFound } from "next/navigation";
import { Playfair_Display, Montserrat } from "next/font/google";
import { Star } from "lucide-react";
import { ProductDetailSections } from "@/components/products/product-detail-sections";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductPurchasePanel } from "@/components/products/product-purchase-panel";
import { ProductTrustBadges } from "@/components/products/product-trust-badges";
import { RelatedProducts } from "@/components/products/related-products";
import { getDb } from "@/lib/db";
import {
  formatPenPrice,
  getProductDetailContent,
  getProductPitch,
  getProductTagline,
} from "@/lib/products/detail-content";
import { getProductGalleryImages } from "@/lib/products/gallery";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const productSerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-product-serif",
});

const productSans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-product-sans",
});

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const db = getDb();
  const product = await db.products.getById(id);

  if (!product) notFound();

  const details = getProductDetailContent(product);
  const allProducts = await db.products.list();
  const related = allProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 8);

  const subtitle = getProductTagline(details, product.description);
  const description = product.description?.trim() || details.editorNote;
  const pitch = getProductPitch(details, product.description);
  const galleryImages = getProductGalleryImages(
    product.name,
    product.image_url,
  );

  return (
    <div
      className={cn(
        productSerif.variable,
        productSans.variable,
        productSans.className,
        "bg-white text-[#2C2C2C]",
      )}
    >
      <div>
        <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pt-4 pb-4 sm:px-6 lg:pt-5 lg:pb-4">
          <nav
            aria-label="Breadcrumb"
            className="mb-3 shrink-0 text-[11px] text-[#8A7A76] lg:mb-4"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-[#D68C96]">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href="/productos" className="hover:text-[#D68C96]">
                  Cuidado Facial
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href="/productos" className="hover:text-[#D68C96]">
                  {product.category}
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="line-clamp-1 text-[#2C2C2C]/75">{product.name}</li>
            </ol>
          </nav>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 xl:gap-10">
            <div className="min-w-0">
              <ProductGallery name={product.name} images={galleryImages} />
            </div>

            <div className="min-w-0 lg:max-w-md">
              <h1 className="font-[family-name:var(--font-product-serif)] text-[1.7rem] leading-[1.15] font-medium tracking-tight text-[#2C2C2C] sm:text-[2rem] lg:text-[1.65rem] xl:text-[1.9rem]">
                {product.name}
              </h1>

              <p className="mt-1 line-clamp-2 text-[13px] text-[#8A7A76] lg:text-[12px]">
                {subtitle}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-0.5 text-[#D68C96]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-current" />
                  ))}
                </div>
                <span className="text-[12px] text-[#8A7A76] lg:text-[11px]">
                  4.8
                </span>
              </div>

              <p className="mt-2.5 text-[1.45rem] font-semibold tracking-tight text-[#1F1F1F] lg:text-[1.35rem]">
                {formatPenPrice(product.price)}
              </p>

              <p className="mt-2 text-[13px] leading-6 text-[#5F5552] lg:text-[12px] lg:leading-5">
                {pitch}
              </p>

              <div className="mt-4 space-y-3 lg:mt-3 lg:space-y-2.5">
                <ProductPurchasePanel
                  productId={product.id}
                  productName={product.name}
                  price={product.price}
                  imageUrl={product.image_url}
                  inStock={product.stock_quantity > 0}
                />
                <ProductTrustBadges />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-5 w-full max-w-6xl px-4 pb-3 sm:mt-6 sm:px-6 lg:mt-8 lg:pb-4">
          <ProductDetailSections description={description} details={details} />
        </div>
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
