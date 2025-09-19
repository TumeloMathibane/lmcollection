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
                  <ImageWithFallback
                    src={image}
                    alt={description}
                    fallbackSrc="https://placehold.jp/ffffff/595959/400x500.png?text=No%20Image&css=%7B%22border-radius%22%3A%2215px%22%2C%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23666666)%2C%20to(%23cccccc))%22%7D"
                  />
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
