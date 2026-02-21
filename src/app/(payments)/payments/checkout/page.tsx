import CheckoutMain from "@/components/checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function Checkout() {
  const merchant_key = process.env.PAYGATE_MERCHANT_KEY ?? "";
  const merchant_id = process.env.PAYGATE_MERCHANT_ID ?? "";
  const passphrase = process.env.PAYGATE_SALT_PASSPHRASE;
  const formActionURL = process.env.PAYGATE_TEST_URL ?? "";

  const gatewayURL = {
    return:
      process.env.VERCEL_ENV === "production" ?
        `https://${process.env.VERCEL_URL}/return`
      : "https://d1r891fk-3000.eun1.devtunnels.ms/return",
    notify:
      process.env.VERCEL_ENV === "production" ?
        `https://${process.env.VERCEL_URL}/notify`
      : "https://d1r891fk-3000.eun1.devtunnels.ms/notify",
    cancel:
      process.env.VERCEL_ENV === "production" ?
        `https://${process.env.VERCEL_URL}/cancel`
      : "https://d1r891fk-3000.eun1.devtunnels.ms/cancel",
  };

  return (
    <CheckoutMain
      m_key={merchant_key}
      m_id={merchant_id}
      passphrase={passphrase}
      formAction={formActionURL}
      gatewayURL={gatewayURL}
    />
  );
}
