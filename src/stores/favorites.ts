import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavoritesStore = {
  favorites: string[];
  loading: boolean;
  createdAt: number | null;
  lastModified: number | null;

  addFavorite: (productId: string) => { success: boolean };
  removeFavorite: (productId: string) => void;
  toggleFavorite: (productId: string) => { isFavorite: boolean };
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
  getCount: () => number;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      loading: true,
      createdAt: null,
      lastModified: null,

      addFavorite: (productId: string) => {
        const now = Date.now();
        const { favorites } = get();
        if (favorites.includes(productId)) return { success: true };

        set((state) => ({
          favorites: [...state.favorites, productId],
          createdAt: state.createdAt ?? now,
          lastModified: now,
        }));

        return { success: true };
      },

      removeFavorite: (productId: string) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== productId),
          createdAt: state.createdAt,
          lastModified: Date.now(),
        })),

      toggleFavorite: (productId: string) => {
        const { favorites } = get();
        if (favorites.includes(productId)) {
          set((state) => ({
            favorites: state.favorites.filter((id) => id !== productId),
            createdAt: state.createdAt,
            lastModified: Date.now(),
          }));

          return { isFavorite: false };
        }

        const now = Date.now();
        set((state) => ({
          favorites: [...state.favorites, productId],
          createdAt: state.createdAt ?? now,
          lastModified: now,
        }));

        return { isFavorite: true };
      },

      isFavorite: (productId: string) => get().favorites.includes(productId),

      clearFavorites: () => set({ favorites: [] }),

      getCount: () => get().favorites.length,
    }),
    {
      name: "favorites",
      partialize: (state) => ({ favorites: state?.favorites }),
      onRehydrateStorage: () => (state) => {
        if (state) state.loading = false;
      },
    },
  ),
);

export default useFavoritesStore;
