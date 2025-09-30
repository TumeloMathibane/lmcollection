export type Category = {
  name: string;
  image: string;
  shortDescription?: string;
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  discount: number;
  availableQuantity: number;
  image: string;
  category: string;
};
