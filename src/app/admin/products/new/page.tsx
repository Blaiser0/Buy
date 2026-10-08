import { ProductForm } from "@/components/admin/product-form";
import { createProductAction } from "@/actions/products";
import { listBrands } from "@/lib/db/brands";

export default async function NewProductPage() {
  const brands = await listBrands();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#2C2C2C]">
          Crear nuevo producto
        </h1>
        <p className="text-sm text-[#2C2C2C]/70">
          Completa los campos y sube una imagen opcional.
        </p>
      </div>
      <ProductForm action={createProductAction} brands={brands} />
    </div>
  );
}
