"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Colección" },
  { href: "/sobre-nosotros", label: "Sobre Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

type SiteHeaderProps = {
  onSearch?: (query: string) => void;
};

export function SiteHeader({ onSearch }: SiteHeaderProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#F8F6F0] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 md:px-6">
        <BrandLogo
          priority
          className="min-w-0 shrink"
          imageClassName="h-7 max-w-[140px] sm:h-8 sm:max-w-[160px] md:h-9 md:max-w-none"
        />

        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-[#2C2C2C] transition-colors hover:text-[#E50914]",
                pathname === item.href && "text-[#E50914]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <form
            className="relative hidden md:block"
            onSubmit={(event) => {
              event.preventDefault();
              onSearch?.(query);
            }}
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2C2C2C]/60" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar..."
              className="h-9 w-36 border-[#F8F6F0] bg-[#F8F6F0] pl-9 text-[#2C2C2C] placeholder:text-[#2C2C2C]/50 focus-visible:ring-[#E50914] lg:w-48 xl:w-56"
            />
          </form>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-[#2C2C2C] hover:bg-[#F8F6F0] hover:text-[#E50914] md:hidden"
            aria-label={searchOpen ? "Cerrar búsqueda" : "Buscar"}
            onClick={() => {
              setSearchOpen((open) => !open);
              setMobileOpen(false);
            }}
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-[#2C2C2C] hover:bg-[#F8F6F0] hover:text-[#E50914]"
            aria-label="Carrito de compras"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-[#2C2C2C] hover:bg-[#F8F6F0] hover:text-[#E50914] lg:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((open) => !open);
              setSearchOpen(false);
            }}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-[#F8F6F0] px-4 py-3 md:hidden">
          <form
            className="relative"
            onSubmit={(event) => {
              event.preventDefault();
              onSearch?.(query);
            }}
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2C2C2C]/60" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar productos..."
              autoFocus
              className="h-10 w-full border-[#F8F6F0] bg-[#F8F6F0] pl-9 text-[#2C2C2C] placeholder:text-[#2C2C2C]/50 focus-visible:ring-[#E50914]"
            />
          </form>
        </div>
      )}

      {mobileOpen && (
        <nav className="border-t border-[#F8F6F0] bg-white px-4 py-3 lg:hidden">
          <ul className="grid gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-sm font-medium text-[#2C2C2C] transition-colors hover:bg-[#F8F6F0]",
                    pathname === item.href && "bg-[#F8F6F0] text-[#E50914]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
