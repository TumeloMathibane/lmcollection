export type CartItem = {
  productId: string;
  productName: string;
  productSize: string;
  productQty: number;
  productPrice: number;
  productImage: string;
};

export type CartStore = {
  items: CartItem[];
  loading: boolean;
  addItem: (
    id: string,
    name: string,
    size: string,
    qty: number,
    price: number,
    img: string,
  ) => void;
  removeItem: (id: string, size: string) => void;
  updateItemQty: (id: string, size: string, qty: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  createdAt: number | null;
  lastModified: number | null;
};
