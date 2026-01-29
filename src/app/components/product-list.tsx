"use client";

import Link from "next/link";
import ProductListSkeleton from "./ui/home/productlist-skeleton";
import Image from "next/image";
import type { Product } from "../(overview)/collection/products/types";

export default function ProductList({ products }: { products: Product[] }) {
  if (!products) {
    return (
      <div className="flex space-x-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductListSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex overflow-x-auto gap-2 md:grid md:grid-cols-3 lg:grid-cols-3 lg:gap-2">
      {products?.map(({ _id, name, price, images }) => (
        <Link key={_id} href={`/collection/products/${_id}`} className="w-full">
          <div className="w-45 md:w-full h-full bg-stone-100 shadow-sm rounded-xl overflow-hidden group hover:cursor-pointer relative">
            <figure className="overflow-hidden flex items-center w-full h-auto sm:w-full">
              <div className="transition-all duration-500 group-hover:scale-105 w-full">
                <Image
                  src={images[0] ?? ""}
                  alt={name}
                  width={500}
                  height={500}
                  className="object-cover object-center h-40 w-full"
                />
              </div>
            </figure>

            <div className="w-full px-3 py-1 transition-all duration-300 ease-out lg:translate-y-[150%] lg:absolute bottom-0 left-0 right-0 group-hover:translate-0 lg:bg-stone-100">
              <h2 className="capitalize w-full text-md font-bold text-nowrap truncate lg:text-wrap md:text-xl lg:text-base">
                {name}
              </h2>
              <p className="before:content-['R'] before:mr-1">{price}</p>
            </div>
          </div>
        </Link>
      ))}
      <div className="flex items-center-safe md:col-span-1 xl:justify-center-safe">
        <Link
          href="/collection/products/all"
          className="btn rounded-xl border border-stone-300 text-black md:w-full">
          View all
        </Link>
      </div>
    </div>
  );
}
