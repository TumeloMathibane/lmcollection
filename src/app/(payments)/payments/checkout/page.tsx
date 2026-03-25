import CheckoutMain from "@/components/checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function Checkout() {
  const merchant_key = process.env.PAYFAST_MERCHANT_KEY ?? "";
  const merchant_id = process.env.PAYFAST_MERCHANT_ID ?? "";
  const passphrase = process.env.PAYFAST_SALT_PASSPHRASE ?? "";
  const formActionURL = process.env.NEXT_PUBLIC_PAYFAST_TEST_URL ?? "";

  // https://d1r891fk-4000.eun1.devtunnels.ms/ url changes based on developers devtunnel config
  const gatewayURL = {
    return:
      process.env.VERCEL_ENV === "production" ?
        `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/return`
      : "https://d1r891fk-4000.eun1.devtunnels.ms/return",
    notify:
      process.env.VERCEL_ENV === "production" ?
        `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/notify`
      : "https://d1r891fk-4000.eun1.devtunnels.ms/notify",
    cancel:
      process.env.VERCEL_ENV === "production" ?
        `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/cancel`
      : "https://d1r891fk-4000.eun1.devtunnels.ms/cancel",
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
