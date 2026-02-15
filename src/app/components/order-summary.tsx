"use client";

import { ChangeEvent, useEffect, useState } from "react";
import ItemCard from "./ui/checkout/item-card";
import { BiChevronDown } from "react-icons/bi";
import type { CartItem } from "../../stores/types";

export default function OrderSummaryWidget({
  shippingPrice,
  items,
  cartTotal,
  coupon,
  onCouponChange,
}: {
  shippingPrice: number;
  items: CartItem[];
  cartTotal: number;
  coupon?: string;
  onCouponChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const [subTotal, setSubTotal] = useState<number>(cartTotal);
  const [cTotal, setCTotal] = useState<number>(subTotal);

  useEffect(
    () =>
      items &&
      setSubTotal(
        items.reduce(
          (total, item) => total + item.productPrice * item.productQty,
          0,
        ),
      ),
    [items],
  );

  useEffect(() => {
    if (shippingPrice !== undefined) setCTotal(subTotal + shippingPrice);
  }, [shippingPrice, subTotal]);

  return (
    <main className="bg-stone-100 w-full xl:hidden">
      <button
        className="w-full border-b border-stone-300 place-items-center-safe"
        onClick={() => setOpen(!open)}>
        <div className="flex w-full justify-between p-3 md:max-w-[750px]">
          <p className="flex self-center-safe text-blue-800/80">
            Order summary{" "}
            <BiChevronDown
              className={`ml-2 self-center-safe origin-center transition-all duration-500 ${open ? "rotate-180" : "rotate-0"}`}
            />
          </p>
          <span className="text-xl font-semibold self-center-safe">
            {new Intl.NumberFormat("en-ZA", {
              style: "currency",
              currency: "ZAR",
            }).format(cTotal)}
          </span>
        </div>
      </button>

      <div
        className={`transition-all duration-500 ${open ? "pb-3 max-h-[100em] z-0 border-b border-stone-300" : "border-0 border-stone-300 max-h-0 -z-10"}`}>
        <div className="space-y-4 p-3 md:w-[750px] md:place-self-center">
          {items?.map((item, key) => (
            <div key={key}>
              <ItemCard item={item} />
            </div>
          ))}
        </div>

        <div className="w-full space-y-3 flex flex-col md:w-[750px] md:place-self-center">
          <div className="space-x-3 flex px-3">
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
              disabled={coupon === ""}>
              Apply
            </button>
          </div>
          <div className="w-full space-x-5 flex justify-between px-3">
            <p>Subtotal</p>
            <p>
              {new Intl.NumberFormat("en-ZA", {
                style: "currency",
                currency: "ZAR",
              }).format(subTotal)}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between px-3 md:w-[750px] md:place-self-center">
          <p>Shipping</p>
          <p className="text-stone-600 italic">
            {shippingPrice === 0 ?
              "Select shipping option"
            : <span className="text-black not-italic">
                {new Intl.NumberFormat("en-ZA", {
                  style: "currency",
                  currency: "ZAR",
                }).format(shippingPrice)}
              </span>
            }
          </p>
        </div>

        <div className="w-full px-3 flex justify-between text-xl font-semibold md:w-[750px] md:place-self-center">
          <p>Total</p>
          <p>
            {new Intl.NumberFormat("en-ZA", {
              style: "currency",
              currency: "ZAR",
            }).format(cTotal)}
          </p>
        </div>
      </div>
    </main>
  );
}

type OrderSummaryProp = {
  items: CartItem[];
  cartTotal: number;
  shippingPrice: number;
  coupon: string;
  onCouponChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export function OrderSummary({
  items,
  cartTotal,
  shippingPrice,
  coupon,
  onCouponChange,
}: OrderSummaryProp) {
  const [subTotal, setSubTotal] = useState<number>(cartTotal);
  const [cTotal, setcTotal] = useState<number>(subTotal);

  useEffect(
    () =>
      items &&
      setSubTotal(
        items.reduce(
          (total, item) => total + item.productPrice * item.productQty,
          0,
        ),
      ),
    [items],
  );

  useEffect(() => {
    if (shippingPrice !== undefined) setcTotal(subTotal + shippingPrice);
  }, [shippingPrice, subTotal]);

  useEffect(() => {
    setcTotal(subTotal + shippingPrice);
  }, [shippingPrice, subTotal]);

  return (
    <>
      <div className="space-y-4">
        {items?.map((item, key) => (
          <div key={key}>
            <ItemCard item={item} />
          </div>
        ))}
      </div>

      <div>
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
              disabled={coupon === ""}>
              Apply
            </button>
          </div>
          <div className="w-full flex justify-between">
            <p>Subtotal</p>
            <p>
              {new Intl.NumberFormat("en-ZA", {
                style: "currency",
                currency: "ZAR",
              }).format(subTotal)}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <p>Shipping</p>
          <p className="text-stone-600 italic">
            {shippingPrice === 0 ?
              "Select shipping option"
            : <span className="text-black not-italic">
                {new Intl.NumberFormat("en-ZA", {
                  style: "currency",
                  currency: "ZAR",
                }).format(shippingPrice)}
              </span>
            }
          </p>
        </div>

        <div className="w-full flex justify-between text-xl font-semibold">
          <p>Total</p>
          <p>
            {new Intl.NumberFormat("en-ZA", {
              style: "currency",
              currency: "ZAR",
            }).format(cTotal)}
          </p>
        </div>
      </div>
    </>
  );
}
