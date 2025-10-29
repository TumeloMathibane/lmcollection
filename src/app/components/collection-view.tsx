"use client";

import type { Product } from "../(overview)/collection/products/types";
import { ProductCard } from "./ui/products/card";
import { useEffect } from "react";

export default function CollectionView({
  products,
}: {
  products: Product[] | undefined;
}) {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {products?.map((product, key) => {
          return <ProductCard key={key} product={product} />;
        })}
      </div>
    </>
  );
}
