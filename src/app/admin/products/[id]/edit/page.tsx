import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { updateProductAction } from "@/actions/products";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const db = getDb();
  const product = await db.products.getById(id);

  if (!product) notFound();

  const action = updateProductAction.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#2C2C2C]">
          Editar producto
        </h1>
        <p className="text-sm text-[#2C2C2C]/70">{product.name}</p>
      </div>
      <ProductForm product={product} action={action} />
    </div>
  );
}
