"use client";

import { useQuery } from "convex/react";
import type { Product } from "../(overview)/collection/products/types";
import { ProductCard } from "./ui/products/Card";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import Loading from "@/(overview)/collection/products/all/loading";

export default function CollectionView({ category }: { category: string }) {
  const products: Product[] | undefined = useQuery(api.products.getProducts, {
    category: category === "" ? undefined : category,
  });

  useEffect(() => window.scrollTo(0, 0), []);

  if (!products) return <Loading />;

  // if (products?.length === 0) {
  //   return (
  //     <>
  //       <main className="flex-1 flex justify-center-safe items-center-safe">
  //         <p className="text-4xl font-bold text-stone-900 text-center xl:py-2">
  //           No products
  //         </p>
  //       </main>
  //     </>
  //   );
  // }

  return (
    <div className="flex flex-col space-y-2 py-4 px-2 items-center-safe">
      <p className="text-4xl font-bold text-stone-900">Products</p>

      <div className="w-full sm:max-w-2xl lg:max-w-5xl">
        <div className="space-y-4">
          <div className="border-b border-stone-300 pb-3">
            <p>
              This is the catalog page.{" "}
              {products &&
                `(${products?.length}) ${products?.length > 1 || products?.length === 0 ? "products" : "product"}`}
            </p>
          </div>

          <div
            className={`grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4`}>
            {products?.length === 0 ?
              <div className="col-span-full">
                <p className="text-2xl font-bold text-stone-900 text-center xl:py-2">
                  No products
                </p>
              </div>
            : products.map((product, key) => {
                return (
                  <div key={key}>
                    <ProductCard product={product} />
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
