import type { Product } from "@/app/collection/products/types";
import { BiPlusCircle } from "react-icons/bi";
import Link from "next/link";
import ImageWithFallback from "../../ImageWithFallback";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/collection/products/${product._id}`} className="group">
      <div className="relative overflow-hidden rounded-md">
        {/* <Image
          src={`${product.image.includes("example.com") ? `/category-img/${product.category}.jpg` : product.image}`}
          alt={product.name}
          width={500}
          height={500}
          className="w-full size-max object-cover object-top transition-all duration-500 group-hover:scale-105 origin-center"
        /> */}
        <div className="w-full size-max object-cover object-top transition-all duration-500 group-hover:scale-105 origin-center">
          <ImageWithFallback src={product.image} alt={product.name} />
        </div>
        <div className="add-to-cart absolute top-0 left-0 right-0 w-full h-full">
          <BiPlusCircle
            size={"2em"}
            className="absolute right-0 stroke-black stroke-[0.3px] fill-stone-300 m-2"
          />
          {product.availableQuantity < 20 ? (
            <span className="badge badge-error m-2 font-semibold">
              {product.availableQuantity}{" "}
              {product.availableQuantity === 1 ? "item left" : "items left"}
            </span>
          ) : (
            <span className="badge badge-success m-2 font-semibold">
              In stock
            </span>
          )}
        </div>
      </div>
      <div className="w-fit pt-1">
        <p className="text-sm md:text-md font-light md:font-extralight hover:cursor-pointer">
          Brand name
        </p>
        <p className="text-md md:text-xl font-bold hover:cursor-pointer">
          {product.name}
        </p>
        <p className="md:text-md before:content-['R'] before:mr-1 hover:cursor-pointer">
          {product.price}
        </p>
      </div>
    </Link>
  );
}
