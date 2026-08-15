"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { formatPenPrice } from "@/lib/products/detail-content";
import { cn } from "@/lib/utils";
import { boutique, boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";
import { useShop, type ShopItem } from "@/components/shop/shop-provider";

function DrawerShell({
  open,
  title,
  onClose,
  children,
  footer,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Cerrar panel"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[60] bg-black/25 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          boutiqueSans.className,
          "fixed top-0 right-0 z-[70] flex h-dvh w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-[#F0E4E5] px-5 py-4">
          <h2
            className={cn(
              boutiqueSerif.className,
              "text-xl font-semibold text-[#2C2C2C]",
            )}
          >
            {title}
          </h2>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="rounded-full p-1.5 text-[#2C2C2C]/70 hover:bg-[#FEFAF9] hover:text-[#D68C96]"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer ? (
          <div className="border-t border-[#F0E4E5] px-5 py-4">{footer}</div>
        ) : null}
      </aside>
    </>
  );
}

function ItemRow({
  item,
  mode,
}: {
  item: ShopItem;
  mode: "cart" | "wishlist";
}) {
  const {
    removeFromCart,
    updateCartQuantity,
    toggleWishlist,
    addToCart,
    setWishlistOpen,
  } = useShop();

  return (
    <div className="flex gap-3 border-b border-[#F0E4E5] py-4 last:border-b-0">
      <Link
        href={`/productos/${item.id}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-md bg-[#FEFAF9]"
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : null}
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          href={`/productos/${item.id}`}
          className="line-clamp-2 text-sm font-medium text-[#2C2C2C] hover:text-[#D68C96]"
        >
          {item.name}
        </Link>
        <p className="mt-1 text-sm font-semibold text-[#D68C96]">
          {formatPenPrice(item.price)}
        </p>

        {mode === "cart" ? (
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="inline-flex h-8 items-center overflow-hidden rounded border border-[#EAD6D8]">
              <button
                type="button"
                aria-label="Disminuir"
                onClick={() =>
                  updateCartQuantity(item.id, item.quantity - 1)
                }
                className="flex h-full w-8 items-center justify-center hover:bg-[#FEFAF9]"
              >
                <Minus className="size-3" />
              </button>
              <span className="min-w-7 border-x border-[#EAD6D8] text-center text-xs tabular-nums">
                {item.quantity}
              </span>
              <button
                type="button"
                aria-label="Aumentar"
                onClick={() =>
                  updateCartQuantity(item.id, item.quantity + 1)
                }
                className="flex h-full w-8 items-center justify-center hover:bg-[#FEFAF9]"
              >
                <Plus className="size-3" />
              </button>
            </div>
            <button
              type="button"
              aria-label="Quitar del carrito"
              onClick={() => removeFromCart(item.id)}
              className="rounded p-1.5 text-[#2C2C2C]/45 hover:bg-[#FEFAF9] hover:text-[#E35D67]"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ) : (
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => {
                addToCart({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  imageUrl: item.imageUrl,
                });
                setWishlistOpen(false);
              }}
              className="h-8 rounded-md px-3 text-[10px] font-semibold tracking-wide text-white uppercase"
              style={{ backgroundColor: boutique.rose }}
            >
              Añadir
            </button>
            <button
              type="button"
              onClick={() =>
                toggleWishlist({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  imageUrl: item.imageUrl,
                })
              }
              className="h-8 rounded-md border border-[#EAD6D8] px-3 text-[10px] font-semibold tracking-wide text-[#2C2C2C]/70 uppercase hover:border-[#D68C96] hover:text-[#D68C96]"
            >
              Quitar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ShopDrawers() {
  const {
    cart,
    wishlist,
    cartOpen,
    wishlistOpen,
    setCartOpen,
    setWishlistOpen,
    cartTotal,
  } = useShop();

  return (
    <>
      <DrawerShell
        open={cartOpen}
        title="Carrito"
        onClose={() => setCartOpen(false)}
        footer={
          cart.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#2C2C2C]/70">Total</span>
                <span className="font-semibold text-[#2C2C2C]">
                  {formatPenPrice(cartTotal)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="inline-flex h-11 w-full items-center justify-center rounded-md text-[11px] font-semibold tracking-[0.14em] text-white uppercase"
                style={{ backgroundColor: boutique.rose }}
              >
                Continuar compra
              </button>
            </div>
          ) : null
        }
      >
        {cart.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-[#2C2C2C]/65">Tu carrito está vacío.</p>
            <Link
              href="/productos"
              onClick={() => setCartOpen(false)}
              className="mt-4 inline-flex text-sm font-medium text-[#D68C96] hover:underline"
            >
              Ver colección
            </Link>
          </div>
        ) : (
          cart.map((item) => <ItemRow key={item.id} item={item} mode="cart" />)
        )}
      </DrawerShell>

      <DrawerShell
        open={wishlistOpen}
        title="Mis deseos"
        onClose={() => setWishlistOpen(false)}
      >
        {wishlist.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-[#2C2C2C]/65">
              Aún no tienes favoritos guardados.
            </p>
            <Link
              href="/productos"
              onClick={() => setWishlistOpen(false)}
              className="mt-4 inline-flex text-sm font-medium text-[#D68C96] hover:underline"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          wishlist.map((item) => (
            <ItemRow key={item.id} item={item} mode="wishlist" />
          ))
        )}
      </DrawerShell>
    </>
  );
}
