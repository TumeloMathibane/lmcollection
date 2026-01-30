"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../../stores/cart";
import type { Product } from "../(overview)/collection/products/types";
import { BiHeart } from "react-icons/bi";
import ImageWithFallback from "./image-with-fallback";
import QuantityInput from "./quantity-input";
import SizeInput from "./ui/products/size-input";

export default function ProductView({ product }: { product: Product }) {
  const { addItem } = useCartStore();

  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string | undefined>("one-size");
  // const [color, setColor] = useState<string | undefined>("");

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <div className="space-y-2 md:flex md:space-x-4 xl:space-x-6">
        <section className="w-full space-y-2 md:w-1/2">
          <div className="overflow-hidden rounded-2xl flex justify-items-center-safe md:shadow-lg relative">
            <div className="w-full h-full object-cover object-center">
              <ImageWithFallback
                src={product?.images[0] ?? ""}
                alt={product?.name ?? ""}
              />
            </div>

            <span
              className={`absolute top-2 left-2 text-sm flex items-center-safe rounded-full border border-stone-700 px-4 ${product?.quantity && product?.quantity > 0 ? "bg-green-100/50 text-green-800" : "bg-red-100 text-red-800"}`}>
              {product?.quantity && product?.quantity > 0 ?
                "In Stock"
              : "Out of Stock"}
            </span>
          </div>

          <div className="border border-stone-900 px-4 w-fit rounded-full">
            <p className="capitalize">{product?.category}</p>
          </div>
        </section>

        <section className="space-y-2 md:space-y-4 md:w-1/2">
          <div>
            <p className="text-2xl text-stone-900 font-bold md:text-4xl">
              {product?.name}
            </p>
            <p className="text-sm text-stone-500">{product?.brand}</p>
          </div>

          <div className="stock-status-price flex text-lg font-light justify-between">
            <p className="before:mr-1">
              {new Intl.NumberFormat("en-ZA", {
                style: "currency",
                currency: "ZAR",
              }).format(product?.price)}
            </p>
          </div>

          <div className="flex justify-between text-lg space-y-2 space-x-4 mb-4">
            <div className="item-quantity w-1/3 xl:w-1/3">
              <p>Quantity:</p>
              <div className="w-full">
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
                  incrementDisable={quantity >= product?.quantity}
                />
              </div>
            </div>

            {product?.additional_options?.find(
              (option) => option.label === "size",
            ) && (
              <div className="w-2/3">
                <p>Size:</p>
                <div className="overflow-auto">
                  <SizeInput
                    size={size}
                    availableSizes={
                      (product?.additional_options?.find(
                        (option) => option.label === "size",
                      )?.values as string[]) || []
                    }
                    onSizeChange={(value: string | undefined) => setSize(value)}
                  />
                </div>
              </div>
            )}
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
          // product?._id &&
          // product?.name &&
          // size &&
          // quantity &&
          // product?.price &&
          // (addItem(
          //   product?._id,
          //   product?.name,
          //   size,
          //   quantity,
          //   product?.price,
          // ),
          // setSize(""),
          // setQuantity(0))
          onClick={() => {
            console.log("Add to cart clicked");
            if (
              product?._id &&
              product?.name &&
              size &&
              quantity &&
              product?.price &&
              product?.images[0]
            ) {
              addItem(
                product?._id,
                product?.name,
                size,
                quantity,
                product?.price,
                product?.images[0],
              );
              setSize("");
              setQuantity(1);
            } else {
              console.error(`Failed to add item to cart. Missing information:
              productId: ${product?._id},
              productName: ${product?.name},
              size: ${size},
              quantity: ${quantity},
              price: ${product?.price}`);
            }
          }}
          className="py-1 px-4 bg-stone-900 text-stone-200 rounded-full w-full hover:cursor-pointer md:py-2 xl:py-3">
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
