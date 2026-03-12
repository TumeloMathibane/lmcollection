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

            {/* <div className="add-to-cart absolute top-0 left-0 right-0 w-full h-full">
              {product.quantity < 20 ?
                <span className="badge badge-error m-2 font-semibold">
                  {product.quantity}{" "}
                  {product.quantity === 1 ? "item left" : "items left"}
                </span>
              : <span className="badge badge-success m-2 font-semibold text-black">
                  In stock
                </span>
              }
            </div> */}

            {/* <div className="add-to-cart absolute top-0 left-0 right-0 w-full h-full">
              {product.quantity <= 5 && (
                <span className="badge badge-error m-2 font-semibold">
                  {product.quantity}{" "}
                  {product.quantity === 1 ? "item left" : "items left"}
                </span>
              )}
            </div> */}

            <div className="absolute top-0 left-0 right-0 w-full h-full">
              {!product.availability && (
                <div className="border border-red-600 rounded-md w-fit m-1 px-1 py-0.5 bg-red-300/50">
                  <p className="text-red-600 font-semibold">Out of stock</p>
                </div>
              )}
            </div>
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
