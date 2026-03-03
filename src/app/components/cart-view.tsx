"use client";

import { useCartStore } from "../../stores/cart";
import Link from "next/link";
import { BiX } from "react-icons/bi";
import Image from "next/image";
import QuantityInput from "./quantity-input";
import CartSummary from "./ui/cart/cart-summary";
import Loading from "../(overview)/cart/loading";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import type { Product } from "@/(overview)/collection/products/types";

export default function CartView() {
  const { loading, items, updateItemQty, removeItem, clearCart } =
    useCartStore();

  const cItems: Product[] | undefined =
    (useQuery(api.products.getProductsByIds, {
      ids: items.map((item) => item.productId as Id<"product">),
    }) as Product[]) ?? undefined;

  if (loading) return <Loading />;

  if (items.length === 0) {
    return (
      <div className="flex-1 flex justify-around items-center-safe">
        <div className="space-y-3 md:space-y-5 flex flex-col items-center-safe xl:w-[80%]">
          <p className="text-2xl text-stone-900 text-center font-bold md:text-4xl">
            Your cart is empty
          </p>
          <Link href="/collection/products/all" className="btn font-bold">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col xl:w-[80%] xl:place-self-center-safe">
      <p className="text-4xl text-stone-900 font-bold p-3 lg:px-5 text-center">
        Your cart
      </p>

      <div className="flex-1 flex flex-col lg:flex-row lg:w-full">
        <div className="flex-1 p-3 lg:p-5 lg:w-2/3">
          {items.map((item, key) => (
            <div
              key={key}
              className="w-full py-5 flex border-t first:border-0 border-stone-400 space-x-3 md:space-x-5 xl:space-x-10">
              <div className="overflow-hidden rounded-md shadow-md w-50 h-30">
                <Link
                  href={`collection/products/${item?.productId}`}
                  className="w-full h-full">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    width={500}
                    height={500}
                    className="object-cover object-center w-full h-full"
                  />
                </Link>
              </div>

              <div className="item-info w-full space-y-1.5 flex flex-col">
                <div className="w-full flex items-center-safe justify-between">
                  <Link
                    href={`collection/products/${item?.productId}`}
                    className="w-full text-xl font-bold text-stone-950">
                    {item.productName}
                  </Link>

                  <BiX
                    size={"1.5em"}
                    className="hover:cursor-pointer"
                    onClick={() => removeItem(item)}
                  />
                </div>

                <div className="w-full flex-1 flex justify-between text-stone-600 font-light lg:text-md">
                  <p>
                    {new Intl.NumberFormat("en-ZA", {
                      style: "currency",
                      currency: "ZAR",
                    }).format(item.productPrice)}{" "}
                    <span className="text-xs font-light italic">per unit</span>
                  </p>

                  {Object.values(item.options).length > 0 && (
                    <p>
                      {Object.keys(item.options)[0]}:{" "}
                      {Object.values(item.options)[0].includes("=") ?
                        Object.values(item.options)[0].split("=")[0]
                      : Object.values(item.options)[0]}
                    </p>
                  )}
                </div>

                <div className="md:flex justify-between md:w-full">
                  <div className="w-30 relative">
                    {!cItems && (
                      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-2 animate-pulse" />
                    )}

                    <QuantityInput
                      quantity={
                        (
                          cItems?.find((prod) => prod._id === item.productId)
                            ?.quantity === 0
                        ) ?
                          0
                        : item.productQty
                      }
                      onChange={(value: number) =>
                        updateItemQty(
                          item,
                          (
                            cItems?.find((prod) => prod._id === item.productId)
                              ?.quantity === 0
                          ) ?
                            0
                          : value === 0 ? 1
                          : value,
                        )
                      }
                      onIncrement={() =>
                        updateItemQty(item, item.productQty + 1)
                      }
                      onDecrement={() =>
                        updateItemQty(item, item.productQty - 1)
                      }
                      incrementDisable={
                        item.productQty >=
                        ((cItems &&
                          cItems.find((prod) => prod._id === item.productId)
                            ?.quantity) ??
                          1)
                      }
                      decrementDisable={
                        item.productQty <=
                        ((cItems &&
                          cItems.find((prod) => prod._id === item.productId)
                            ?.quantity) ||
                          1)
                      }
                    />
                  </div>

                  <p className="hidden md:block md:self-center-safe text-2xl font-semibold">
                    {new Intl.NumberFormat("en-ZA", {
                      style: "currency",
                      currency: "ZAR",
                    }).format(item.productPrice * item.productQty)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block lg:border-l border-stone-400 mx-5 my-3" />
        <div className="w-full px-2 pb-3 sticky bottom-0 lg:h-full bg-white lg:w-1/3 lg:top-6 border-0">
          <div className="flex flex-col space-y-3 rounded-lg border lg:border-0 border-stone-400 p-3">
            <CartSummary items={items} />

            <p
              className="text-red-500 font-semibold hover:cursor-pointer flex flex-col w-fit group"
              onClick={() => clearCart()}>
              Clear cart{" "}
              {`(${items?.reduce((acc, item) => item?.productQty + acc, 0)})`}{" "}
              <span className="border-b w-0 transition-all duration-500 group-hover:w-full" />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
