"use client";

import type { Product } from "../(overview)/collection/products/types";
import { ProductCard } from "./ui/products/Card";
import { useEffect } from "react";

export default function CollectionView({
  products,
}: {
  products: Product[] | undefined;
}) {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div
      className={`grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-${products && products.length > 4 && "4"}`}>
      {products?.map((product, key) => {
        return (
          <div key={key}>
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
}
