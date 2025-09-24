"use client";

import { ChangeEvent, useState } from "react";
import ImageWithFallback from "./ImageWithFallback";
import { useCartStore } from "@/stores/cart";
import ItemCard from "./ui/checkout/ItemCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { generateSignature } from "../utils/helper";
import md5 from "md5";
import { orderCount } from "@/convex/orders";

type ShippingFormProp = {
  m_key: string;
  m_id: string;
  passphrase?: string;
};

export default function ShippingForm({
  m_key,
  m_id,
  passphrase,
}: ShippingFormProp) {
  const { items, getTotalPrice } = useCartStore();

  const [subTotal, setSubTotal] = useState<number>(getTotalPrice());
  const [data, setData] = useState({});
  const [paymentData, setPaymentData] = useState({
    merchant_key: m_key,
    merchant_id: m_id,
    amount: subTotal,
  });
  const [shippingData, setShippingData] = useState({});

  const ordersCount = useQuery(api.orders.orderCount) ?? 0;
  // const c_orders = ordersCount + 1;
  const c_orders = ordersCount + 1;

  // good!!
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    // saving state of shipping info
    if (name !== "save_info")
      setShippingData((prevVal) => ({
        ...prevVal,
        [name]: value.trim(),
      }));

    // saving state of payment info
    if (
      name === "name_first" ||
      name === "name_last" ||
      name === "email_address" ||
      name === "cell_number"
    ) {
      setPaymentData((prevVal) => ({
        ...prevVal,
        [name]: value.trim(),
      }));
    }

    // saving state of all information provided and saving correct state of checkbox
    if (e.currentTarget instanceof HTMLInputElement) {
      const { name, value, checked } = e.currentTarget;

      setData((prevVal) => ({
        ...prevVal,
        [name]: name === "save_info" ? checked : value.trim(),
      }));

      if (value === "tcg")
        setPaymentData((prevVal) => ({
          ...prevVal,
          amount: prevVal.amount + 10,
        }));
      else if (value === "paxi")
        setPaymentData((prevVal) => ({
          ...prevVal,
          amount: prevVal.amount + 5,
        }));
    }
  };

  const prepData = async () => {
    const order_number =
      items.length !== 1
        ? "LMCOrder#" + c_orders.toString()?.padStart(6, "0")
        : encodeURIComponent(
            items.map((item) => item.productName)[0].trim()
          ).replace(/%20/g, "+");
    const payment_id = md5(order_number + passphrase);

    setPaymentData((prevVal) => ({
      ...prevVal,
      m_payment_id: payment_id,
      item_name: order_number,
    }));
  };

  return (
    <>
      <div className="space-y-5">
        <div className="delivery-form">
          <p className="text-2xl font-semibold pb-4">Delivery</p>
          <div className="w-full space-y-3 flex flex-col">
            <input
              type="text"
              name="name_first"
              id="name_first"
              placeholder="First name"
              className="w-full input input-md"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name_last"
              id="name_last"
              placeholder="Last name"
              className="w-full input input-md"
              onChange={handleInputChange}
            />

            {/* Address */}
            <input
              type="text"
              name="street_addr"
              id="streetAddr"
              placeholder="Street address"
              className="w-full input input-md"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="houseNo"
              id="houseNo"
              placeholder="Apartment, suite no, etc."
              className="w-full input input-md"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              className="w-full input input-md"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="postal_code"
              id="postalCode"
              placeholder="Postal code"
              className="w-full input input-md"
              onChange={handleInputChange}
            />
            <select
              name="province"
              id="province"
              className="w-full select select-md"
              onChange={handleInputChange}
            >
              <option value="">Select province</option>
              <option value="Western Cape">Western Cape</option>
            </select>
            <select
              name="country"
              id="country"
              className="w-full select select-md"
              onChange={handleInputChange}
            >
              <option value="">Select country</option>
              <option value="South Africa">South Africa</option>
            </select>
            <input
              type="text"
              name="cell_number"
              id="cell_number"
              placeholder="Cellphone number"
              className="w-full input input-md"
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email_address"
              id="email-address"
              className="input input-md w-full"
              placeholder="Email address"
              onChange={handleInputChange}
            />
            <div className="flex space-x-2 py-1">
              <input
                type="checkbox"
                name="save_info"
                id="save_info"
                className="checkbox checkbox-sm"
                value={undefined}
                onChange={handleInputChange}
              />
              <label htmlFor="save_info">Save information for next time</label>
            </div>
          </div>
          <div className="shipping-method space-y-3">
            <p className="text-xl font-semibold">Shipping method</p>
            <div className="flex space-x-4 bg-stone-300 p-5 rounded-lg">
              <div className="flex items-center-safe space-x-4">
                <input
                  type="radio"
                  id="shipping-paxi"
                  name="shipping_method"
                  className="radio radio-sm"
                  value="paxi"
                  onChange={handleInputChange}
                />
                <label htmlFor="shipping-paxi" className="size-30 h-fit">
                  <ImageWithFallback
                    src="https://cdn.prod.website-files.com/632874eb357ffe9936d5498d/636a4b9640d40d161b81e109_PAXI_logo%5B93%5D.webp"
                    alt="paxi"
                  />
                </label>
              </div>
              <div className="flex items-center-safe space-x-4">
                <input
                  type="radio"
                  id="shipping-tcg"
                  name="shipping_method"
                  className="radio radio-sm"
                  value="tcg"
                  onChange={handleInputChange}
                />
                <label htmlFor="shipping-tcg" className="size-30 h-fit">
                  <ImageWithFallback
                    src="https://thecourierguy.co.za/wp-content/uploads/2025/03/tcg-logo.svg"
                    alt="tcg"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-form space-y-3 pt-3">
          <div>
            <p className="text-2xl font-semibold">Payment</p>
            <span>
              <p className="text-stone-500">
                All transactions are handled securely through Payfast
              </p>
            </span>
          </div>
          <div className="p-6 bg-stone-300 rounded-lg space-y-2">
            <p>
              Customers are redirected to the Payfast payment process site for
              payment completion
            </p>
            <ImageWithFallback
              src="https://payfast.io/wp-content/uploads/2024/12/Payfast-logo.svg"
              alt="official-payfast"
            />
          </div>
        </div>

        <div className="space-y-5 pt-3">
          <p className="text-2xl font-semibold">Order summary</p>
          <div className="space-y-4">
            {items.map((item, key) => (
              <div key={key}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <div className="w-full space-y-3 flex flex-col">
            <div className="space-x-5 flex">
              <input
                type="text"
                name="discount_coupon"
                id="discount-coupon-page"
                className="input input-lg w-full"
                placeholder="Discount code"
              />
              <button type="button" className="btn btn-lg rounded-lg" disabled>
                Apply
              </button>
            </div>
            <div>
              <div className="w-full space-x-5 flex justify-between">
                <p>Subtotal</p>
                <p className="before:content-['R'] before:mr-1">{subTotal}</p>
              </div>
              <div className="w-full flex justify-between">
                <p>Shipping</p>
                <p className="text-stone-600 italic">Shipping price</p>
              </div>
            </div>
            <div className="w-full flex justify-between text-xl font-bold">
              <p>Total</p>
              <p className="before:content-['R'] before:mr-1">{subTotal}</p>
            </div>

            <form method="post">
              {/* //!! CONTINUE FROM HERE ONWARDS !!\\ */}
              {Object.entries(paymentData).map(([key, val], index) => (
                <input
                  type="hidden"
                  key={index}
                  name={key}
                  id={key}
                  value={val}
                />
              ))}
              <input
                type="hidden"
                name="signature"
                id="signature"
                value={generateSignature(paymentData, passphrase)}
              />
              <button
                type="submit"
                className="btn btn-primary w-full rounded-md"
                onClick={(e) => {
                  e.preventDefault();

                  // here I need to fill in m_payment_id, amount, and item_name (this is the name of the one item bought, or in case of many, you can enter the order id)

                  prepData();

                  console.log("Payment data: ", paymentData);

                  // process data, then submit form thereafter
                }}
              >
                Pay now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// 4f50b7fcef79752f3027c6a22ff78385
