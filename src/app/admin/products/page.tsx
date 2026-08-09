import Link from "next/link";
import { Plus } from "lucide-react";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
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
import { getDb } from "@/lib/db";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

function formatPrice(price: number) {
  return `S/ ${price.toFixed(2)}`;
}

export default async function AdminProductsPage() {
  const db = getDb();
  const products = await db.products.list();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#2C2C2C]">Productos</h1>
          <p className="text-sm text-[#2C2C2C]/70">
            Crea, edita o elimina productos de la tienda.
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

      {products.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Sin productos</CardTitle>
            <CardDescription>
              Empieza creando el primer producto de la colección.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-medium text-[#2C2C2C]">
                      {product.name}
                    </h2>
                    <CategoryBadge category={product.category} />
                    <StockBadge stockQuantity={product.stock_quantity} />
                  </div>
                  <p className="text-sm text-[#2C2C2C]/70">
                    {formatPrice(product.price)} · Stock:{" "}
                    {product.stock_quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
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
