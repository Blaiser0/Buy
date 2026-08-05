"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-[#F8F6F0] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 md:px-6">
        <BrandLogo priority className="shrink-0" />

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
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

        <div className="ml-auto flex items-center gap-2">
          <form
            className="relative hidden sm:block"
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
              className="h-9 w-40 border-[#F8F6F0] bg-[#F8F6F0] pl-9 text-[#2C2C2C] placeholder:text-[#2C2C2C]/50 focus-visible:ring-[#E50914] lg:w-56"
            />
          </form>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-[#2C2C2C] hover:bg-[#F8F6F0] hover:text-[#E50914]"
            aria-label="Carrito de compras"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <nav className="flex gap-4 overflow-x-auto border-t border-[#F8F6F0] px-4 py-2 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "whitespace-nowrap text-sm text-[#2C2C2C]",
              pathname === item.href && "font-medium text-[#E50914]",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
