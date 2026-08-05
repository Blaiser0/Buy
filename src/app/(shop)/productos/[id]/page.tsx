import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StockBadge } from "@/components/products/stock-badge";
import { buttonVariants } from "@/components/ui/button";
import { getDb } from "@/lib/db";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(price);
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const db = getDb();
  const product = await db.products.getById(id);

  if (!product) notFound();

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:gap-8 sm:py-10 md:grid-cols-2 md:gap-10 md:px-6 md:py-12">
      <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-xl bg-[#F8F6F0] md:max-w-none">
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

      <div className="flex flex-col space-y-4 sm:space-y-6">
        <StockBadge stockQuantity={product.stock_quantity} />
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl font-semibold text-[#2C2C2C] sm:text-3xl md:text-4xl">
            {product.name}
          </h1>
          <p className="text-xl font-semibold text-[#E50914] sm:text-2xl">
            {formatPrice(product.price)}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-[#2C2C2C]/80 sm:text-base">
          {product.description || "Sin descripción disponible."}
        </p>
        <p className="text-sm text-[#2C2C2C]/60">
          Unidades disponibles: {Math.max(product.stock_quantity, 0)}
        </p>
        <Link
          href="/productos"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full border-[#E50914] text-[#E50914] hover:bg-[#F8F6F0] sm:w-auto",
          )}
        >
          Volver a la colección
        </Link>
      </div>
    </div>
  );
}
