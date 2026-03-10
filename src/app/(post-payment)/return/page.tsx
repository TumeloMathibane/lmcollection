"use client";

import { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useCartStore } from "../../../stores/cart";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function Page() {
  const { clearCart } = useCartStore();
  const [paymentStatus, setPaymentStatus] = useState<string | undefined>(
    undefined,
  );
  const createOrder = useMutation(api.orders.createOrder);
  const purchaseProduct = useMutation(api.products.purchaseProduct);

  const router = useRouter();
  const previousPageUrl =
    typeof window !== "undefined" ? document.referrer : "";

  // https://d1r891fk-4000.eun1.devtunnels.ms/ url changes based on developers devtunnel config
  useEffect(() => {
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
        // console.log("Payment status response:", data);
        setPaymentStatus(data.message);

        if (data.message === "PASS") {
          const orderData = localStorage.getItem("orderData");
          if (orderData) {
            const parsedOrderData = JSON.parse(orderData);
            createOrder(parsedOrderData);
            localStorage.removeItem("orderData");
          }

          // update products' quantities in the database
          const { items } = orderData ? JSON.parse(orderData) : { items: [] };
          // console.log("Order items to clear from cart:", items);
          for (const item of items) {
            purchaseProduct({
              id: item.productId as Id<"product">,
              quantity: item.productQty,
            });
          }
          clearCart();
        }
      } catch (error) {
        console.error("Store Error:", error);
        setPaymentStatus("FAIL");
      }
    };

    fetchPaymentStatus();
  }, [clearCart, createOrder, purchaseProduct]);

  useEffect(() => {
    if (!previousPageUrl.includes("payfast.co.za")) {
      router.push("/cart");
    }
  }, [router, previousPageUrl]);

  if (
    typeof window !== "undefined" &&
    !previousPageUrl.includes("payfast.co.za")
  ) {
    return (
      <div className="flex-1 flex items-center-safe justify-center-safe">
        <p className="text-stone-900">Redirecting to cart...</p>
      </div>
    );
  }

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
        : <>
            <p>
              Payment failed. Please try again or contact support for
              assistance.
            </p>
            <p>Status: {paymentStatus}</p>
          </>
        }
      </div>
    </div>
  );
}
