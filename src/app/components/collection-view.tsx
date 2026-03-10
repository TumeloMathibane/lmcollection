"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "./ui/products/Card";
import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Product } from "../(overview)/collection/products/types";
import Loading from "@/(overview)/collection/products/all/loading";
import ProductFilter from "./ui/products/product-filter";

//! TODO: implement filter component
//! TODO: implement sorting component

export default function CollectionView({ category }: { category: string }) {
  const products: Product[] | undefined = useQuery(api.products.getProducts, {
    category: category === "" ? undefined : category,
  });
  let displayProducts = products;

  const searchParams = useSearchParams();
  if (
    searchParams.get("availability") !== "" &&
    searchParams.get("availability") !== null &&
    searchParams.get("availability") !== undefined
  ) {
    if (searchParams.get("availability") === "In stock") {
      displayProducts = displayProducts?.filter(
        (product) => product?.quantity > 0,
      );
    } else {
      displayProducts = displayProducts?.filter(
        (product) => product?.quantity === 0,
      );
    }
  }

  if (
    (searchParams.get("minPrice") !== null &&
      searchParams.get("minPrice") !== undefined) ||
    (searchParams.get("maxPrice") !== null &&
      searchParams.get("maxPrice") !== undefined &&
      !Number.isNaN(searchParams.get("minPrice")) &&
      !Number.isNaN(searchParams.get("maxPrice")))
  ) {
    displayProducts = displayProducts?.filter(
      (product) =>
        product?.price >= Number(searchParams.get("minPrice")) &&
        product?.price <= Number(searchParams.get("maxPrice")),
    );
  } else if (
    Number.isNaN(searchParams.get("minPrice")) &&
    Number.isNaN(searchParams.get("maxPrice"))
  ) {
    displayProducts = products;
  }

  if (
    searchParams.get("sorting") !== "" &&
    searchParams.get("sorting") !== null &&
    searchParams.get("sorting") !== undefined
  ) {
    const [sortBy, order] = searchParams.get("sorting")?.split("-") ?? [];
    if (
      sortBy.toLowerCase().trim() === "name" &&
      order.toLowerCase().trim() === "asc."
    ) {
      displayProducts?.sort((a, b) => a.name.localeCompare(b.name));
    } else if (
      sortBy.toLowerCase().trim() === "name" &&
      order.toLowerCase().trim() === "desc."
    ) {
      displayProducts?.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (
      sortBy.toLowerCase().trim() === "price" &&
      order.toLowerCase().trim() === "asc."
    ) {
      displayProducts?.sort((a, b) => a.price - b.price);
    } else if (
      sortBy.toLowerCase().trim() === "price" &&
      order.toLowerCase().trim() === "desc."
    ) {
      displayProducts?.sort((a, b) => b.price - a.price);
    }
  }

  useEffect(() => window.scrollTo(0, 0), []);

  if (!products) return <Loading />;

  return (
    <div className="flex flex-col space-y-2 py-4 px-2 items-center-safe">
      <p className="text-4xl font-bold text-stone-900">Products</p>

      <div className="w-full space-y-2 sm:max-w-2xl lg:max-w-5xl">
        <ProductFilter
          heading={`Filter (${displayProducts?.length ?? 0} products)`}
          noOfProducts={displayProducts?.length}
        />

        <div className="space-y-4">
          <div
            className={`grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4`}>
            {displayProducts?.length === 0 ?
              <div className="col-span-full">
                <p className="text-2xl font-bold text-stone-900 text-center xl:py-2">
                  No products
                </p>
              </div>
            : displayProducts?.map((product) => {
                return (
                  <div key={product?._id}>
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
