"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cart";
import type { Product } from "../(overview)/collection/products/types";
import { BiHeart } from "react-icons/bi";
import ImageWithFallback from "./ImageWithFallback";
import QuantityInput from "./QuantityInput";
import SizeInput from "./ui/products/SizeInput";

export default function ProductView({
  product,
}: {
  product: Product | undefined;
}) {
  const { addItem } = useCartStore();

  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string | undefined>("");

  useEffect(() => window.scrollTo(0, 0), []);

  return (
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
            <p className="before:content-['R'] before:mr-1">{product?.price}</p>
          </div>
          <div className="flex justify-between text-lg space-y-2 space-x-4">
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
            <div className="w-2/3">
              <p>Size:</p>
              <div className="overflow-auto">
                <SizeInput
                  size={size}
                  availableSizes={product?.availableSizes}
                  onSizeChange={(value: string | undefined) => setSize(value)}
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
      <section className="w-[full] flex items-center-safe space-x-2 py-2 md:w-3/7 lg:py-0">
        <button
          onClick={() =>
            product?._id &&
            product?.name &&
            product?.image &&
            size &&
            quantity &&
            product?.price &&
            (addItem(
              product?._id,
              product?.name,
              product?.image,
              size,
              quantity,
              product?.price
            ),
            setSize(""),
            setQuantity(0))
          }
          className="py-1 px-4 bg-stone-900 text-stone-200 rounded-full w-full hover:cursor-pointer md:py-2 xl:py-3"
        >
          Add to cart
        </button>
        <BiHeart
          size={"2.5rem"}
          className="h-full w-fit hover:cursor-pointer md:border-2 border-stone-900 rounded-full md:p-1 xl:p-1"
        />
      </section>
    </>
  );
}
