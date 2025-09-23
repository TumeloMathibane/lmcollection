"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ImageWithFallback from "./ImageWithFallback";

export default function ProductList({ count }: { count?: number }) {
  const _products = useQuery(api.products.get, { count: count });

  if (_products === undefined)
    return (
      <>
        <p className="text-center">Loading products...</p>
      </>
    );

  return (
    <div className="flex py-2 gap-2 md:gap-4 lg:gap-5 overflow-x-auto snap-x snap-proximity md:grid md:grid-cols-3 lg:grid-cols-4">
      {_products?.map(({ _id, name, price, image }) => (
        <Link key={_id} href={`/collection/products/${_id}`}>
          <div className="w-48 md:w-60 lg:w-full bg-stone-100 shadow-sm md:shadow-md group hover:cursor-pointer rounded-xl overflow-hidden relative">
            <figure className="overflow-hidden flex items-center">
              <div className="transition-all duration-500 group-hover:scale-105 size-full">
                <ImageWithFallback src={image} alt={name} />
              </div>
            </figure>
            <div className="p-3 transition-all duration-300 ease-out lg:translate-y-[150%] lg:absolute bottom-0 left-0 right-0 group-hover:translate-0 lg:bg-stone-100">
              <h2 className="capitalize w-full text-md md:text-xl lg:text-base font-bold text-nowrap truncate">
                {name}
              </h2>
              <p>{price}</p>
            </div>
          </div>
        </Link>
      ))}
      <div className="flex items-center-safe md:col-span-1 xl:justify-center">
        <Link
          href="/collection/products/all"
          className="btn rounded-xl border border-stone-300 text-black md:w-1/2"
        >
          View all
        </Link>
      </div>
    </div>
  );
}
