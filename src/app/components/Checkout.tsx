"use client";

import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/stores/cart";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { generatePaymentId, generateSignature } from "../utils/helper";
import OrderSummaryWidget, { OrderSummary } from "./OrderSummary";
import { CheckoutFooter } from "./Footer";
import DeliverySelector from "./checkout/DeliverySel";
import { states } from "../../data/sa_provinces.json";
import Loading from "../(payments)/loading";
import { BiCheck, BiLoaderAlt } from "react-icons/bi";

import { DeliveryPackage } from "./DeliveryOpt";

type MerchantProp = {
  m_key: string;
  m_id: string;
  passphrase?: string;
  formAction: string;
};

export default function CheckoutMain({
  m_key,
  m_id,
  passphrase,
  formAction,
}: MerchantProp) {
  const { items, getTotalPrice } = useCartStore();

  const [cartTotal, setCartTotal] = useState<number>(0);

  const [orderId, setOrderId] = useState<string>("");

  const [data, setData] = useState({
    name_first: "",
    name_last: "",
    email_address: "",
    cell_number: "",
    street_address: "",
    apartment_no: "",
    suburb: "",
    city: "",
    postal_code: "",
    province: "",
    country: "",
    save_info: false,
  });
  const [shippingData, setShippingData] = useState({
    method: "",
    type: "",
    price: 0,
    street_address: "",
    apartment_no: "",
    suburb: "",
    city: "",
    postal_code: "",
    province: "",
    country: "",
  });
  const [paymentData, setPaymentData] = useState({
    merchant_id: m_id,
    merchant_key: m_key,
    notify_url: "https://gkhg4mlb-3000.euw.devtunnels.ms/payment/notify",
    name_first: "",
    name_last: "",
    m_payment_id: "",
    amount: cartTotal,
    item_name: orderId,
  });

  const ordersCount = useQuery(api.orders.orderCount) ?? 0;

  const [coupon, setCoupon] = useState<string>("");

  const [status, setStatus] = useState<
    "" | "submitting" | "validated" | "error"
  >("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));

    if (shippingData.hasOwnProperty(name)) {
      setShippingData((prevVal) => ({ ...prevVal, [name]: value }));

      // if (name === "method" && value === "tcg")
      //   setShippingData((prevVal) => ({ ...prevVal, price: 110 }));

      // if (name === "method" && value === "paxi")
      //   setShippingData((prevVal) => ({ ...prevVal, price: 55 }));
    }

    if (paymentData.hasOwnProperty(name)) {
      setPaymentData((prevVal) => ({ ...prevVal, [name]: value }));
    }

    if (e.currentTarget instanceof HTMLInputElement) {
      const { name, value, checked } = e.currentTarget;
      setData((prevVal) => ({
        ...prevVal,
        [name]: name === "save_info" ? checked : value,
      }));
    }
  };

  const handleDeliveryData = (key: string, value: string | number) => {
    setShippingData((prevVal) => ({ ...prevVal, [key]: value }));
  };

  const validateInput = (e: MouseEvent<HTMLButtonElement>) => {
    const elmts: HTMLElement[] = [];

    setStatus("submitting");
    e.preventDefault();
    Object.entries(data).map(([key, value]) => {
      const elmt = document.getElementById(`${key}`);

      // validating first name and last name...
      if (
        value === "" &&
        key !== "cell_number" &&
        key !== "email_address" &&
        key !== "apartment_no" &&
        key !== "save_info"
      ) {
        if (elmt) elmts.push(elmt);

        elmt?.classList.add("border", "border-red-600");
      } else {
        if (elmt?.classList.contains("border-red-600"))
          elmt?.classList.remove("border", "border-red-600");
      }

      // validating optional fields; email & cell number...
      if (value === "") {
        if (
          key === "cell_number" &&
          document.getElementById("email_address")?.getAttribute("value") === ""
        ) {
          if (elmt) elmts.push(elmt);
          elmt?.classList.add("border", "border-red-600");
        }

        if (
          key === "email_address" &&
          document.getElementById("cell_number")?.getAttribute("value") === ""
        ) {
          if (elmt) elmts.push(elmt);
          elmt?.classList.add("border", "border-red-600");
        }
      }
    });

    if (elmts.length > 0) {
      setStatus("");
      elmts[0].focus();
    }

    if (elmts.length === 0) {
      setStatus("validated");
      setTimeout(() => setStatus(""), 5000);
      e.currentTarget.form?.submit();
    }
  };

  useEffect(() => setCartTotal(getTotalPrice), [getTotalPrice]);

  // add item_name field
  useEffect(() => {
    if (items.length === 1) {
      setPaymentData((prevVal) => ({
        ...prevVal,
        item_name: encodeURIComponent(
          items.map((item) => item.productName)[0].trim()
        ).replace(/%20/g, "+") as string,
      }));
    } else {
      const c_orders = ordersCount + 1;
      setOrderId("LMCOrder#" + c_orders.toString().padStart(6, "0"));

      setPaymentData((prevVal) => ({
        ...prevVal,
        item_name: orderId,
      }));
    }
  }, [items, ordersCount, orderId]);

  // update payment data when cartTotal changes
  useEffect(() => {
    setPaymentData((prevVal) => ({ ...prevVal, amount: cartTotal }));
  }, [cartTotal]);

  // update total amount to be paid by customer when shipping method changes
  useEffect(() => {
    setCartTotal(getTotalPrice() + shippingData.price);
  }, [shippingData, getTotalPrice]);

  // generate payment id and add to payment data object
  useEffect(() => {
    setPaymentData((prevVal) => ({
      ...prevVal,
      m_payment_id: generatePaymentId(orderId, passphrase) as string,
    }));
  }, [ordersCount, passphrase, orderId]);

  // look for changes in data; specifically, in save_info; when changes are made, save info according to permission
  useEffect(() => {
    if (data.save_info)
      localStorage.setItem("customer_data", JSON.stringify(data));
    else if (localStorage.getItem("customer_data")) {
      localStorage.removeItem("customer_data");
    }
  }, [data]);

  if (!items || cartTotal === 0 || getTotalPrice() === 0) return <Loading />;

  return (
    <main className="bg-white flex flex-col min-h-screen md:min-h-[52em] lg:min-h-screen xl:min-h-screen">
      <div className="lg:hidden">
        <OrderSummaryWidget
          shippingPrice={shippingData?.price}
          cartTotal={cartTotal}
          items={items}
          coupon={coupon}
          onCouponChange={(e) => setCoupon(e.currentTarget?.value)}
        />
      </div>

      <section className="bg-white z-10 lg:flex">
        <div className="md:mx-25 lg:w-1/2 lg:mx-4">
          <div className="space-y-4 px-4 pb-5 lg:max-w-[500px] lg:float-end">
            <div className="space-y-4 pt-3">
              <h1 className="text-2xl font-bold text-shadow-stone-900 pt-2">
                Delivery
              </h1>
              <div className="name-first-last space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                <input
                  type="text"
                  name="name_first"
                  id="name_first"
                  className="input input-md w-full focus:outline-offset-0 focus:outline-0 focus:border-2 focus:border-blue-600"
                  placeholder="First name"
                  value={data.name_first}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="name_last"
                  id="name_last"
                  className="input input-md w-full focus:outline-offset-0 focus:outline-0 focus:border-2 focus:border-blue-600"
                  placeholder="Last name"
                  value={data.name_last}
                  onChange={handleInputChange}
                />
              </div>
              <div className="border-y border-stone-300 py-2 sm:border-0 sm:py-0 sm:flex lg:space-x-2 lg:space-y-0">
                <input
                  type="email"
                  name="email_address"
                  id="email_address"
                  className="input input-md w-full focus:outline-offset-0 focus:outline-0 focus:border-2 focus:border-blue-600"
                  placeholder="Email address"
                  value={data.email_address}
                  onChange={handleInputChange}
                />
                <div className="divider text-xs text-stone-400 my-2 uppercase sm:lowercase sm:my-auto">
                  or
                </div>
                <input
                  type="tel"
                  name="cell_number"
                  id="cell_number"
                  className="input input-md w-full focus:outline-offset-0 focus:outline-0 focus:border-2 focus:border-blue-600 sm:w-36"
                  placeholder="Cellphone number"
                  value={data.cell_number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                <input
                  type="text"
                  name="street_address"
                  id="street_address"
                  className="input input-md w-full focus:outline-offset-0 focus:outline-0 focus:border-2 focus:border-blue-600"
                  placeholder="Street address"
                  value={data.street_address}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="apartment_no"
                  id="apartment_no"
                  className="input input-md w-full focus:outline-offset-0 focus:outline-0 focus:border-2 focus:border-blue-600"
                  placeholder="Apartment, suite, etc (opt.)"
                  value={data.apartment_no}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                <input
                  type="text"
                  name="suburb"
                  id="suburb"
                  className="input input-md w-full focus:outline-offset-0 focus:outline-0 focus:border-2 focus:border-blue-600"
                  placeholder="Suburb"
                  value={data.suburb}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="postal_code"
                  id="postal_code"
                  className="input input-md w-full focus:outline-offset-0 focus:outline-0 focus:border-2 focus:border-blue-600 sm:w-25"
                  placeholder="Postal Code"
                  value={data.postal_code}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="input input-md w-full focus:outline-offset-0 focus:outline-0 focus:border-2 focus:border-blue-600"
                  placeholder="City"
                  value={data.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex space-x-4">
                <select
                  name="province"
                  id="province"
                  className="select select-md w-full focus-within:outline-offset-0 focus-within:outline-0 focus-within:border-2 focus-within:border-blue-600"
                  value={data.province}
                  onChange={handleInputChange}
                >
                  <option value="">Select province</option>
                  {states.map((state, key) => (
                    <option key={key} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>

                <select
                  name="country"
                  id="country"
                  className="select select-md w-full focus-within:outline-offset-0 focus-within:outline-0 focus-within:border-2 focus-within:border-blue-600"
                  value={data.country}
                  onChange={handleInputChange}
                >
                  <option value="">Select country</option>
                  <option value="za">South Africa</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  name="save_info"
                  id="save_info"
                  className="checkbox checkbox-sm"
                  onChange={handleInputChange}
                  checked={data.save_info}
                />
                <span>
                  <label htmlFor="save_info">
                    Save information for next time...
                  </label>
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xl font-semibold text-shadow-stone-900">
                  Shipping
                </p>
                <div className="bg-stone-200 p-4 rounded-xl space-y-2">
                  <div className="flex flex-col space-y-2 md:px-5">
                    <p className="text-stone-500">Select shipping service:</p>
                    <div className="space-y-4">
                      <div className="join join-horizontal flex w-full space-x-0.5">
                        <DeliverySelector
                          value={shippingData?.method}
                          onChange={(key, value) =>
                            setShippingData((prevVal) => ({
                              ...prevVal,
                              [key]: value,
                              type: "",
                              price: 0,
                            }))
                          }
                        />
                      </div>

                      <div hidden={shippingData.method === ""}>
                        <DeliveryPackage
                          deliveryData={shippingData}
                          onChange={handleDeliveryData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-stone-900">Payment</p>
                <span className="text-stone-400 italic text-sm">
                  All payments are handled securely
                </span>
              </div>
              <div>
                <div className="ring ring-blue-800 bg-stone-200 rounded-2xl overflow-hidden px-6 py-7 flex flex-col space-y-3">
                  <p className="text-center text-stone-600 text-xs md:text-sm">
                    After clicking <strong>&quot;Pay now&quot;</strong> button,
                    customer will be redirected to Payfast payment gateway to
                    complete the payment process.
                  </p>
                  <Image
                    src="https://payfast.io/wp-content/uploads/2024/12/Payfast-logo.svg"
                    alt="payment-handler"
                    width={"500"}
                    height={"500"}
                    className="self-center-safe size-40 h-fit"
                  />
                </div>
              </div>
            </div>

            <div className="lg:hidden space-y-4">
              <p className="text-2xl font-bold text-stone-900">Order summary</p>
              <div>
                <OrderSummary
                  items={items}
                  cartTotal={cartTotal}
                  shippingPrice={shippingData.price}
                  coupon={coupon}
                  onCouponChange={(e) => setCoupon(e.currentTarget?.value)}
                />
              </div>
            </div>

            <div className="py-4">
              <form action={formAction} id="payment-form">
                {Object.entries(paymentData).map(([name, value], index) => (
                  <input type="hidden" key={index} name={name} value={value} />
                ))}

                <input
                  type="hidden"
                  name="signature"
                  value={generateSignature(paymentData, passphrase)}
                />
              </form>
              <button
                form="payment-form"
                className="btn btn-primary btn-md w-full rounded-lg"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  // validateInput(e);

                  e.preventDefault();
                  console.log("Shipping data: ", shippingData);
                }}
                disabled={shippingData.method === "" || status === "submitting"}
              >
                {status === "" ? (
                  "Pay now"
                ) : status === "submitting" ? (
                  <>
                    <BiLoaderAlt className="size-8 animate-spin" />
                    {"Processing..."}
                  </>
                ) : (
                  status === "validated" && (
                    <>
                      <BiCheck className="size-8" />
                      {"Processed!"}
                    </>
                  )
                )}
              </button>
            </div>

            <div className="border-t border-stone-400 px-4 py-2 md:px-0">
              <CheckoutFooter />
            </div>
          </div>
        </div>

        {/* !! THIS WILL BE DISPLAYED ON LARGE DISPLAY !! */}
        <div className="hidden lg:block w-1/2 h-screen sticky top-0 bg-stone-100 border-l border-stone-300">
          <div className="space-y-4 p-10 max-w-[500px]">
            <OrderSummary
              items={items}
              cartTotal={cartTotal}
              shippingPrice={shippingData.price}
              coupon={coupon}
              onCouponChange={(e) => setCoupon(e.currentTarget?.value)}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
