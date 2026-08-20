"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { SearchSuggestion } from "@/lib/products/search";
import { productsSearchHref } from "@/lib/products/search";
import { formatPenPrice } from "@/lib/products/detail-content";
import { cn } from "@/lib/utils";
import { boutiqueSans } from "@/lib/boutique-theme";

type SearchSuggestFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmitExtra?: () => void;
  placeholder?: string;
  inputClassName?: string;
  compact?: boolean;
};

type PanelBox = {
  top: number;
  left: number;
  width: number;
};

export function SearchSuggestField({
  value,
  onChange,
  onSubmitExtra,
  placeholder = "Busca tus productos favoritos...",
  inputClassName,
  compact = false,
}: SearchSuggestFieldProps) {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [box, setBox] = useState<PanelBox | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  function updateBox() {
    const node = rootRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setBox({
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
    });
  }

  useLayoutEffect(() => {
    if (!open) return;
    updateBox();
    function onScrollOrResize() {
      updateBox();
    }
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [open, value, suggestions.length]);

  useEffect(() => {
    const needle = value.trim();
    if (!needle) {
      setSuggestions([]);
      setLoading(false);
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search-suggestions?q=${encodeURIComponent(needle)}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          setSuggestions([]);
          return;
        }
        const data = (await response.json()) as {
          suggestions?: SearchSuggestion[];
        };
        setSuggestions(data.suggestions ?? []);
        setOpen(true);
        setActiveIndex(-1);
        requestAnimationFrame(updateBox);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setSuggestions([]);
        }
      } finally {
        setLoading(false);
      }
    }, 140);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      const panel = document.getElementById(listId);
      if (panel?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [listId]);

  function goToResults() {
    onSubmitExtra?.();
    setOpen(false);
    router.push(productsSearchHref(value));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      onSubmitExtra?.();
      setOpen(false);
      router.push(suggestions[activeIndex].href);
      return;
    }
    goToResults();
  }

  const showPanel = open && value.trim().length > 0 && mounted && box;

  const panel =
    showPanel && box
      ? createPortal(
          <div
            id={listId}
            role="listbox"
            style={{
              position: "fixed",
              top: box.top,
              left: box.left,
              width: box.width,
              zIndex: 200,
            }}
            className={cn(
              boutiqueSans.className,
              "overflow-hidden rounded-2xl border border-[#F0E4E5] bg-white shadow-[0_18px_40px_rgba(44,44,44,0.16)]",
            )}
          >
            {loading && suggestions.length === 0 ? (
              <p className="px-4 py-3 text-[12px] text-[#2C2C2C]/50">
                Buscando...
              </p>
            ) : null}

            {!loading && suggestions.length === 0 ? (
              <p className="px-4 py-3 text-[12px] text-[#2C2C2C]/55">
                No hay productos para “{value.trim()}”.
              </p>
            ) : null}

            {suggestions.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto py-1.5">
                {suggestions.map((item, index) => (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={index === activeIndex}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        onSubmitExtra?.();
                        setOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 transition-colors",
                        index === activeIndex
                          ? "bg-[#FEFAF9]"
                          : "hover:bg-[#FEFAF9]",
                      )}
                    >
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-[#FEFAF9]">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="44px"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center text-[9px] font-semibold tracking-wide text-[#D68C96] uppercase">
                            BUYU
                          </span>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-1 text-[13px] font-medium text-[#2C2C2C]">
                          {item.name}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-[#2C2C2C]/50">
                          {item.category} · {formatPenPrice(item.price)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            <button
              type="button"
              onClick={goToResults}
              className="flex w-full items-center justify-between border-t border-[#F0E4E5] bg-[#FEFAF9] px-4 py-2.5 text-left text-[12px] font-medium text-[#C46F7A] hover:bg-[#F7E8EA]"
            >
              <span>Ver todos los resultados de “{value.trim()}”</span>
              <Search className="size-3.5" />
            </button>
          </div>,
          document.body,
        )
      : null;

  return (
    <div ref={rootRef} className={cn(boutiqueSans.className, "relative w-full")}>
      <form className="relative" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => {
            if (value.trim()) {
              setOpen(true);
              requestAnimationFrame(updateBox);
            }
          }}
          onKeyDown={(event) => {
            if (!showPanel || suggestions.length === 0) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActiveIndex((current) =>
                current < suggestions.length - 1 ? current + 1 : 0,
              );
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((current) =>
                current > 0 ? current - 1 : suggestions.length - 1,
              );
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder={placeholder}
          role="combobox"
          aria-expanded={Boolean(showPanel)}
          aria-controls={listId}
          aria-autocomplete="list"
          className={cn(
            "h-9 w-full rounded-full border border-[#EAD6D8] bg-white px-4 pr-10 text-[12px] text-[#2C2C2C] placeholder:text-[#2C2C2C]/35 outline-none focus:border-[#D68C96]",
            compact && "h-11 pr-11 text-[13px] sm:h-9 sm:text-[12px]",
            inputClassName,
          )}
        />
        <button
          type="submit"
          aria-label="Buscar"
          className={cn(
            "absolute top-1/2 right-3.5 -translate-y-1/2 text-[#D68C96] transition-colors hover:text-[#C46F7A]",
            compact && "right-1.5 flex size-9 items-center justify-center",
          )}
        >
          <Search className="size-4" strokeWidth={1.75} />
        </button>
      </form>
      {panel}
    </div>
  );
}
