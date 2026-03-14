import type { Product } from "@/(overview)/collection/products/types";
import Link from "next/link";
import ImageWithFallback from "../../image-with-fallback";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import useFavoritesStore from "../../../../stores/favorites";

export function ProductCard({ product }: { product: Product }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  return (
    <div className="col-span-1 group hover:cursor-pointer">
      <div className="flex flex-col relative">
        <div className="absolute top-2 right-2 z-2">
          {!isFavorite(product._id) ?
            <BsSuitHeart
              size={"1.4rem"}
              className="text-gray-400"
              onClick={() => toggleFavorite(product._id)}
            />
          : <BsSuitHeartFill
              size={"1.4rem"}
              className="text-red-600"
              onClick={() => toggleFavorite(product._id)}
            />
          }
        </div>

        <Link href={`/collection/products/${product._id}`}>
          <div className="w-full relative rounded-md overflow-hidden">
            <figure className="h-52 transition-all ease-in-out duration-500 group-hover:scale-105">
              <ImageWithFallback
                src={product?.images[0] ?? ""}
                alt={product.name}
              />
            </figure>

            {product?.availability === "out-of-stock" && (
              <div className="absolute top-2 left-2 right-0 w-full h-full">
                <span className="bg-red-500/50 text-red-200 p-1 rounded-md font-semibold">
                  Out of stock
                </span>
              </div>
            )}
          </div>

          <div className="h-full pt-1">
            <p className="text-sm md:text-md font-light md:font-extralight hover:cursor-pointer">
              {product.brand}
            </p>

            <p className="text-md md:text-md font-bold hover:cursor-pointer">
              {product.name}
            </p>

            <p className="md:text-md hover:cursor-pointer">
              {new Intl.NumberFormat("en-ZA", {
                style: "currency",
                currency: "ZAR",
              }).format(product?.price)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
