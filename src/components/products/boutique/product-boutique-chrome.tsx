"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Playfair_Display, Montserrat } from "next/font/google";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const logoSerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const uiSans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const NAV = [
  { href: "/productos", label: "Novedades" },
  { href: "/productos", label: "Cuidado Facial" },
  { href: "/productos", label: "Maquillaje" },
  { href: "/productos", label: "Fragancias" },
  { href: "/productos", label: "Cuerpo & Baño" },
  { href: "/productos", label: "Sets & Regalos" },
  { href: "/productos", label: "Accesorios" },
  { href: "/productos", label: "Marcas" },
  { href: "/sobre-nosotros", label: "Nuestro Mundo", accent: true },
] as const;

export function ProductBoutiqueChrome() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={cn(uiSans.className, "relative shrink-0 bg-white")}>
      {bannerOpen ? (
        <div className="relative z-20 bg-[#E8A4AB] px-8 py-2 text-white lg:py-1.5">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <p
              className={cn(
                logoSerif.className,
                "text-[12px] font-medium tracking-[0.02em] sm:text-[13px] lg:text-[14px]",
              )}
            >
              El primer paso está en tus manos, comienza tu rutina de skincare
              hoy.
            </p>
          </div>
          <button
            type="button"
            aria-label="Cerrar aviso"
            onClick={() => setBannerOpen(false)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-white/90 hover:text-white"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : null}

      <header className="relative z-10 overflow-hidden border-b border-[#F0E4E5] bg-white">
        <Image
          src="/boutique-roses-cluster.png"
          alt=""
          width={180}
          height={180}
          className="pointer-events-none absolute -top-5 -left-6 z-0 w-[110px] select-none object-contain opacity-85 mix-blend-multiply sm:w-[140px] lg:w-[130px]"
          aria-hidden
          priority
        />
        <Image
          src="/boutique-roses-cluster.png"
          alt=""
          width={180}
          height={180}
          className="pointer-events-none absolute -top-5 -right-6 z-0 w-[110px] scale-x-[-1] select-none object-contain opacity-85 mix-blend-multiply sm:w-[140px] lg:w-[130px]"
          aria-hidden
          priority
        />

        {/* Desktop: logo LEFT · search CENTER · icons RIGHT (same row) */}
        <div className="relative z-10 mx-auto hidden max-w-6xl items-center gap-4 px-6 py-3 lg:grid lg:grid-cols-[220px_minmax(0,1fr)_220px]">
          <Link href="/" className="relative z-10 justify-self-start pl-2">
            <span
              className={cn(
                logoSerif.className,
                "block text-[1.55rem] leading-none font-semibold tracking-[0.18em] text-[#2C2C2C] uppercase",
              )}
            >
              BUYU
            </span>
            <span className="mt-1 block text-[0.62rem] font-medium tracking-[0.38em] text-[#2C2C2C]/65 uppercase">
              Boutique
            </span>
          </Link>

          <form
            className="relative mx-auto w-full max-w-[420px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="search"
              placeholder="Busca tus productos favoritos..."
              className="h-9 w-full rounded-full border border-[#EAD6D8] bg-white px-4 pr-10 text-[12px] text-[#2C2C2C] placeholder:text-[#2C2C2C]/35 outline-none focus:border-[#D68C96]"
            />
            <Search
              className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#D68C96]"
              strokeWidth={1.75}
            />
          </form>

          <div className="flex items-center justify-self-end gap-4 text-[#2C2C2C]">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide transition-colors hover:text-[#D68C96]"
            >
              <User className="size-4" strokeWidth={1.5} />
              Mi cuenta
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide transition-colors hover:text-[#D68C96]"
            >
              <Heart className="size-4" strokeWidth={1.5} />
              Mis deseos
            </button>
            <button
              type="button"
              className="relative inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide transition-colors hover:text-[#D68C96]"
            >
              <ShoppingBag className="size-4" strokeWidth={1.5} />
              Carrito
              <span className="absolute -top-2.5 -right-3 flex size-[15px] items-center justify-center rounded-full bg-[#E35D67] text-[9px] font-semibold text-white">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile / tablet header */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              className="text-[#2C2C2C]"
              aria-label="Abrir menú"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            <Link href="/" className="text-center">
              <span
                className={cn(
                  logoSerif.className,
                  "block text-[1.25rem] leading-none font-semibold tracking-[0.18em] text-[#2C2C2C] uppercase",
                )}
              >
                BUYU
              </span>
              <span className="mt-0.5 block text-[0.58rem] font-medium tracking-[0.35em] text-[#2C2C2C]/65 uppercase">
                Boutique
              </span>
            </Link>

            <div className="flex items-center gap-2.5 text-[#2C2C2C]">
              <Link href="/login" aria-label="Mi cuenta">
                <User className="size-4" strokeWidth={1.5} />
              </Link>
              <button type="button" aria-label="Mis deseos">
                <Heart className="size-4" strokeWidth={1.5} />
              </button>
              <button type="button" aria-label="Carrito" className="relative">
                <ShoppingBag className="size-4" strokeWidth={1.5} />
                <span className="absolute -top-2 -right-2 flex size-3.5 items-center justify-center rounded-full bg-[#E35D67] text-[8px] font-semibold text-white">
                  0
                </span>
              </button>
            </div>
          </div>

          <form
            className="relative mt-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="search"
              placeholder="Busca tus productos favoritos..."
              className="h-9 w-full rounded-full border border-[#EAD6D8] bg-white px-4 pr-10 text-[12px] text-[#2C2C2C] placeholder:text-[#2C2C2C]/35 outline-none focus:border-[#D68C96]"
            />
            <Search
              className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#D68C96]"
              strokeWidth={1.75}
            />
          </form>
        </div>

        <nav className="relative z-10 hidden border-y border-[#F0E4E5] bg-[#FEFAF9] lg:block">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 px-4 py-1.5 xl:gap-x-7">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-[10px] font-medium tracking-[0.14em] uppercase transition-colors hover:text-[#D68C96] xl:text-[11px]",
                    "accent" in item && item.accent
                      ? "font-semibold text-[#D68C96]"
                      : "text-[#2C2C2C]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {mobileOpen ? (
          <nav className="border-t border-[#F0E4E5] bg-[#FEFAF9] lg:hidden">
            <ul className="grid gap-1 px-4 py-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm tracking-wide uppercase",
                      "accent" in item && item.accent
                        ? "text-[#D68C96]"
                        : "text-[#2C2C2C]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>
    </div>
  );
}
