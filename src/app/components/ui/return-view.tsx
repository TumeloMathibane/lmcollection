"use client";

import { BsCheckCircle } from "react-icons/bs";
import { useCartStore } from "../../../stores/cart";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ReturnView() {
  const { items, clearCart } = useCartStore();

  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const response = await axios.get(
        process.env.VERCEL_ENV === "production" ?
          `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/notify`
        : "https://d1r891fk-3000.eun1.devtunnels.ms/notify",
      );
      const status = await response.data.message;

      setStatus(status);
      if (status === "PASS" && items.length > 0) {
        clearCart();
      }
    };

    checkPaymentStatus();
  }, [clearCart, items.length]);

  return (
    <>
      {status === "PASS" ?
        <span className="flex items-center-safe gap-3">
          <BsCheckCircle size={"10rem"} className="text-green-600" />
          <p>Payment successful. Thank you for your purchase!</p>
        </span>
      : <p>Payment failed. Please try again. Status: {status}</p>}
    </>
  );
}
