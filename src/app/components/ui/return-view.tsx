"use client";

import { BsCheckCircle } from "react-icons/bs";
import { useCartStore } from "../../../stores/cart";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

export default function ReturnView() {
  const { clearCart } = useCartStore();
  const [paymentStatus, setPaymentStatus] = useState<string | undefined>(
    undefined,
  );
  const createOrder = useMutation(api.orders.createOrder);

  useEffect(() => {
    try {
      fetch(
        process.env.VERCEL_ENV === "production" ?
          `https://${process.env.VERCEL_URL}/notify`
        : "https://d1r891fk-4000.eun1.devtunnels.ms/notify",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("Payment status response:", data);
          setPaymentStatus(data.message);

          if (data.message === "PASS") {
            const orderData = localStorage.getItem("orderData");
            if (orderData) {
              const parsedOrderData = JSON.parse(orderData);
              createOrder(parsedOrderData);
              localStorage.removeItem("orderData");
            }
            clearCart();
          }
        });
    } catch (error) {
      console.error("Error:", error);
      setPaymentStatus("FAIL");
    }
  }, [clearCart, createOrder]);

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
