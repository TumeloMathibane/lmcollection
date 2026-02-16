"use client";

import { BsCheckCircle } from "react-icons/bs";
import { useCartStore } from "../../../stores/cart";
import { useEffect } from "react";

export default function ReturnView({
  paymentStatus,
}: {
  paymentStatus: string;
}) {
  const { items, clearCart } = useCartStore();

  useEffect(() => {
    if (paymentStatus === "PASS" && items.length > 0) {
      clearCart();
    }
  }, [paymentStatus, clearCart, items.length]);

  return (
    <>
      {paymentStatus === "PASS" ?
        <span className="flex items-center-safe gap-3">
          <BsCheckCircle size={"10rem"} className="text-green-600" />
          <p>Payment successful. Thank you for your purchase!</p>
        </span>
      : <p>Payment failed. Please try again.</p>}
    </>
  );
}
