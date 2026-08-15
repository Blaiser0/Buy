import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db/types";
import { CategoryBadge } from "@/components/products/category-badge";
import { StockBadge } from "@/components/products/stock-badge";
import { formatPenPrice } from "@/lib/products/detail-content";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/productos/${product.id}`}
      className="group block overflow-hidden rounded-lg bg-[#FEFAF9] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-2 text-center text-xs text-[#2C2C2C]/40 sm:text-sm">
            Sin imagen
          </div>
        )}
        <div className="absolute left-2 top-2 flex flex-col gap-1.5 sm:left-3 sm:top-3">
          <CategoryBadge category={product.category} />
          <StockBadge stockQuantity={product.stock_quantity} />
        </div>
      </div>
      <div className="space-y-1 p-3 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-[#2C2C2C] sm:text-base">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-[#D68C96] sm:text-base">
          {formatPenPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
