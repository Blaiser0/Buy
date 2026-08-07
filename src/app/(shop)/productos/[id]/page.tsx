import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductInfoAccordion } from "@/components/products/product-info-accordion";
import { StockBadge } from "@/components/products/stock-badge";
import { buttonVariants } from "@/components/ui/button";
import { getDb } from "@/lib/db";
import {
  formatPenPrice,
  getProductDetailContent,
} from "@/lib/products/detail-content";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

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
  const sections = [
    {
      id: "beneficios",
      title: "Beneficios",
      items: details.benefits,
    },
    {
      id: "como-usar",
      title: "Cómo usar?",
      items: details.howToUse,
    },
    {
      id: "ingredientes",
      title: "Ingredientes principales",
      items: details.ingredientsFull ? undefined : details.ingredients,
      body: details.ingredientsFull,
      footnote: details.ingredientsDisclaimer,
    },
  ];

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:gap-10 sm:py-10 md:grid-cols-2 md:items-start md:gap-12 md:px-6 md:py-14">
      <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden bg-[#F8F6F0] md:max-w-none">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#2C2C2C]/40">
            Sin imagen
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <StockBadge stockQuantity={product.stock_quantity} />
          <p className="text-sm text-[#2C2C2C]/60">
            Unidades disponibles: {Math.max(product.stock_quantity, 0)}
          </p>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-[#2C2C2C] sm:text-3xl">
          {product.name}
        </h1>

        <p className="mt-3 text-2xl font-semibold text-[#E50914] sm:mt-4 sm:text-[28px]">
          {formatPenPrice(product.price)}
        </p>

        <div className="mt-6 space-y-2 border-t border-[#E8E4DA] pt-6">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#2C2C2C]/55 uppercase">
            Nota del Editor
          </p>
          <p className="text-sm leading-relaxed text-[#2C2C2C]/80 sm:text-[15px] sm:leading-7">
            {details.editorNote}
          </p>
        </div>

        <div className="mt-2">
          <ProductInfoAccordion sections={sections} />
        </div>

        <div className="mt-8">
          <Link
            href="/productos"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 w-full border-[#2C2C2C]/20 text-[#2C2C2C] hover:border-[#E50914] hover:bg-[#F8F6F0] hover:text-[#E50914] sm:w-auto sm:px-6",
            )}
          >
            Volver a la colección
          </Link>
        </div>
      </div>
    </div>
  );
}
