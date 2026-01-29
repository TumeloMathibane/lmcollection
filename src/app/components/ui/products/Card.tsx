import type { Product } from "@/(overview)/collection/products/types";
import Link from "next/link";
import ImageWithFallback from "../../image-with-fallback";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/collection/products/${product._id}`} className="group">
      <div className="flex flex-col">
        <div className="w-full relative rounded-md overflow-hidden">
          <figure className="h-40 transition-all duration-500 group-hover:scale-105">
            <ImageWithFallback
              src={product?.images[0] ?? ""}
              alt={product.name}
            />
          </figure>

          <div className="add-to-cart absolute top-0 left-0 right-0 w-full h-full">
            {product.quantity < 20 ?
              <span className="badge badge-error m-2 font-semibold">
                {product.quantity}{" "}
                {product.quantity === 1 ? "item left" : "items left"}
              </span>
            : <span className="badge badge-success m-2 font-semibold text-black">
                In stock
              </span>
            }
          </div>
        </div>

        <div className="h-full pt-1">
          <p className="text-sm md:text-md font-light md:font-extralight hover:cursor-pointer">
            {product.brand}
          </p>
          <p className="text-md md:text-xl font-bold hover:cursor-pointer">
            {product.name}
          </p>
          <p className="md:text-md before:content-['R'] before:mr-1 hover:cursor-pointer">
            {product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}
