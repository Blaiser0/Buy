"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, Trash2, X } from "lucide-react";
import { formatPenPrice } from "@/lib/products/detail-content";
import { cn } from "@/lib/utils";
import { boutique, boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";
import { useShop, type ShopItem } from "@/components/shop/shop-provider";
import {
  BUYU_WHATSAPP,
  PAYMENT_ACCOUNTS,
  buildWhatsAppUrl,
  orderConfirmationMessage,
  summarizeCartItems,
} from "@/lib/checkout";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

function DrawerShell({
  open,
  title,
  onClose,
  children,
  footer,
  onBack,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Cerrar panel"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[110] bg-black/25 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          boutiqueSans.className,
          "fixed top-0 right-0 z-[120] flex h-dvh w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-[#F0E4E5] px-5 py-4">
          <div className="flex min-w-0 items-center gap-2">
            {onBack ? (
              <button
                type="button"
                aria-label="Volver"
                onClick={onBack}
                className="rounded-full p-1.5 text-[#2C2C2C]/70 hover:bg-[#FEFAF9] hover:text-[#D68C96]"
              >
                <ArrowLeft className="size-5" />
              </button>
            ) : null}
            <h2
              className={cn(
                boutiqueSerif.className,
                "truncate text-xl font-semibold text-[#2C2C2C]",
              )}
            >
              {title}
            </h2>
          </div>
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
                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
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
                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
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

function PaymentCheckout({
  total,
  items,
}: {
  total: number;
  items: ShopItem[];
}) {
  const [method, setMethod] = useState<"yape" | "plin">("yape");
  const selected = method === "yape" ? PAYMENT_ACCOUNTS.yape : PAYMENT_ACCOUNTS.plin;
  const totalLabel = formatPenPrice(total);
  const confirmHref = buildWhatsAppUrl(
    orderConfirmationMessage({
      totalLabel,
      itemsSummary: summarizeCartItems(items),
    }),
  );

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-[#FEFAF9] px-4 py-3">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#D68C96] uppercase">
          Monto a pagar
        </p>
        <p className="mt-1 text-2xl font-semibold text-[#2C2C2C]">{totalLabel}</p>
        <p className="mt-1 text-xs text-[#2C2C2C]/55">
          Titular: {PAYMENT_ACCOUNTS.titular}
        </p>
        <p className="text-xs text-[#2C2C2C]/55">
          Número: {selected.number} · Consultas {BUYU_WHATSAPP.display}
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-[#2C2C2C]">
          Método de pago
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMethod("yape")}
            className={cn(
              "rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors",
              method === "yape"
                ? "border-[#6C1D7A] bg-[#6C1D7A]/10 text-[#6C1D7A]"
                : "border-[#EAD6D8] text-[#2C2C2C]/70 hover:bg-[#FEFAF9]",
            )}
          >
            Yape
          </button>
          <button
            type="button"
            onClick={() => setMethod("plin")}
            className={cn(
              "rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors",
              method === "plin"
                ? "border-[#00AEEF] bg-[#00AEEF]/10 text-[#008FC4]"
                : "border-[#EAD6D8] text-[#2C2C2C]/70 hover:bg-[#FEFAF9]",
            )}
          >
            Plin
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[#F0E4E5] bg-white p-4 text-center">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2C2C2C]/55 uppercase">
          Escanea el QR de {selected.label}
        </p>
        <div className="mx-auto mt-3 w-full max-w-[220px] overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selected.qrPath}
            alt={`QR ${selected.label} (ejemplo)`}
            className="h-auto w-full object-contain"
          />
        </div>
        <p className="mt-3 text-xs text-[#2C2C2C]/50">
          QR de ejemplo. Reemplázalo por el código real de {selected.label}.
        </p>
      </div>

      <ol className="space-y-2 rounded-xl bg-[#FEFAF9] px-4 py-3 text-[12px] leading-relaxed text-[#2C2C2C]/70">
        <li>1. Escanea el QR o paga al número indicado.</li>
        <li>2. Transfiere exactamente {totalLabel}.</li>
        <li>3. Guarda la captura del pago.</li>
        <li>4. Confirma tu pedido por WhatsApp y adjunta la captura.</li>
      </ol>

      <a
        href={confirmHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#25D366] text-[12px] font-semibold tracking-[0.1em] text-white uppercase shadow-[0_10px_24px_rgba(37,211,102,0.28)] transition-colors hover:bg-[#1ebe5d]"
      >
        <WhatsAppIcon className="size-4" />
        Confirmar pedido por WhatsApp
      </a>
      <p className="text-center text-[11px] leading-relaxed text-[#2C2C2C]/50">
        Se abrirá WhatsApp con un mensaje listo. Adjunta allí tu captura de
        Yape/Plin.
      </p>
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
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "payment">("cart");

  useEffect(() => {
    if (!cartOpen) setCheckoutStep("cart");
  }, [cartOpen]);

  useEffect(() => {
    if (cart.length === 0) setCheckoutStep("cart");
  }, [cart.length]);

  return (
    <>
      <DrawerShell
        open={cartOpen}
        title={checkoutStep === "payment" ? "Pago Yape / Plin" : "Carrito"}
        onClose={() => setCartOpen(false)}
        onBack={
          checkoutStep === "payment" ? () => setCheckoutStep("cart") : undefined
        }
        footer={
          cart.length > 0 && checkoutStep === "cart" ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#2C2C2C]/70">Total</span>
                <span className="font-semibold text-[#2C2C2C]">
                  {formatPenPrice(cartTotal)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutStep("payment")}
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
        ) : checkoutStep === "payment" ? (
          <PaymentCheckout total={cartTotal} items={cart} />
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
