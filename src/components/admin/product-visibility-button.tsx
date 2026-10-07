"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setProductVisibilityAction } from "@/actions/products";
import { Button } from "@/components/ui/button";

export function ProductVisibilityButton({ productId, isVisible }: { productId: string; isVisible: boolean }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  return (
    <div>
      <Button size="sm" variant="outline" disabled={pending} onClick={() => {
        setError(null);
        startTransition(async () => {
          try {
            const result = await setProductVisibilityAction(productId, !isVisible);
            if (result.error) setError(result.error);
            else router.refresh();
          } catch { setError("No se pudo guardar. Inténtalo de nuevo."); }
        });
      }}>{pending ? "Guardando..." : isVisible ? "Ocultar" : "Mostrar"}</Button>
      {error && <p role="alert" className="mt-1 max-w-xs text-xs text-red-700">{error}</p>}
    </div>
  );
}
