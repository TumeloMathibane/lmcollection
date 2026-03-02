"use client";

import { useCartStore } from "../../../stores/cart";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BsCheckCircle } from "react-icons/bs";

export default function Page() {
  const { clearCart } = useCartStore();
  const [paymentStatus, setPaymentStatus] = useState<string | undefined>(
    undefined,
  );
  const createOrder = useMutation(api.orders.createOrder);

  useState(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(
          process.env.VERCEL_ENV === "production" ?
            `https://${process.env.VERCEL_URL}/notify`
          : "https://d1r891fk-4000.eun1.devtunnels.ms/notify",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await response.json();
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
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setPaymentStatus("FAIL");
      }
    };

    fetchPaymentStatus();
  });

  return (
    <div className="flex-1 flex flex-col min-h-[75dvh]">
      <div className="flex-1 flex justify-center-safe items-center-safe px-4">
        {!paymentStatus ?
          <p>Loading payment status...</p>
        : paymentStatus === "PASS" ?
          <span className="flex items-center-safe gap-3">
            <BsCheckCircle size={"10rem"} className="text-green-600" />
            <p>Payment successful. Thank you for your purchase!</p>
          </span>
        : <p>Payment failed. Please try again. Status: {paymentStatus}</p>}
      </div>
    </div>
  );
}
