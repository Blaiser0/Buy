"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductPurchasePanelProps = {
  productId: string;
  productName: string;
  inStock: boolean;
};

export function ProductPurchasePanel({
  productId,
  productName,
  inStock,
}: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-2.5 lg:space-y-2">
      <div className="flex items-center gap-3">
        <span className="text-[12px] text-[#2C2C2C]/65 lg:text-[11px]">
          Cantidad:
        </span>
        <div className="inline-flex h-8 items-center overflow-hidden rounded border border-[#E0D0D2] bg-white lg:h-7">
          <button
            type="button"
            aria-label="Disminuir cantidad"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-full w-8 items-center justify-center text-[#2C2C2C] hover:bg-[#FEFAF9] disabled:opacity-40"
          >
            <Minus className="size-3" />
          </button>
          <span className="min-w-7 border-x border-[#E0D0D2] px-1 text-center text-xs font-medium tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Aumentar cantidad"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-full w-8 items-center justify-center text-[#2C2C2C] hover:bg-[#FEFAF9]"
          >
            <Plus className="size-3" />
          </button>
        </div>
      </div>

      <Link
        href={
          inStock
            ? `/contacto?producto=${encodeURIComponent(productName)}&id=${productId}&cantidad=${quantity}`
            : "/productos"
        }
        className={cn(
          "inline-flex h-11 w-full items-center justify-center gap-2 rounded-md text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors lg:h-9",
          inStock
            ? "bg-[#D68C96] text-white hover:bg-[#C97A85]"
            : "cursor-not-allowed bg-[#D68C96]/45 text-white",
        )}
        aria-disabled={!inStock}
        onClick={(e) => {
          if (!inStock) e.preventDefault();
        }}
      >
        <ShoppingBag className="size-3.5" strokeWidth={1.75} />
        {inStock ? "Añadir al carrito" : "Agotado"}
      </Link>

      <button
        type="button"
        onClick={() => setSaved((v) => !v)}
        className={cn(
          "inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[#D68C96] bg-white text-[11px] font-semibold tracking-[0.14em] text-[#D68C96] uppercase transition-colors hover:bg-[#D68C96]/8 lg:h-9",
          saved && "bg-[#FEF6F7]",
        )}
      >
        <Heart
          className={cn("size-3.5", saved && "fill-current")}
          strokeWidth={1.75}
        />
        Guardar en deseos
      </button>
    </div>
  );
}
