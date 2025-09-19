import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  productId: string;
  productSize: string;
  productQty: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (id?: string, size?: string, qty?: number) => void;
  removeItem: (id: string, size: string) => void;
  updateItemQty: (id: string, size: string, qty: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  createdAt: number | null;
  lastModified: number | null;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      createdAt: null,
      lastModified: null,

      addItem: (id, size, qty = 1) => {
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
              { productId: id, productSize: size, productQty: qty },
            ],
          };
        });
      },

      removeItem: (id, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => i.productId === id && i.productSize === size
          ),
          createdAt: state.createdAt,
          lastModified: Date.now(),
        })),

      updateItemQty: (id, size, qty) =>
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
    }),
    {
      name: "cart",
    }
  )
);
