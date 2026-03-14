import { Id } from "@/convex/_generated/dataModel";

export type Category = {
  name: string;
  image: string;
  shortDescription?: string;
};

export type Product = {
  _id: Id<"product">;
  brand?: string;
  name: string;
  price: number;
  discount?: number;
  shortDescription?: string;
  availability: "in-stock" | "out-of-stock";
  category: string;
  images: string[];
  additional_options: Record<string, string>[];
  dynamic_pricing: boolean;
  pricing_by: string;
  sale?: string;
};
