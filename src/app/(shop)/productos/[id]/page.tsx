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
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:px-6">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#F8F6F0]">
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

      <div className="space-y-6">
        <StockBadge stockQuantity={product.stock_quantity} />
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-[#2C2C2C] md:text-4xl">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-[#E50914]">
            {formatPrice(product.price)}
          </p>
        </div>
        <p className="leading-relaxed text-[#2C2C2C]/80">
          {product.description || "Sin descripción disponible."}
        </p>
        <p className="text-sm text-[#2C2C2C]/60">
          Unidades disponibles: {Math.max(product.stock_quantity, 0)}
        </p>
        <Link
          href="/productos"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-[#E50914] text-[#E50914] hover:bg-[#F8F6F0]",
          )}
        >
          Volver a la colección
        </Link>
      </div>
    </div>
  );
}
