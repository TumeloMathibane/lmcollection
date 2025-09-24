export type CartItem = {
  productId: string;
  productName: string;
  productImg: string;
  productSize: string;
  productQty: number;
  productPrice: number;
};

export type CartStore = {
  items: CartItem[];
  addItem: (
    id: string,
    name: string,
    img: string,
    size: string,
    qty: number,
    price: number
  ) => void;
  removeItem: (id: string, size: string) => void;
  updateItemQty: (id: string, size: string, qty: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getTotalPrice: () => number;
  createdAt: number | null;
  lastModified: number | null;
};
