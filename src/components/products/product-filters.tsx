"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import type { BrandInfo } from "@/lib/products/brands";
import {
  PRICE_RANGES,
  buildProductsHref,
  categoryMatchesFilter,
  type CatalogFilters,
} from "@/lib/products/search";
import { cn } from "@/lib/utils";
import { boutiqueSans } from "@/lib/boutique-theme";

type CategoryOption = {
  name: string;
  count: number;
  matchKey: string;
};

type ProductFiltersProps = {
  filters: CatalogFilters;
  categories: CategoryOption[];
  brands: BrandInfo[];
  resultCount: number;
};

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#F0E4E5] py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="text-[11px] font-semibold tracking-[0.16em] text-[#2C2C2C] uppercase">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-[#D68C96] transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? <div className="mt-3 space-y-1.5">{children}</div> : null}
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
  onNavigate,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center justify-between rounded-md px-2.5 py-2.5 text-[13px] transition-colors sm:py-2",
        active
          ? "bg-[#FEFAF9] font-semibold text-[#C46F7A]"
          : "text-[#2C2C2C]/75 hover:bg-[#FEFAF9] hover:text-[#2C2C2C]",
      )}
    >
      {children}
    </Link>
  );
}

export function ProductFilters({
  filters,
  categories,
  brands,
  resultCount,
}: ProductFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const clearHref = useMemo(
    () =>
      buildProductsHref({
        q: filters.q,
        categoria: "",
        marca: "",
        precio: "",
        stock: "",
      }),
    [filters.q],
  );

  const hasSidebarFilters = Boolean(
    filters.categoria || filters.marca || filters.precio || filters.stock,
  );

  const closeMobile = () => setMobileOpen(false);

  const content = (
    <div className={cn(boutiqueSans.className, "space-y-1")}>
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[#D68C96] uppercase">
            Filtros
          </p>
          <p className="mt-1 text-xs text-[#2C2C2C]/55">
            {resultCount} producto{resultCount === 1 ? "" : "s"}
          </p>
        </div>
        {hasSidebarFilters ? (
          <Link
            href={clearHref}
            onClick={closeMobile}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C46F7A] hover:underline"
          >
            <X className="h-3 w-3" />
            Limpiar
          </Link>
        ) : null}
      </div>

      <FilterSection title="Categoría">
        <FilterLink
          href={buildProductsHref({ ...filters, categoria: "" })}
          active={!filters.categoria}
          onNavigate={closeMobile}
        >
          <span>Todas</span>
        </FilterLink>
        {categories.map((category) => {
          const active = categoryMatchesFilter(
            category.name,
            filters.categoria,
          );
          return (
            <FilterLink
              key={category.name}
              href={buildProductsHref({
                ...filters,
                categoria: active ? "" : category.matchKey,
              })}
              active={active}
              onNavigate={closeMobile}
            >
              <span>{category.name}</span>
              <span className="text-[11px] text-[#2C2C2C]/40">
                {category.count}
              </span>
            </FilterLink>
          );
        })}
      </FilterSection>

      {brands.length > 0 ? (
        <FilterSection title="Marca">
          <FilterLink
            href={buildProductsHref({ ...filters, marca: "" })}
            active={!filters.marca}
            onNavigate={closeMobile}
          >
            <span>Todas</span>
          </FilterLink>
          {brands.map((brand) => {
            const active = filters.marca === brand.slug;
            return (
              <FilterLink
                key={brand.id}
                href={buildProductsHref({
                  ...filters,
                  marca: active ? "" : brand.slug,
                })}
                active={active}
                onNavigate={closeMobile}
              >
                <span>{brand.name}</span>
              </FilterLink>
            );
          })}
        </FilterSection>
      ) : null}

      <FilterSection title="Precio">
        <FilterLink
          href={buildProductsHref({ ...filters, precio: "" })}
          active={!filters.precio}
          onNavigate={closeMobile}
        >
          <span>Todos</span>
        </FilterLink>
        {PRICE_RANGES.map((range) => {
          const active = filters.precio === range.id;
          return (
            <FilterLink
              key={range.id}
              href={buildProductsHref({
                ...filters,
                precio: active ? "" : range.id,
              })}
              active={active}
              onNavigate={closeMobile}
            >
              <span>{range.label}</span>
            </FilterLink>
          );
        })}
      </FilterSection>

      <FilterSection title="Disponibilidad">
        <FilterLink
          href={buildProductsHref({ ...filters, stock: "" })}
          active={!filters.stock}
          onNavigate={closeMobile}
        >
          <span>Todos</span>
        </FilterLink>
        <FilterLink
          href={buildProductsHref({
            ...filters,
            stock: filters.stock === "disponible" ? "" : "disponible",
          })}
          active={filters.stock === "disponible"}
          onNavigate={closeMobile}
        >
          <span>En stock</span>
        </FilterLink>
        <FilterLink
          href={buildProductsHref({
            ...filters,
            stock: filters.stock === "agotado" ? "" : "agotado",
          })}
          active={filters.stock === "agotado"}
          onNavigate={closeMobile}
        >
          <span>Agotados</span>
        </FilterLink>
      </FilterSection>
    </div>
  );

  return (
    <>
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className={cn(
            boutiqueSans.className,
            "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#EAD6D8] bg-white text-sm font-medium text-[#2C2C2C]",
          )}
        >
          <SlidersHorizontal className="h-4 w-4 text-[#D68C96]" />
          Filtrar productos
          {hasSidebarFilters ? (
            <span className="rounded-full bg-[#FEFAF9] px-2 py-0.5 text-[10px] font-semibold text-[#C46F7A]">
              Activo
            </span>
          ) : null}
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Cerrar filtros"
            className="absolute inset-0 bg-[#2C2C2C]/35"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F0E4E5] px-4 py-3">
              <p className="text-sm font-semibold text-[#2C2C2C]">Filtros</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-1.5 text-[#2C2C2C]/60 hover:bg-[#FEFAF9]"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2">{content}</div>
          </aside>
        </div>
      ) : null}

      <aside className="hidden w-56 shrink-0 lg:block xl:w-64">
        <div className="sticky top-36 rounded-xl border border-[#F0E4E5] bg-white px-3 py-2 xl:top-40">
          {content}
        </div>
      </aside>
    </>
  );
}
