"use client";

import { useEffect, useMemo } from "react";
import { useCartStore } from "../../stores/cart";
import Link from "next/link";
import { BiX } from "react-icons/bi";
import Image from "next/image";
import QuantityInput from "./quantity-input";
import CartSummary from "./ui/cart/cart-summary";
import Loading from "../(overview)/cart/loading";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

export default function CartView() {
  const { loading, items, updateItemQty, removeItem, clearCart } =
    useCartStore();

  const router = useRouter();

  const products = useQuery(api.products.getProductsByIds, {
    ids: items.map((i) => i.productId as Id<"product">),
  });

  const productsById = useMemo(
    () =>
      new Map(
        (products ?? [])
          .filter((product) => product !== null)
          .map((product) => [product._id, product]),
      ),
    [products],
  );

  useEffect(() => {
    items.forEach((item) => {
      // const dbQty = productsById.get(item.productId as Id<"product">)?.quantity;
      if (
        productsById.get(item.productId as Id<"product">)?.availability ===
          "out-of-stock" &&
        item.productQty !== 1
      ) {
        updateItemQty(item, 1);
      }
    });
  }, [items, productsById, updateItemQty]);

  if (loading || (items.length > 0 && !products)) return <Loading />;

  if (items?.length === 0) {
    return (
      <div className="flex-1 flex justify-around items-center-safe">
        <div className="space-y-3 md:space-y-5 flex flex-col items-center-safe xl:w-[80%]">
          <p className="text-2xl text-stone-900 text-center font-bold md:text-4xl">
            Your cart is empty
          </p>
          {/* <Link href="/collection/products/all" className="btn font-bold">
            Continue shopping
          </Link> */}

          <button
            type="button"
            className="btn bg-stone-900 text-nowrap dark:text-stone-200"
            onClick={() => router.push("/collection/products/all")}
          >
            Continue shopping
          </button>
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
          {items?.map((item, key) => (
            <div
              key={key}
              className="w-full py-5 flex border-t first:border-0 border-stone-400 space-x-3 md:space-x-5 xl:space-x-10"
            >
              <div className="overflow-hidden rounded-md shadow-md w-50 h-30">
                <Link
                  href={`collection/products/${item?.productId}`}
                  className="w-full h-full"
                  prefetch={false}
                >
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    width={500}
                    height={500}
                    className="object-cover object-center w-full h-full"
                    unoptimized={true}
                    priority={false}
                  />
                </Link>
              </div>

              <div className="item-info w-full space-y-1.5 flex flex-col">
                <div className="w-full flex items-center-safe justify-between">
                  <Link
                    href={`collection/products/${item?.productId}`}
                    className="w-full text-xl font-bold text-stone-950"
                    prefetch={false}
                  >
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
                      {Object.values(item.options)[0].includes("=")
                        ? Object.values(item.options)[0].split("=")[0]
                        : Object.values(item.options)[0]}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center-safe md:w-full">
                  {productsById.get(item.productId as Id<"product">) &&
                  productsById.get(item.productId as Id<"product">)
                    ?.availability !== "out-of-stock" ? (
                    <>
                      <div className="w-30 relative">
                        <QuantityInput
                          quantity={item.productQty}
                          onChange={(value: number) =>
                            updateItemQty(item, value)
                          }
                          onIncrement={() =>
                            updateItemQty(item, item.productQty + 1)
                          }
                          onDecrement={() =>
                            updateItemQty(item, item.productQty - 1)
                          }
                          incrementDisable={item.productQty >= 99}
                          decrementDisable={item.productQty <= 1}
                        />
                      </div>

                      <p>
                        {new Intl.NumberFormat("en-ZA", {
                          style: "currency",
                          currency: "ZAR",
                        }).format(item.productPrice * item.productQty)}
                      </p>
                    </>
                  ) : (
                    <p className="text-red-600 font-semibold">Out of stock</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block lg:border-l border-stone-400 mx-5 my-3" />
        <div className="w-full px-2 pb-3 sticky bottom-0 lg:h-full bg-white lg:w-1/3 lg:top-6 border-0">
          <div className="flex flex-col space-y-2 rounded-lg border lg:border-0 border-stone-400 p-3">
            <CartSummary
              items={items.filter(
                (i) =>
                  productsById.get(i.productId as Id<"product">) &&
                  productsById.get(i.productId as Id<"product">)
                    ?.availability !== "out-of-stock",
              )}
              onCartClear={() => clearCart()}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
