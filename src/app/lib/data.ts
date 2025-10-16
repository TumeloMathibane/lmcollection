import localProducts from "@/data/new-product-catalog.json";
import { Product } from "../(overview)/collection/products/types";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

// this function is for the local retrieval of products...
export async function getProducts(
  category?: string,
  count?: number
): Promise<Product[]> {
  const products: Product[] =
    process.env.VERCEL_ENV === "production"
      ? await fetchQuery(api.products.get, {})
      : localProducts;

  if (category === undefined && count === undefined) return products;

  // filter by category
  let categorisedProducts: Product[] = [];
  if (category) {
    categorisedProducts = products?.filter(
      (product) => product?.category === category
    );
  }

  // return n products as per 'count' params
  let countedProducts: Product[] = [];
  if (count) {
    if (categorisedProducts.length > 0) {
      categorisedProducts.forEach(
        (product, index) => index < count && countedProducts.push(product)
      );
    } else {
      localProducts.forEach(
        (product, index) => index < count && countedProducts.push(product)
      );
    }
  } else {
    countedProducts = categorisedProducts;
  }

  return countedProducts;
}

export function getProduct(id: string): Product {
  const product = localProducts.filter((product) => product?._id === id);

  return product[0];
}
