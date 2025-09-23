"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

export default function Categories() {
  const categories = useQuery(api.categories.get);

  if (categories === undefined)
    return (
      <>
        <p className="text-center">Loading categories...</p>
      </>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 text-black z-100">
      {categories?.map(({ name, image, description }, key) => {
        if (name !== "accessories")
          return (
            <Link
              href={`/collection/products/all?category=${name}`}
              key={key}
              className="w-full md:h-auto bg-base-100 shadow-lg group hover:cursor-pointer rounded-xl overflow-hidden"
            >
              <figure className="overflow-hidden">
                <div className="transition-all origin-center duration-500 ease-in-out group-hover:scale-105 size-55 md:size-full">
                  <ImageWithFallback src={image} alt={description} />
                </div>
              </figure>
              <div className="w-full p-3 justify-center">
                <h2 className="capitalize text-xl md:text-2xl text-center font-bold group-hover:underline group-hover:underline-offset-3">
                  {name}
                </h2>
              </div>
            </Link>
          );
      })}
    </div>
  );
}
