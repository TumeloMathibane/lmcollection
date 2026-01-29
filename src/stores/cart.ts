import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartStore } from "./types";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      loading: true,
      createdAt: null,
      lastModified: null,

      addItem: (
        id: string,
        name: string,
        size: string,
        qty = 1,
        price: number,
      ) => {
        set((state) => {
          const now = Date.now();
          const exist = state.items.find(
            (i) => i.productId === id && i.productSize === size,
          );

          if (exist) {
            return {
              items: state.items.map((i) =>
                i.productId === id && i.productSize === size ?
                  { ...i, productQty: i.productQty + qty }
                : i,
              ),
              createdAt: state.createdAt ?? now,
              lastModified: now,
            };
          }

          return {
            items: [
              ...state.items,
              {
                productId: id,
                productName: name,
                productSize: size,
                productQty: qty,
                productPrice: Number(price.toFixed(2)),
              },
            ],
          };
        });
      },

      removeItem: (id: string, size: string) =>
        set((state) => ({
          items: state.items.filter(
            (i) => i.productId !== id || i.productSize !== size,
          ),
          createdAt: state.createdAt,
          lastModified: Date.now(),
        })),

      updateItemQty: (id: string, size: string, qty: number) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === id && i.productSize === size ?
              { ...i, productQty: qty }
            : i,
          ),
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
