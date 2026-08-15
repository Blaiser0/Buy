"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ShopItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
};

type ShopContextValue = {
  cart: ShopItem[];
  wishlist: ShopItem[];
  cartCount: number;
  wishlistCount: number;
  cartOpen: boolean;
  wishlistOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  addToCart: (item: Omit<ShopItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (item: Omit<ShopItem, "quantity">) => void;
  isInWishlist: (id: string) => boolean;
  cartTotal: number;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = "buyu-cart";
const WISHLIST_KEY = "buyu-wishlist";

function readStorage(key: string): ShopItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ShopItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(key: string, items: ShopItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(items));
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopItem[]>([]);
  const [wishlist, setWishlist] = useState<ShopItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readStorage(CART_KEY));
    setWishlist(readStorage(WISHLIST_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(CART_KEY, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(WISHLIST_KEY, wishlist);
  }, [wishlist, hydrated]);

  const addToCart = useCallback(
    (item: Omit<ShopItem, "quantity">, quantity = 1) => {
      setCart((prev) => {
        const existing = prev.find((entry) => entry.id === item.id);
        if (existing) {
          return prev.map((entry) =>
            entry.id === item.id
              ? { ...entry, quantity: entry.quantity + quantity }
              : entry,
          );
        }
        return [...prev, { ...item, quantity }];
      });
      setWishlistOpen(false);
      setCartOpen(true);
    },
    [],
  );

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const updateCartQuantity = useCallback((id: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.id === id
            ? { ...entry, quantity: Math.max(1, quantity) }
            : entry,
        )
        .filter((entry) => entry.quantity > 0),
    );
  }, []);

  const toggleWishlist = useCallback((item: Omit<ShopItem, "quantity">) => {
    setWishlist((prev) => {
      const exists = prev.some((entry) => entry.id === item.id);
      if (exists) return prev.filter((entry) => entry.id !== item.id);
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const isInWishlist = useCallback(
    (id: string) => wishlist.some((entry) => entry.id === id),
    [wishlist],
  );

  const value = useMemo<ShopContextValue>(
    () => ({
      cart,
      wishlist,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      wishlistCount: wishlist.length,
      cartOpen,
      wishlistOpen,
      setCartOpen: (open) => {
        setCartOpen(open);
        if (open) setWishlistOpen(false);
      },
      setWishlistOpen: (open) => {
        setWishlistOpen(open);
        if (open) setCartOpen(false);
      },
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleWishlist,
      isInWishlist,
      cartTotal: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    }),
    [
      cart,
      wishlist,
      cartOpen,
      wishlistOpen,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleWishlist,
      isInWishlist,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error("useShop must be used within ShopProvider");
  }
  return ctx;
}
