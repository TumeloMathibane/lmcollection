"use client";

import { useState } from "react";
import { useCartStore } from "@/stores/cart";
import ItemCard from "./ui/checkout/ItemCard";

export default function OrderSummary() {
  const { items } = useCartStore();
  const cartTotal = items
    .reduce((total, item) => total + item.productPrice * item.productQty, 0)
    .toFixed(2);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <main className="bg-stone-200 w-full">
      <button
        className="border-b border-stone-400 flex justify-between w-full p-4"
        onClick={() => setOpen(!open)}
      >
        <p>Order summary</p>
        <span>{cartTotal}</span>
      </button>

      <div
        className={`transition-all duration-1000 ${open ? "max-h-[100em] z-0" : "max-h-0 -z-10"}`}
      >
        <div className="space-y-4 p-5">
          {items.map((item, key) => (
            <div key={key}>
              <ItemCard item={item} />
            </div>
          ))}
        </div>

        <div className="w-full space-y-3 flex flex-col">
          <div className="space-x-5 flex px-5">
            <input
              type="text"
              name="discount-coupon"
              id="discount-coupon"
              className="input input-lg w-full"
              placeholder="Discount code"
            />
            <button type="button" className="btn btn-lg rounded-lg" disabled>
              Apply
            </button>
          </div>
          <div className="w-full space-x-5 flex justify-between px-5">
            <p>Subtotal</p>
            <p className="before:content-['R'] before:mr-1">{cartTotal}</p>
          </div>
        </div>
        <div className="w-full flex justify-between py-3 px-5">
          <p>Shipping</p>
          <p className="text-stone-600 italic">Shipping price</p>
        </div>

        <div className="w-full px-5 py-3 flex justify-between text-xl font-bold">
          <p>Total</p>
          <p className="before:content-['R'] before:mr-1">{cartTotal}</p>
        </div>
      </div>
    </main>
  );
}
