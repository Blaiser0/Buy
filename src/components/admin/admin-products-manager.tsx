"use client";

import { useState } from "react";
import type { Product } from "@/lib/db/types";
import { filterProductsByName } from "@/lib/products/search";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { ProductVisibilityButton } from "@/components/admin/product-visibility-button";
import { CategoryBadge } from "@/components/products/category-badge";
import { StockBadge } from "@/components/products/stock-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

function formatPrice(price: number) {
  return `S/ ${price.toFixed(2)}`;
}

export function AdminProductsManager({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const filteredProducts = filterProductsByName(products, query);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#2C2C2C]">Productos</h1>
          <p className="text-sm text-[#2C2C2C]/70">
            Crea, edita, oculta o elimina productos de la tienda.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className={cn(
            buttonVariants(),
            "bg-[#E50914] text-white hover:bg-[#C40812]",
          )}
        >
          <Plus className="mr-1 h-4 w-4" />
          Crear nuevo producto
        </Link>
      </div>

      <div role="search" aria-label="Buscar productos en administración" className="space-y-2">
        <Label htmlFor="admin-product-search">Buscar producto por nombre</Label>
        <div className="flex flex-wrap gap-2">
          <Input
            id="admin-product-search"
            type="search"
            placeholder="Escribe una palabra, por ejemplo: centella"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-0 flex-1 basis-56"
            aria-controls="admin-product-results"
            autoComplete="off"
          />
          {query && <Button type="button" variant="outline" onClick={() => setQuery("")}>Limpiar búsqueda</Button>}
        </div>
        <p role="status" aria-live="polite" className="text-sm text-[#2C2C2C]/70">
          {filteredProducts.length} de {products.length} productos
        </p>
      </div>

      <div id="admin-product-results">
      {filteredProducts.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{products.length === 0 ? "Sin productos" : "No se encontraron productos"}</CardTitle>
            <CardDescription>
              {products.length === 0 ? "Empieza creando el primer producto de la colección." : "Prueba con otra palabra o limpia la búsqueda."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-medium text-[#2C2C2C]">
                      {product.name}
                    </h2>
                    <CategoryBadge category={product.category} />
                    <StockBadge stockQuantity={product.stock_quantity} />
                    <span className="text-xs font-medium">{product.is_visible ? "Visible" : "Oculto al público"}</span>
                  </div>
                  <p className="text-sm text-[#2C2C2C]/70">
                    {formatPrice(product.price)} · Stock:{" "}
                    {product.stock_quantity}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <ProductVisibilityButton productId={product.id} isVisible={product.is_visible} />
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    Editar
                  </Link>
                  <DeleteProductButton
                    productId={product.id}
                    productName={product.name}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </div>

      <Link
        href="/admin/products/new"
        className="fixed bottom-6 right-6 inline-flex h-14 items-center gap-2 rounded-full bg-[#E50914] px-5 text-sm font-medium text-white shadow-lg hover:bg-[#C40812]"
      >
        <Plus className="h-5 w-5" />
        Nuevo
      </Link>
    </div>
  );
}
