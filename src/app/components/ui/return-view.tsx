"use client";

import { BsCheckCircle } from "react-icons/bs";
import { useCartStore } from "../../../stores/cart";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ReturnView() {
  const { clearCart } = useCartStore();
  const [paymentStatus, setPaymentStatus] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const res = await axios.get(
          process.env.VERCEL_ENV === "production" ?
            `https://${process.env.VERCEL_URL}/notify`
          : "https://d1r891fk-3000.eun1.devtunnels.ms/notify",
        );

        if (res.data.message === "PASS") {
          clearCart();
          setPaymentStatus(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setPaymentStatus("FAIL");
      }
    };

    fetchPaymentStatus();
  }, [clearCart]);

  if (!paymentStatus) {
    return <p>Loading payment status...</p>;
  }

  return (
    <>
      {paymentStatus === "PASS" ?
        <span className="flex items-center-safe gap-3">
          <BsCheckCircle size={"10rem"} className="text-green-600" />
          <p>Payment successful. Thank you for your purchase!</p>
        </span>
      : <p>Payment failed. Please try again. Status: {paymentStatus}</p>}
    </>
  );
}
