"use client";

import { BsCheckCircle } from "react-icons/bs";
import { useCartStore } from "../../../stores/cart";
import { useEffect, useState } from "react";

export default function ReturnView() {
  const { clearCart } = useCartStore();
  const [paymentStatus, setPaymentStatus] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    try {
      fetch(`https://${process.env.VERCEL_URL}/notify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("Payment status response:", data);
          setPaymentStatus(data.message);

          if (data.message === "PASS") {
            clearCart();
          }
        });
    } catch (error) {
      console.error("Error fetching payment status:", error);
      setPaymentStatus("FAIL");
    }
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
