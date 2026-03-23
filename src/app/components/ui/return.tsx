"use client";

import { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useCartStore } from "../../../stores/cart";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import md5 from "md5";

export default function Return({ passphrase }: { passphrase: string }) {
  const { clearCart } = useCartStore();
  const [paymentStatus, setPaymentStatus] = useState<
    undefined | "PASS" | "FAIL"
  >(undefined);
  const createOrder = useMutation(api.orders.createOrder);

  const router = useRouter();
  const previousPageUrl =
    typeof window !== "undefined" ? document.referrer : "";

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      const orderData = JSON.parse(localStorage.getItem("orderData") || "{}");

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
        if (!response.ok) {
          throw new Error(
            `Error fetching payment status: ${response.statusText}`,
          );
        }
        const data = await response.json();

        // * CHECK 1: check signature of data received if is correct
        let pfString: string = "";
        Object.entries(data.message).map(
          ([key, val]) =>
            key !== "signature" &&
            (pfString += `${key}=${encodeURIComponent(String(val).trim()).replace(/%20/g, "+")}&`),
        );
        if (pfString.endsWith("&")) {
          pfString = pfString.slice(0, -1);
        }
        if (passphrase) {
          pfString += `&passphrase=${encodeURIComponent(String(passphrase).trim()).replace(/%20/g, "+")}`;
        }

        const check1 = md5(pfString) === data.message.signature; // checking of signature...
        if (!check1) {
          throw new Error("Data error: Possible tempering detected");
        }

        // ? NOTE: this check has been completed in notify route...
        // * CHECK 2: check if notification comes from valid payfast host
        // * CHECK 3: check gross amounts match
        // * check 4: verify information received from gateway and confirming the order with the server before confirming the order with the client...

        if (check1) {
          setPaymentStatus("PASS");
          const orderID = await createOrder(orderData);
          if (orderID) {
            clearCart();
          }
        }
      } catch (error) {
        setPaymentStatus("FAIL");
        console.error("Store Error - ", error);
      }
    };

    fetchPaymentStatus();
  }, [clearCart, createOrder, passphrase]);

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
      <>
        <p className="text-stone-900">Redirecting to cart...</p>
      </>
    );
  }

  return (
    <>
      {paymentStatus === undefined ?
        <p>Loading payment status...</p>
      : paymentStatus === "PASS" ?
        <span className="flex items-center-safe gap-3">
          <BsCheckCircle size={"10rem"} className="text-green-600" />
          <p>Payment successful. Thank you for your purchase!</p>
        </span>
      : <p>
          Payment failed. Please try again or contact support for assistance.
          Status: {paymentStatus}
        </p>
      }
    </>
  );
}
