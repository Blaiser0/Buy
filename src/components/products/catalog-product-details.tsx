"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Eye, ShoppingBag, X } from "lucide-react";
import { useShop } from "@/components/shop/shop-provider";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildWhatsAppUrl, stockInquiryMessage } from "@/lib/checkout";
import { Dialog, DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Product } from "@/lib/db/types";
import { getProductBrand } from "@/lib/products/brands";
import { formatPenPrice } from "@/lib/products/detail-content";
import { boutiqueSans } from "@/lib/boutique-theme";
import { cn } from "@/lib/utils";

export function CatalogProductDetails({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useShop();
  const brand = getProductBrand(product);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger aria-label={`Ver detalles de ${product.name}`} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#D68C96] px-2 py-2 text-xs font-medium text-[#98535C] transition-colors hover:bg-[#F7E8EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C46F7A]">
        <Eye className="size-4 shrink-0" aria-hidden="true" /> Ver detalles
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="z-[120] bg-black/50" />
        <DialogPrimitive.Popup className={cn(boutiqueSans.className, "fixed top-1/2 left-1/2 z-[121] flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-white text-[#2C2C2C] shadow-2xl outline-none")}>
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#F0E4E5] px-4 py-3 sm:px-5">
            <DialogTitle className="self-center text-sm leading-snug font-semibold sm:text-base">{product.name}</DialogTitle>
            <DialogClose aria-label="Cerrar detalles" className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#6B5A5A] hover:bg-[#F7E8EA] focus-visible:outline-2 focus-visible:outline-[#C46F7A]">
              <X className="size-5" aria-hidden="true" />
            </DialogClose>
          </div>
          <div className="min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5">
            {product.image_url && (
              <div className="relative aspect-[4/3] max-h-[40dvh] w-full overflow-hidden rounded-lg bg-[#FEFAF9]">
                <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 672px) 90vw, 632px" className="object-contain" />
              </div>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-md bg-[#F7E8EA] px-2 py-1 font-semibold text-[#98535C]">Marca: {brand?.name ?? "Sin asignar"}</span>
              <span className="text-[#6B5A5A]">{product.category} · {product.stock_quantity > 0 ? "Disponible" : "Agotado"}</span>
            </div>
            <p className="mt-4 text-xl font-semibold text-[#C46F7A]">{formatPenPrice(product.price)}</p>
            {product.description && (
              <DialogDescription className="mt-5 whitespace-pre-wrap break-words text-sm leading-7 text-[#514547]">{product.description}</DialogDescription>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#F0E4E5] p-4 sm:px-5">
            <Link href={`/productos/${product.id}`} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#D68C96] px-4 text-sm font-semibold text-[#98535C] hover:bg-[#F7E8EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C46F7A]">Ir a la ficha del producto</Link>
            <button type="button" onClick={() => {
              setOpen(false);
              addToCart({ id: product.id, name: product.name, price: product.price, imageUrl: product.image_url }, 1);
            }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#C46F7A] px-4 text-sm font-semibold text-white hover:bg-[#AC5D68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C46F7A]">
              <ShoppingBag className="size-4" aria-hidden="true" /> Añadir al carrito
            </button>
            <a href={buildWhatsAppUrl(stockInquiryMessage(product.name, formatPenPrice(product.price)))} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-[#073B1B] transition-colors hover:bg-[#20BD5A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]">
              <WhatsAppIcon className="size-4 shrink-0" /> Consultar stock por WhatsApp
            </a>
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
