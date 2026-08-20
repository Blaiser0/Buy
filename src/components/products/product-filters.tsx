"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import type { BrandInfo } from "@/lib/products/brands";
import {
  PRICE_RANGES,
  buildProductsHref,
  categoryMatchesFilter,
  describeCatalogFilters,
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
  hint,
  children,
  defaultOpen = true,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#F0E4E5] py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-start justify-between gap-2 text-left"
      >
        <span>
          <span className="block text-[12px] font-semibold text-[#2C2C2C]">
            {title}
          </span>
          {hint ? (
            <span className="mt-0.5 block text-[11px] leading-snug text-[#2C2C2C]/45">
              {hint}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 text-[#D68C96] transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? <div className="mt-3 space-y-1">{children}</div> : null}
    </div>
  );
}

function FilterOption({
  href,
  active,
  label,
  detail,
  onNavigate,
}: {
  href: string;
  active: boolean;
  label: string;
  detail?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-[13px] transition-colors",
        active
          ? "bg-[#FEFAF9] font-semibold text-[#C46F7A] ring-1 ring-[#EAD6D8]"
          : "text-[#2C2C2C]/75 hover:bg-[#FEFAF9] hover:text-[#2C2C2C]",
      )}
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-full border",
          active
            ? "border-[#D68C96] bg-[#D68C96] text-white"
            : "border-[#EAD6D8] bg-white",
        )}
      >
        {active ? <Check className="size-2.5" strokeWidth={3} /> : null}
      </span>
      <span className="min-w-0 flex-1">{label}</span>
      {detail ? (
        <span className="text-[11px] font-medium text-[#2C2C2C]/40">
          {detail}
        </span>
      ) : null}
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

  const activeLabels = useMemo(
    () => describeCatalogFilters(filters, brands, categories),
    [filters, brands, categories],
  );

  const hasSidebarFilters = activeLabels.length > 0;
  const activeCount = [
    filters.categoria,
    filters.marca,
    filters.precio,
    filters.stock,
  ].filter(Boolean).length;

  const closeMobile = () => setMobileOpen(false);

  const content = (
    <div className={cn(boutiqueSans.className, "space-y-1")}>
      <div className="mb-3 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold text-[#2C2C2C]">
              Filtrar productos
            </p>
            <p className="mt-1 text-xs text-[#2C2C2C]/55">
              {resultCount === 0
                ? "Sin resultados con esta combinación"
                : `${resultCount} producto${resultCount === 1 ? "" : "s"} para mostrar`}
            </p>
          </div>
          {hasSidebarFilters ? (
            <Link
              href={clearHref}
              onClick={closeMobile}
              className="inline-flex items-center gap-1 rounded-full bg-[#FEFAF9] px-2.5 py-1 text-[11px] font-medium text-[#C46F7A] hover:bg-[#F7E8EA]"
            >
              <X className="h-3 w-3" />
              Quitar filtros
            </Link>
          ) : null}
        </div>

        {hasSidebarFilters ? (
          <div className="rounded-lg bg-[#FEFAF9] px-3 py-2.5">
            <p className="text-[10px] font-semibold tracking-[0.12em] text-[#D68C96] uppercase">
              Estás viendo
            </p>
            <ul className="mt-1.5 space-y-1">
              {activeLabels.map((label) => (
                <li
                  key={label}
                  className="text-[12px] leading-snug text-[#2C2C2C]/75"
                >
                  · {label}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="rounded-lg bg-[#FEFAF9] px-3 py-2.5 text-[12px] leading-relaxed text-[#2C2C2C]/55">
            Elige categoría, marca o precio para encontrar más fácil lo que
            buscas.
          </p>
        )}
      </div>

      <FilterSection
        title="Tipo de producto"
        hint="Ejemplo: sueros, hidratantes, solares…"
      >
        <FilterOption
          href={buildProductsHref({ ...filters, categoria: "" })}
          active={!filters.categoria}
          label="Todos los tipos"
          onNavigate={closeMobile}
        />
        {categories.map((category) => {
          const active = categoryMatchesFilter(
            category.name,
            filters.categoria,
          );
          return (
            <FilterOption
              key={category.name}
              href={buildProductsHref({
                ...filters,
                categoria: active ? "" : category.matchKey,
              })}
              active={active}
              label={category.name}
              detail={`${category.count}`}
              onNavigate={closeMobile}
            />
          );
        })}
      </FilterSection>

      {brands.length > 0 ? (
        <FilterSection
          title="Marca"
          hint="Filtra por la firma K-Beauty"
        >
          <FilterOption
            href={buildProductsHref({ ...filters, marca: "" })}
            active={!filters.marca}
            label="Todas las marcas"
            onNavigate={closeMobile}
          />
          {brands.map((brand) => {
            const active = filters.marca === brand.slug;
            return (
              <FilterOption
                key={brand.id}
                href={buildProductsHref({
                  ...filters,
                  marca: active ? "" : brand.slug,
                })}
                active={active}
                label={brand.name}
                onNavigate={closeMobile}
              />
            );
          })}
        </FilterSection>
      ) : null}

      <FilterSection
        title="Rango de precio"
        hint="Precios en soles (S/)"
      >
        <FilterOption
          href={buildProductsHref({ ...filters, precio: "" })}
          active={!filters.precio}
          label="Cualquier precio"
          onNavigate={closeMobile}
        />
        {PRICE_RANGES.map((range) => {
          const active = filters.precio === range.id;
          return (
            <FilterOption
              key={range.id}
              href={buildProductsHref({
                ...filters,
                precio: active ? "" : range.id,
              })}
              active={active}
              label={range.label}
              onNavigate={closeMobile}
            />
          );
        })}
      </FilterSection>

      <FilterSection
        title="Disponibilidad"
        hint="Según stock actual"
        defaultOpen={false}
      >
        <FilterOption
          href={buildProductsHref({ ...filters, stock: "" })}
          active={!filters.stock}
          label="Todos"
          onNavigate={closeMobile}
        />
        <FilterOption
          href={buildProductsHref({
            ...filters,
            stock: filters.stock === "disponible" ? "" : "disponible",
          })}
          active={filters.stock === "disponible"}
          label="Disponibles para comprar"
          onNavigate={closeMobile}
        />
        <FilterOption
          href={buildProductsHref({
            ...filters,
            stock: filters.stock === "agotado" ? "" : "agotado",
          })}
          active={filters.stock === "agotado"}
          label="Agotados por ahora"
          onNavigate={closeMobile}
        />
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
          {hasSidebarFilters
            ? `Filtros (${activeCount})`
            : "Filtrar por tipo, marca o precio"}
        </button>
        {hasSidebarFilters ? (
          <p className="mt-2 text-center text-[12px] text-[#2C2C2C]/55">
            {activeLabels.join(" · ")}
          </p>
        ) : null}
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
              <div>
                <p className="text-sm font-semibold text-[#2C2C2C]">
                  Filtrar productos
                </p>
                <p className="text-[11px] text-[#2C2C2C]/50">
                  Toca una opción para aplicarla
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex size-10 items-center justify-center rounded-full text-[#2C2C2C]/60 hover:bg-[#FEFAF9]"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2">{content}</div>
          </aside>
        </div>
      ) : null}

      <aside className="hidden w-60 shrink-0 lg:block xl:w-64">
        <div className="sticky top-36 rounded-xl border border-[#F0E4E5] bg-white px-3 py-2 xl:top-40">
          {content}
        </div>
      </aside>
    </>
  );
}
