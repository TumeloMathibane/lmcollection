"use client";

import { ChangeEvent, useEffect, useState } from "react";
import ItemCard from "./ui/checkout/ItemCard";
import { BiCaretDown } from "react-icons/bi";
import type { CartItem } from "@/stores/types";

export default function OrderSummaryWidget({
  shippingPrice,
  items,
  coupon,
  onCouponChange,
}: {
  shippingPrice: number;
  items: CartItem[];
  coupon?: string;
  onCouponChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const [subTotal, setSubTotal] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(subTotal);

  useEffect(
    () =>
      items &&
      setSubTotal(
        items.reduce(
          (total, item) => total + item.productPrice * item.productQty,
          0
        )
      ),
    [items]
  );

  useEffect(() => {
    if (shippingPrice !== undefined) setCartTotal(subTotal + shippingPrice);
  }, [shippingPrice, subTotal]);

  return (
    <main className="bg-stone-100 w-full xl:hidden">
      <button
        className="flex justify-between items-center-safe w-full p-4 md:px-30 lg:px-50 border-b border-stone-300"
        onClick={() => setOpen(!open)}
      >
        <p className="flex self-center-safe text-blue-800/80">
          Order summary{" "}
          <BiCaretDown
            className={`ml-2 self-center-safe transition-all duration-500 ${open ? "rotate-180" : "-rotate-0"}`}
          />
        </p>
        <span className="text-xl font-semibold before:content-['R'] before:mr-1 self-center-safe">
          {cartTotal.toFixed(2)}
        </span>
      </button>

      <div
        className={`md:px-30 transition-all duration-500 ${open ? "pb-3 max-h-[100em] z-0 border-b border-stone-300" : "border-0 border-stone-300 max-h-0 -z-10"}`}
      >
        <div className="space-y-4 p-5">
          {items?.map((item, key) => (
            <div key={key}>
              <ItemCard item={item} />
            </div>
          ))}
        </div>

        <div className="w-full space-y-3 flex flex-col">
          <div className="space-x-3 flex px-5">
            <input
              type="text"
              name="discount-coupon"
              id="discount-coupon"
              className="w-full input input-md focus:outline-offset-0 focus:outline-0 focus:border-2 focus:border-blue-600"
              placeholder="Discount code"
              value={coupon}
              onChange={onCouponChange}
            />
            <button
              type="button"
              className="rounded-sm btn btn-md btn-primary"
              disabled={coupon === ""}
            >
              Apply
            </button>
          </div>
          <div className="w-full space-x-5 flex justify-between px-5">
            <p>Subtotal</p>
            <p className="before:content-['R'] before:mr-1">
              {subTotal.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between px-5">
          <p>Shipping</p>
          <p className="text-stone-600 italic">
            {shippingPrice === 0 ? (
              "Select shipping option"
            ) : (
              <span className="before:content-['R'] before:mr-1 text-black not-italic">
                {shippingPrice?.toFixed(2)}
              </span>
            )}
          </p>
        </div>

        <div className="w-full px-5 flex justify-between text-xl font-semibold">
          <p>Total</p>
          <p className="before:content-['R'] before:mr-1">
            {cartTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </main>
  );
}

type OrderSummaryProp = {
  items: CartItem[];
  shippingPrice: number;
  coupon: string;
  onCouponChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export function OrderSummary({
  items,
  shippingPrice,
  coupon,
  onCouponChange,
}: OrderSummaryProp) {
  const [subTotal, setSubTotal] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(subTotal);

  useEffect(
    () =>
      items &&
      setSubTotal(
        items.reduce(
          (total, item) => total + item.productPrice * item.productQty,
          0
        )
      ),
    [items]
  );

  useEffect(() => {
    if (shippingPrice !== undefined) setCartTotal(subTotal + shippingPrice);
  }, [shippingPrice, subTotal]);

  useEffect(() => {
    setCartTotal(subTotal + shippingPrice);
  }, [shippingPrice, subTotal]);

  return (
    <div>
      <div className="space-y-4">
        {items?.map((item, key) => (
          <div key={key}>
            <ItemCard item={item} />
          </div>
        ))}
      </div>

      <div className="w-full space-y-3 mt-4 flex flex-col">
        <div className="space-x-3 flex">
          <input
            type="text"
            name="discount-coupon"
            id="discount-coupon"
            className="input input-md w-full focus:outline-offset-0 focus:outline-0 focus:border-2 focus:border-blue-600"
            placeholder="Discount code"
            value={coupon}
            onChange={onCouponChange}
          />
          <button
            type="button"
            className="rounded-sm btn btn-md btn-primary"
            disabled={coupon === ""}
          >
            Apply
          </button>
        </div>
        <div className="w-full flex justify-between">
          <p>Subtotal</p>
          <p className="before:content-['R'] before:mr-1">
            {subTotal.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <p>Shipping</p>
        <p className="text-stone-600 italic">
          {shippingPrice === 0 ? (
            "Select shipping option"
          ) : (
            <span className="before:content-['R'] before:mr-1 text-black not-italic">
              {shippingPrice?.toFixed(2)}
            </span>
          )}
        </p>
      </div>

      <div className="w-full flex justify-between text-xl font-semibold">
        <p>Total</p>
        <p className="before:content-['R'] before:mr-1">
          {cartTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
