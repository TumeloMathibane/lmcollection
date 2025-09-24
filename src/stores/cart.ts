import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore } from "./types";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      createdAt: null,
      lastModified: null,

      addItem: (
        id: string,
        name: string,
        img: string,
        size: string,
        qty = 1,
        price
      ) => {
        set((state) => {
          const now = Date.now();
          const exist = state.items.find(
            (i) => i.productId === id && i.productSize === size
          );

          if (exist) {
            return {
              items: state.items.map((i) =>
                i.productId === id && i.productSize === size
                  ? { ...i, productQty: i.productQty + qty }
                  : i
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
                productImg: img,
                productSize: size,
                productQty: qty,
                productPrice: price,
              },
            ],
          };
        });
      },

      removeItem: (id: string, size: string) =>
        set((state) => ({
          items: state.items.filter(
            (i) => i.productId !== id || i.productSize !== size
          ),
          createdAt: state.createdAt,
          lastModified: Date.now(),
        })),

      updateItemQty: (id: string, size: string, qty: number) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === id && i.productSize === size
              ? { ...i, productQty: qty }
              : i
          ),
        })),

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.productQty, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.productQty * item.productPrice,
          0
        );
      },
    }),
    {
      name: "cart",
    }
  )
);
