import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logoutAction } from "@/actions/auth";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdmin();

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-[#F8F6F0]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div className="space-y-1">
            <BrandLogo href="/admin/products" imageClassName="h-8 md:h-9" />
            <p className="text-xs text-[#2C2C2C]/70">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Ver tienda
            </Link>
            <form action={logoutAction}>
              <Button type="submit" variant="ghost" size="sm">
                Cerrar sesión
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
