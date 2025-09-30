"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { ProductCard } from "@/app/components/ui/products/Card";
import Loading from "./loading";
import { useSearchParams } from "next/navigation";

export default function Catalog() {
  const filter = useSearchParams();
  const products = useQuery(api.products.get, {
    category: filter?.get("category") || undefined,
  });

  return (
    <main className="container place-self-center-safe p-2 space-y-4 xl:w-[70%] min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em]">
      <p className="text-4xl font-bold text-stone-900 text-center xl:text-6xl xl:py-2">
        Products
      </p>
      <p>
        This is the catalog page.{" "}
        {products &&
          `(${products?.length}) ${products?.length > 1 ? "products" : "product"}`}
      </p>

      {products === undefined ? (
        <Loading />
      ) : (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
          {products?.map((product, key) => {
            return <ProductCard key={key} product={product} />;
          })}
        </div>
      )}
    </main>
  );
}
