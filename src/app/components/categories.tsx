"use client";

import { categories } from "../lib/categories.json";
import Link from "next/link";
import Image from "next/image";

export default function Categories() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 text-black z-100">
      {categories?.map(({ name, image, description }, key) => {
        if (name !== "accessories" && name !== "appliances")
          return (
            <Link
              href={`/collection/products/all?category=${name}`}
              key={key}
              className="w-full bg-base-100 shadow-lg group hover:cursor-pointer rounded-xl overflow-hidden">
              <figure className="w-full overflow-hidden">
                <div className="w-full h-50 transition-all origin-center duration-500 ease-in-out group-hover:scale-105">
                  <Image
                    src={image || "/category-img/default.jpg"}
                    alt={description}
                    width={400}
                    height={500}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              </figure>
              <div className="p-2 justify-center">
                <h2 className="capitalize text-xl text-center font-bold group-hover:underline group-hover:underline-offset-3">
                  {name}
                </h2>
              </div>
            </Link>
          );
      })}
    </div>
  );
}
