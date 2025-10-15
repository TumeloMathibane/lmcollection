import localProducts from "@/data/new-product-catalog.json";
import { Product } from "../(overview)/collection/products/types";

// this function is for the local retrieval of products...
export function getProducts(category?: string, count?: number): Product[] {
  if (category === undefined && (count === undefined || count === undefined))
    return localProducts;

  // filter by category
  let categorisedProducts: Product[] = [];
  if (category) {
    categorisedProducts = localProducts?.filter(
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
