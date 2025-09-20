"use client";

import { useCartStore } from "@/stores/cart";
import Link from "next/link";
import { BiX } from "react-icons/bi";
import Image from "next/image";

export default function Cart() {
  const { items, removeItem } = useCartStore();

  return (
    <main className="min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em]">
      <p className="text-4xl text-stone-900 font-bold">Your cart</p>
      {items.length === 0 ? (
        <div>
          <p className="text-2xl text-stone-900">Cart is empty</p>
        </div>
      ) : (
        <div>
          {items.map((item, key) => (
            <div key={key} className="w-full flex">
              <div className="item-img">
                <div className="size-40">
                  <Image
                    src={item.productImg}
                    alt={item.productName}
                    width={500}
                    height={500}
                  />
                </div>
              </div>
              <div className="item-info">
                <Link
                  href={`collection/products/${item?.productId}`}
                  className="text-xl font-bold text-stone-950"
                >
                  {item.productName}
                </Link>
                <p>Item quantity: {item.productQty}</p>
                <p>Item size: {item.productSize}</p>
                <BiX
                  size={"2em"}
                  onClick={() => removeItem(item.productId, item.productSize)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
