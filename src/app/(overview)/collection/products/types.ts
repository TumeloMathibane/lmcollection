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
  shortDescription: string;
  availableSizes: string[];
  availableQuantity: number;
  category: string;
  image: string;
  additional_options?: { [key: string]: string[] | string } | object;
};
