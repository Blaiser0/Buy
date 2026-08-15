"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BoutiqueFooter } from "@/components/layout/boutique-footer";
import { ProductBoutiqueChrome } from "@/components/products/boutique/product-boutique-chrome";
import { ShopDrawers } from "@/components/shop/shop-drawers";
import { ShopProvider } from "@/components/shop/shop-provider";

export function ShopShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isProductDetail = /^\/productos\/[^/]+$/.test(pathname);

  return (
    <ShopProvider>
      {isProductDetail ? (
        <div className="flex min-h-dvh flex-col bg-white text-[#2C2C2C] lg:h-dvh lg:overflow-hidden">
          <ProductBoutiqueChrome />
          <main className="min-h-0 w-full flex-1 overflow-y-auto">{children}</main>
        </div>
      ) : (
        <div className="flex min-h-screen flex-col bg-white">
          <ProductBoutiqueChrome />
          <main className="w-full flex-1">{children}</main>
          <BoutiqueFooter />
        </div>
      )}
      <ShopDrawers />
    </ShopProvider>
  );
}
