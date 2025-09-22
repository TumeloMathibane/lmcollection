"use client";

import { useCartStore } from "@/stores/cart";
import Link from "next/link";
import { BiX } from "react-icons/bi";
import Image from "next/image";
import QuantityInput from "../ui/products/QuantityInput";
import CartSummary from "../ui/cart/CartSummary";

export default function Cart() {
  const { items, updateItemQty, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em] flex justify-around items-center-safe">
        <div className="space-y-3 md:space-y-5 flex flex-col items-center-safe xl:w-[80%]">
          <p className="text-2xl text-stone-900 text-center font-bold md:text-4xl">
            Your cart is empty
          </p>
          <Link href="/products" className="btn btn-lg rounded-md">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em] xl:w-[80%] xl:place-self-center-safe">
      <p className="text-4xl text-stone-900 font-bold p-3 lg:px-5 text-center">
        Your cart
      </p>

      <div className="lg:flex lg:w-full">
        <div className="p-3 lg:p-5 lg:w-2/3">
          {items.map((item, key) => (
            <div
              key={key}
              className="w-full py-5 flex border-t first:border-0 border-stone-400 space-x-3 md:space-x-5 xl:space-x-10"
            >
              <div className="item-img size-40 h-fit overflow-hidden rounded-md shadow-md">
                <Link href={`collection/products/${item?.productId}`}>
                  <Image
                    src={item.productImg}
                    alt={item.productName}
                    width={500}
                    height={500}
                  />
                </Link>
              </div>
              <div className="item-info w-full relative">
                <div className="flex items-center-safe justify-between">
                  <Link
                    href={`collection/products/${item?.productId}`}
                    className="text-xl font-bold text-stone-950"
                  >
                    {item.productName}
                  </Link>
                  <BiX
                    size={"1.5em"}
                    onClick={() => removeItem(item.productId, item.productSize)}
                  />
                </div>
                <div className="flex justify-between text-stone-600 font-light lg:text-md">
                  <p>
                    <span className="before:content-['R'] before:mr-2">
                      {item.productPrice.toFixed(2)}{" "}
                      <span className="text-xs font-light italic">
                        per unit
                      </span>
                    </span>
                  </p>
                  <p>
                    Size:{" "}
                    <span className="font-semibold">{item.productSize}</span>
                  </p>
                </div>
                <div className="absolute bottom-0 md:flex justify-between md:w-full">
                  <div className="w-30">
                    <QuantityInput
                      quantity={item.productQty}
                      onChange={(value: number) =>
                        updateItemQty(
                          item.productId,
                          item.productSize,
                          value ?? 1
                        )
                      }
                      onIncrement={() =>
                        updateItemQty(
                          item.productId,
                          item.productSize,
                          item.productQty + 1
                        )
                      }
                      onDecrement={() =>
                        updateItemQty(
                          item.productId,
                          item.productSize,
                          item.productQty - 1
                        )
                      }
                    />
                  </div>
                  <p className="hidden md:block md:self-center-safe before:content-['R'] before:mr-2 text-2xl font-semibold">
                    {(item.productPrice * item.productQty).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:block lg:border-l border-stone-400 mx-5 my-3" />
        <div className="w-full lg:w-1/3 p-3 lg:h-full sticky bottom-0 lg:top-6 bg-white border-0">
          <CartSummary items={items} />
        </div>
      </div>
    </main>
  );
}
