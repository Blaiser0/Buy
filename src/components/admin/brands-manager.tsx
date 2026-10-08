"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import Image from "next/image";
import type { Brand } from "@/lib/db/types";
import { saveBrandAction } from "@/actions/brands";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBrandLogoPath } from "@/lib/products/brands";

function BrandForm({ brand, count = 0 }: { brand?: Brand; count?: number }) {
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  const [state, action, pending] = useActionState(async (previous: Awaited<ReturnType<typeof saveBrandAction>>, data: FormData) => {
    const result = await saveBrandAction(previous, data);
    if (result.success) setPreview(null);
    return result;
  }, {});
  const logoPath = preview || (brand ? getBrandLogoPath(brand) : "");
  function runBrandOperation(operation: "hide" | "show" | "delete") {
    if (!brand) return;
    const data = new FormData();
    data.set("id", brand.id);
    data.set("operation", operation);
    startTransition(() => action(data));
  }
  return (
    <form action={action} className="space-y-3 rounded-xl border p-4">
      <input type="hidden" name="operation" value={brand ? "update" : "create"} />
      {brand && <input type="hidden" name="id" value={brand.id} />}
      <label className="block space-y-2">
        <span className="text-sm font-medium">{brand ? "Nombre de la marca" : "Nueva marca"}</span>
        <Input name="name" defaultValue={brand?.name ?? ""} minLength={2} maxLength={80} required placeholder="Ejemplo: TOCOBO" />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">Imagen / logo de la marca</span>
        {logoPath && <Image src={logoPath} alt={`Logo ${brand?.name ?? "seleccionado"}`} width={160} height={80} unoptimized={Boolean(preview)} className="h-20 w-40 rounded-lg border bg-white p-2 object-contain" />}
        <Input name="logo" type="file" accept="image/png,image/jpeg,image/webp" onChange={event => {
          const file = event.target.files?.[0];
          const error = file && file.size > 512 * 1024 ? "El logo no puede superar 512 KB." : file && !["image/png", "image/jpeg", "image/webp"].includes(file.type) ? "Usa un logo PNG, JPG o WEBP." : "";
          event.target.setCustomValidity(error);
          if (error) event.target.reportValidity();
          setPreview(file && !error ? URL.createObjectURL(file) : null);
        }} />
        <span className="block text-xs text-muted-foreground">PNG, JPG o WEBP. Máximo 512 KB. Se mostrará centrada en los filtros del catálogo. Si no eliges otra imagen, se conserva el logo actual.</span>
      </label>
      {brand && <p className="text-sm text-muted-foreground">{count} productos · {brand.is_visible ? "Visible" : "Oculta (sus productos también están ocultos)"}</p>}
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={pending}>{pending ? "Guardando..." : brand ? "Guardar cambios" : "Crear marca"}</Button>
        {brand && <>
          <Button type="button" data-operation={brand.is_visible ? "hide" : "show"} variant="outline" disabled={pending} onClick={() => runBrandOperation(brand.is_visible ? "hide" : "show")}>{brand.is_visible ? "Ocultar" : "Mostrar"}</Button>
          <Button type="button" data-operation="delete" variant="destructive" disabled={pending || count > 0} onClick={() => { if (window.confirm(`¿Eliminar la marca ${brand.name}?`)) runBrandOperation("delete"); }}>Eliminar</Button>
        </>}
      </div>
      {brand && count > 0 && <p className="text-xs text-muted-foreground">Para eliminar esta marca, primero reasigna sus productos a otra marca.</p>}
      {state.error && <p role="alert" className="text-sm text-destructive">{state.error}</p>}
      {state.success && <p role="status" className="text-sm text-green-700">{state.success}</p>}
    </form>
  );
}

export function BrandsManager({ brands, counts }: { brands: Brand[]; counts: Record<string, number> }) {
  return <div className="space-y-5">
    <h1 className="text-2xl font-semibold">Marcas</h1>
    <p className="text-sm text-muted-foreground">Las marcas se asignan desde el formulario de cada producto. Ocultar una marca oculta sus productos; volver a mostrarla respeta la visibilidad individual de cada producto.</p>
    <BrandForm />
    {brands.map(brand => <BrandForm key={`${brand.id}-${brand.name}`} brand={brand} count={counts[brand.id] ?? 0} />)}
    {!brands.length && <p>Aún no hay marcas creadas.</p>}
  </div>;
}
