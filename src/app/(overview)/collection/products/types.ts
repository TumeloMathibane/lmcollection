import { Id } from "@/convex/_generated/dataModel";

export type Category = {
  name: string;
  image: string;
  shortDescription?: string;
};

export type Product = {
  _id: Id<"product"> | string;
  name: string;
  price: number;
  discount: number;
  availableQuantity: number;
  image: string;
  category: string;
};
