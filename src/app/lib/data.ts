import localProducts from "@/data/new-product-catalog.json";
import { Product } from "../(overview)/collection/products/types";

// this function is for the local retrieval of products...
export function getProducts(category?: string, count?: number): Product[] {
  const filteredProducts: Product[] = [];
  const countedProducts: Product[] = [];

  if (category === undefined && count === undefined) return localProducts;

  if (category !== undefined) {
    localProducts.map((product) => {
      if (product?.category === category) filteredProducts?.push(product);
    });
  }

  if (count !== undefined) {
    if (filteredProducts.length > 0) {
      for (let i = 0; i < count; i++) {
        countedProducts?.push(filteredProducts[i]);
      }
    } else {
      for (let i = 0; i < count; i++) {
        countedProducts?.push(localProducts[i]);
      }
    }
    return countedProducts;
  } else {
    return filteredProducts;
  }
}

export function getProduct(id: string): Product {
  const product = localProducts.filter((product) => product?._id === id);

  return product[0];
}
