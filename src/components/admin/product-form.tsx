"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db/types";
import type { ProductActionState } from "@/actions/products";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type ProductFormProps = {
  product?: Product;
  action: (
    prev: ProductActionState,
    formData: FormData,
  ) => Promise<ProductActionState>;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-[#E50914] text-white hover:bg-[#C40812]"
    >
      {pending ? "Guardando..." : label}
    </Button>
  );
}

export function ProductForm({ product, action }: ProductFormProps) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="mx-auto max-w-2xl space-y-6">
      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          defaultValue={product?.name ?? ""}
          required
          minLength={3}
          placeholder="Serum hidratante"
        />
        {state.fieldErrors?.name?.[0] && (
          <p className="text-sm text-destructive">{state.fieldErrors.name[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description ?? ""}
          rows={4}
          placeholder="Descripción opcional del producto"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0.01"
            defaultValue={product?.price ?? ""}
            required
          />
          {state.fieldErrors?.price?.[0] && (
            <p className="text-sm text-destructive">
              {state.fieldErrors.price[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock_quantity">Stock</Label>
          <Input
            id="stock_quantity"
            name="stock_quantity"
            type="number"
            step="1"
            min="0"
            defaultValue={product?.stock_quantity ?? 0}
            required
          />
          {state.fieldErrors?.stock_quantity?.[0] && (
            <p className="text-sm text-destructive">
              {state.fieldErrors.stock_quantity[0]}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Imagen</Label>
        {product?.image_url && (
          <div className="relative mb-3 h-40 w-40 overflow-hidden rounded-md border bg-[#F8F6F0]">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <Input id="image" name="image" type="file" accept="image/*" />
        <p className="text-xs text-muted-foreground">
          Opcional. JPG, PNG o WEBP. Máx. 5MB.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <SubmitButton label={product ? "Guardar cambios" : "Crear producto"} />
        <Link
          href="/admin/products"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
