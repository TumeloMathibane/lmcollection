"use client";

import { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useCartStore } from "../../../stores/cart";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import md5 from "md5";

export default function Return({
  passphrase,
  serverData,
  checkStatus,
}: {
  passphrase: string;
  serverData?: { [key: string]: string };
  checkStatus?: boolean;
}) {
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

      // create a new object, 'newObject', that is all the poperties of 'serverData' but excluding 'signature' property

      // * CHECK 1: signature check
      const newObject = Object.fromEntries(
        Object.entries(serverData || {}).filter(([key]) => key !== "signature"),
      );
      const newSignature = md5(
        Object.entries(newObject)
          .map(
            ([key, val]) =>
              `${key}=${encodeURIComponent(String(val).trim()).replace(/%20/g, "+")}`,
          )
          .join("&") +
          (passphrase ?
            `&passphrase=${encodeURIComponent(String(passphrase).trim()).replace(/%20/g, "+")}`
          : ""),
      );

      if (serverData?.signature !== newSignature) {
        console.error(
          "Store error - Signature mismatch - possible data tampering detected",
        );

        setPaymentStatus("FAIL");
        return;
      }

      // * CHECK 3: gross amount check
      if (Number(orderData?.totalPrice) !== Number(serverData?.amount_gross)) {
        console.error(
          "Store error - Total price mismatch between client and server data",
        );

        setPaymentStatus("FAIL");
        return;
      }

      if (!checkStatus) {
        console.error("Store error - Payment status check failed");

        setPaymentStatus("FAIL");
        return;
      }

      try {
        const orderId = await createOrder(orderData);
        if (!orderId) {
          throw new Error("Failed to create order");
        }

        clearCart();
        setPaymentStatus("PASS");
      } catch (error) {
        console.error("Store error - ", error);
        setPaymentStatus("FAIL");
      }
    };

    fetchPaymentStatus();
    localStorage.removeItem("orderData");
  }, [checkStatus, serverData, clearCart, createOrder, passphrase]);

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
      {!serverData || paymentStatus === undefined ?
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
