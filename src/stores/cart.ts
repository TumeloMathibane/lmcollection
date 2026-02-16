import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartStore } from "./types";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      loading: true,
      createdAt: null,
      lastModified: null,

      addItem: (cartItem: CartItem) => {
        const now = Date.now();
        const state = get();
        const exist = state.items.find(
          (i) =>
            i.productId === cartItem.productId &&
            JSON.stringify(i.options) === JSON.stringify(cartItem.options),
        );

        if (exist) {
          // console.log("Item already exists in cart, updating quantity...");
          set((s) => ({
            items: s.items.map((i) =>
              (
                i.productId === cartItem.productId &&
                JSON.stringify(i.options) === JSON.stringify(cartItem.options)
              ) ?
                { ...i, productQty: i.productQty + cartItem.productQty }
              : i,
            ),
            createdAt: s.createdAt ?? now,
            lastModified: now,
          }));

          return {
            success: true,
            action: "updated",
            newQty: exist.productQty + cartItem.productQty,
          };
        }

        // console.log("Adding new item to cart...");
        set((s) => ({
          items: [
            ...s.items,
            {
              productId: cartItem.productId,
              productName: cartItem.productName,
              productCategory: cartItem.productCategory,
              productQty: cartItem.productQty,
              productPrice: Number(cartItem.productPrice.toFixed(2)),
              productImage: cartItem.productImage,
              options: cartItem.options,
            },
          ],
          createdAt: s.createdAt ?? now,
          lastModified: now,
        }));

        return { success: true, action: "added", newQty: cartItem.productQty };
      },

      updateItemQty: (cartItem: CartItem, qty: number) => {
        set((state) => ({
          items: state.items.map((i) =>
            (
              i.productId === cartItem.productId &&
              JSON.stringify(i.options) === JSON.stringify(cartItem.options)
            ) ?
              { ...i, productQty: qty }
            : i,
          ),
          createdAt: state.createdAt,
          lastModified: Date.now(),
        }));

        return { success: true, newQty: qty };
      },

      removeItem: (cartItem: CartItem) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              i.productId !== cartItem.productId ||
              JSON.stringify(i.options) !== JSON.stringify(cartItem.options),
          ),
          createdAt: state.createdAt,
          lastModified: Date.now(),
        })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return Number(
          get()
            .items.reduce(
              (total, item) => total + item.productQty * item.productPrice,
              0,
            )
            .toFixed(2),
        );
      },
    }),
    {
      name: "cart",
      partialize: (state) => ({ items: state?.items }),
      onRehydrateStorage: () => (state) => {
        if (state) state.loading = false;
      },
    },
  ),
);
