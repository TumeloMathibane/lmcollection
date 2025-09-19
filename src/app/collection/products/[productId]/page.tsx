"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { BiHeart } from "react-icons/bi";
import { useState } from "react";
import Loading from "./loading";
import ProductList from "@/app/ui/products/ProductList";
import QuantityInput from "@/app/ui/products/QuantityInput";
import SizeInput from "@/app/ui/products/SizeInput";
import ImageWithFallback from "@/app/ui/ImageWithFallback";
import { useCartStore } from "@/stores/cart";

export default function Product() {
  const { addItem } = useCartStore();

  const { productId } = useParams();

  const product = useQuery(api.products.getProduct, {
    id: productId,
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string | undefined>("");

  return (
    <main className="p-2 space-y-2 xl:w-[70%] xl:place-self-center-safe xl:py-10 min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em]">
      {product === undefined ? (
        <Loading />
      ) : (
        <>
          <div className="space-y-2 md:flex md:space-x-4 xl:space-x-6">
            <section className="space-y-2 md:w-1/2">
              <div className="overflow-hidden rounded-2xl flex justify-items-center-safe md:shadow-lg xl:size-100">
                <div className="object-fill object-center">
                  <ImageWithFallback
                    src={product?.image ?? undefined}
                    alt={product?.name ?? undefined}
                  />
                </div>
              </div>
              <div className="border border-stone-900 px-4 w-fit rounded-full">
                <p className="capitalize">{product?.category}</p>
              </div>
            </section>
            <section className="space-y-2 md:space-y-4 md:w-1/2">
              <p className="text-2xl text-stone-900 font-bold md:text-4xl">
                {product?.name}
              </p>
              <div className="stock-status-price flex text-lg font-light justify-between">
                <p>Stock status</p>
                <p className="before:content-['R'] before:mr-2">
                  {product?.price}
                </p>
              </div>
              <div className="flex flex-col justify-between text-lg space-y-2 space-x-3 overflow-auto">
                <div className="item-quantity w-1/2 xl:w-1/3">
                  <p>Quantity:</p>
                  <div>
                    <QuantityInput
                      quantity={quantity}
                      onChange={(value: number) => {
                        setQuantity(value);
                      }}
                      onIncrement={() =>
                        setQuantity((prevValue: number) => prevValue + 1)
                      }
                      onDecrement={() =>
                        setQuantity((prevValue: number) => prevValue - 1)
                      }
                      incrementDisable={quantity >= 50}
                    />
                  </div>
                </div>
                <div>
                  <p>Size:</p>
                  <div className="w-full overflow-auto">
                    <SizeInput
                      size={size}
                      availableSizes={product?.availableSizes}
                      onSizeChange={(value: string | undefined) =>
                        setSize(value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="border border-stone-900 rounded-xl p-3 space-y-2">
                <p className="border-b border-stone-900 pb-2 text-lg font-bold">
                  Description
                </p>
                <p className="text-justify">{product?.shortDescription}</p>
              </div>
            </section>
          </div>
          <section className="w-full flex items-center-safe space-x-2 py-2 md:w-1/2">
            <button
              onClick={() =>
                addItem(
                  product?._id,
                  product?.name,
                  product?.image,
                  size,
                  quantity
                )
              }
              className="py-1 px-4 bg-stone-900 text-stone-200 rounded-full w-full md:py-2 xl:py-3"
            >
              Add to cart
            </button>
            <BiHeart
              size={"2rem"}
              className="h-full w-fit md:border-2 border-stone-900 rounded-full md:p-1 xl:p-2"
            />
          </section>
          <div className="border-t border-stone-900 w-[50%] place-self-center-safe my-4" />
          <section>
            <p className="text-lg font-bold text-stone-900">
              Products you may like...
            </p>
            <ProductList count={5} />
          </section>
        </>
      )}
    </main>
  );
}
