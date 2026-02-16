export type CartItem = {
  productId: string;
  productPrice: number;
  productName: string;
  productCategory: string;
  productQty: number;
  productImage: string;
  options: { [key: string]: string };
};

export type CartStore = {
  items: CartItem[];
  loading: boolean;
  addItem: (item: CartItem) => {
    success: boolean;
    action: "added" | "updated";
    newQty?: number;
  };
  updateItemQty: (
    cartItem: CartItem,
    qty: number,
  ) => { success: boolean; newQty: number };
  removeItem: (cartItem: CartItem) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  createdAt: number | null;
  lastModified: number | null;
};
