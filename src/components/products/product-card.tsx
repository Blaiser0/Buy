import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db/types";
import { StockBadge } from "@/components/products/stock-badge";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/productos/${product.id}`}
      className="group block overflow-hidden rounded-xl bg-[#F8F6F0] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#2C2C2C]/40">
            Sin imagen
          </div>
        )}
        <div className="absolute left-3 top-3">
          <StockBadge stockQuantity={product.stock_quantity} />
        </div>
      </div>
      <div className="space-y-1 p-4">
        <h3 className="line-clamp-2 text-base font-medium text-[#2C2C2C]">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-[#E50914]">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
