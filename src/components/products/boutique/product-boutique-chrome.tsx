"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Heart,
  Menu,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { productsCategoryHref } from "@/lib/products/search";
import { boutique, boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";
import { useShop } from "@/components/shop/shop-provider";
import { SearchSuggestField } from "@/components/products/search-suggest-field";

const NAV = [
  { href: "/productos", label: "Novedades", match: "" },
  {
    href: productsCategoryHref("Limpiadores"),
    label: "Cuidado Facial",
    match: "limpiadores",
  },
  {
    href: productsCategoryHref("Maquillaje"),
    label: "Maquillaje",
    match: "maquillaje",
  },
  {
    href: productsCategoryHref("Sueros"),
    label: "Sueros",
    match: "sueros",
  },
  {
    href: productsCategoryHref("Hidratantes"),
    label: "Hidratantes",
    match: "hidratantes",
  },
  {
    href: productsCategoryHref("Sets"),
    label: "Sets & Regalos",
    match: "sets",
  },
  {
    href: productsCategoryHref("Protectores"),
    label: "Solares",
    match: "protectores",
  },
  { href: "/marcas", label: "Marcas", match: "marcas" },
  { href: "/sobre-nosotros", label: "Nuestro Mundo", match: "" },
] as const;

const PROMOS = [
  {
    text: "Skincare coreano auténtico · Descubre tu rutina BUYU hoy",
    href: "/productos",
  },
  {
    text: "Envío cuidado en pedidos · Consulta disponibilidad",
    href: "/contacto",
  },
  {
    text: "Novedades K-Beauty · Ampoules, sun care y sets",
    href: "/productos",
  },
] as const;

function BoutiqueBrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "relative z-10 inline-flex items-center transition-opacity hover:opacity-90",
        compact ? "gap-2" : "gap-2.5",
      )}
    >
      <span className="min-w-0 text-left">
        <span
          className={cn(
            boutiqueSerif.className,
            "block leading-none font-semibold tracking-[0.18em] text-[#2C2C2C] uppercase",
            compact ? "text-[1.15rem]" : "text-[1.45rem]",
          )}
        >
          BUYU
        </span>
        <span
          className={cn(
            "mt-1 block font-medium tracking-[0.35em] text-[#2C2C2C]/65 uppercase",
            compact ? "text-[0.55rem]" : "text-[0.62rem]",
          )}
        >
          Boutique
        </span>
      </span>
      <Image
        src="/logo.png"
        alt="BUYU"
        width={compact ? 36 : 44}
        height={compact ? 36 : 44}
        priority
        className={cn(
          "shrink-0 object-contain",
          compact ? "h-9 w-9" : "h-11 w-11",
        )}
      />
    </Link>
  );
}

function ProductBoutiqueChromeInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const urlCategory = searchParams.get("categoria") ?? "";
  const {
    cartCount,
    wishlistCount,
    setCartOpen,
    setWishlistOpen,
  } = useShop();

  const [bannerOpen, setBannerOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState(urlQuery);
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    // Solo sincroniza búsqueda libre; las categorías no llenan el textfield.
    setQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPromoIndex((current) => (current + 1) % PROMOS.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  function isNavActive(item: (typeof NAV)[number]) {
    if (item.href === "/sobre-nosotros") {
      return pathname.startsWith("/sobre-nosotros");
    }
    if (item.href === "/marcas") {
      return pathname.startsWith("/marcas");
    }
    if (!pathname.startsWith("/productos")) return false;
    if (!item.match) {
      return !urlQuery && !urlCategory && item.label === "Novedades";
    }
    return urlCategory.toLowerCase().includes(item.match);
  }

  const promo = PROMOS[promoIndex] ?? PROMOS[0];

  return (
    <div
      className={cn(
        boutiqueSans.className,
        "sticky top-0 z-[100] shrink-0 border-b border-[#F0E4E5] bg-white/95 backdrop-blur-md",
      )}
    >
      {bannerOpen ? (
        <div
          className="relative z-20 px-4 py-2.5 pr-12 text-white sm:px-8 sm:py-2 lg:py-1.5"
          style={{ backgroundColor: boutique.roseSoft }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 text-center">
            <button
              type="button"
              aria-label="Promo anterior"
              onClick={() =>
                setPromoIndex(
                  (current) => (current - 1 + PROMOS.length) % PROMOS.length,
                )
              }
              className="hidden min-h-8 min-w-8 items-center justify-center text-white/80 hover:text-white sm:inline-flex"
            >
              ‹
            </button>
            <Link
              href={promo.href}
              className={cn(
                boutiqueSerif.className,
                "line-clamp-2 text-[12px] font-medium tracking-[0.02em] transition-opacity hover:opacity-90 sm:line-clamp-1 sm:text-[13px] lg:text-[14px]",
              )}
            >
              {promo.text}
            </Link>
            <button
              type="button"
              aria-label="Promo siguiente"
              onClick={() =>
                setPromoIndex((current) => (current + 1) % PROMOS.length)
              }
              className="hidden min-h-8 min-w-8 items-center justify-center text-white/80 hover:text-white sm:inline-flex"
            >
              ›
            </button>
          </div>
          <button
            type="button"
            aria-label="Cerrar aviso"
            onClick={() => setBannerOpen(false)}
            className="absolute top-1/2 right-1 flex size-10 -translate-y-1/2 items-center justify-center text-white/90 hover:text-white sm:right-2"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : null}

      <header className="relative z-10 border-b border-[#F0E4E5] bg-white">
        <Image
          src="/boutique-roses-cluster.png"
          alt=""
          width={180}
          height={180}
          className="pointer-events-none absolute -top-5 -left-6 z-0 w-[72px] select-none object-contain opacity-85 mix-blend-multiply sm:w-[140px] lg:w-[130px]"
          aria-hidden
          priority
        />
        <Image
          src="/boutique-roses-cluster.png"
          alt=""
          width={180}
          height={180}
          className="pointer-events-none absolute -top-5 -right-6 z-0 w-[72px] scale-x-[-1] select-none object-contain opacity-85 mix-blend-multiply sm:w-[140px] lg:w-[130px]"
          aria-hidden
          priority
        />

        <div className="relative z-10 mx-auto hidden max-w-6xl items-center gap-4 px-6 py-3 lg:grid lg:grid-cols-[260px_minmax(0,1fr)_260px]">
          <div className="justify-self-start pl-1">
            <BoutiqueBrandLockup />
          </div>

          <div className="relative z-20 mx-auto w-full max-w-[420px] justify-self-center">
            <SearchSuggestField
              value={query}
              onChange={setQuery}
              placeholder="Busca tus productos favoritos..."
            />
          </div>

          <div className="flex items-center justify-self-end gap-3 text-[#2C2C2C] xl:gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide transition-colors hover:text-[#D68C96]"
            >
              <User className="size-4" strokeWidth={1.5} />
              Mi cuenta
            </Link>
            <button
              type="button"
              onClick={() => setWishlistOpen(true)}
              className="relative inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide transition-colors hover:text-[#D68C96]"
            >
              <Heart className="size-4" strokeWidth={1.5} />
              Mis deseos
              {wishlistCount > 0 ? (
                <span className="absolute -top-2.5 -right-3 flex size-[15px] items-center justify-center rounded-full bg-[#E35D67] text-[9px] font-semibold text-white">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide transition-colors hover:text-[#D68C96]"
            >
              <ShoppingBag className="size-4" strokeWidth={1.5} />
              Carrito
              <span className="absolute -top-2.5 -right-3 flex size-[15px] items-center justify-center rounded-full bg-[#E35D67] text-[9px] font-semibold text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            </button>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:hidden">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              className="flex size-11 shrink-0 items-center justify-center text-[#2C2C2C]"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            <BoutiqueBrandLockup compact />

            <div className="flex items-center text-[#2C2C2C]">
              <Link
                href="/login"
                aria-label="Mi cuenta"
                className="flex size-11 items-center justify-center"
              >
                <User className="size-4" strokeWidth={1.5} />
              </Link>
              <button
                type="button"
                aria-label="Mis deseos"
                onClick={() => setWishlistOpen(true)}
                className="relative flex size-11 items-center justify-center"
              >
                <Heart className="size-4" strokeWidth={1.5} />
                {wishlistCount > 0 ? (
                  <span className="absolute top-1.5 right-1.5 flex size-3.5 items-center justify-center rounded-full bg-[#E35D67] text-[8px] font-semibold text-white">
                    {wishlistCount}
                  </span>
                ) : null}
              </button>
              <button
                type="button"
                aria-label="Carrito"
                onClick={() => setCartOpen(true)}
                className="relative flex size-11 items-center justify-center"
              >
                <ShoppingBag className="size-4" strokeWidth={1.5} />
                <span className="absolute top-1.5 right-1.5 flex size-3.5 items-center justify-center rounded-full bg-[#E35D67] text-[8px] font-semibold text-white">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          <div className="relative z-20 mt-3">
            <SearchSuggestField
              value={query}
              onChange={setQuery}
              onSubmitExtra={() => setMobileOpen(false)}
              placeholder="Busca tus productos..."
              compact
            />
          </div>
        </div>

        <nav className="relative z-10 hidden border-y border-[#F0E4E5] bg-[#FEFAF9]/95 lg:block">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 px-4 py-1.5 xl:gap-x-7">
            {NAV.map((item) => {
              const active = isNavActive(item);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-[10px] font-medium tracking-[0.14em] uppercase transition-colors hover:text-[#D68C96] xl:text-[11px]",
                      active
                        ? "font-semibold text-[#D68C96]"
                        : "text-[#2C2C2C]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {mobileOpen ? (
          <nav className="border-t border-[#F0E4E5] bg-[#FEFAF9] lg:hidden">
            <ul className="grid gap-1 px-4 py-3">
              {NAV.map((item) => {
                const active = isNavActive(item);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm tracking-wide uppercase transition-colors hover:bg-white",
                        active
                          ? "font-semibold text-[#D68C96]"
                          : "text-[#2C2C2C]",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </header>
    </div>
  );
}

export function ProductBoutiqueChrome() {
  return (
    <Suspense fallback={<div className="h-[72px] shrink-0 bg-white" />}>
      <ProductBoutiqueChromeInner />
    </Suspense>
  );
}
