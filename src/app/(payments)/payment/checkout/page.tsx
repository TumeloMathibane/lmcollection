import CheckoutMain from "@/components/checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function Checkout() {
  const merchant_key = process.env.PAYGATE_MERCHANT_KEY ?? "";
  const merchant_id = process.env.PAYGATE_MERCHANT_ID ?? "";
  const passphrase = process.env.PAYGATE_SALT_PASSPHRASE;
  const formActionURL = process.env.PAYGATE_TEST_URL ?? "";

  const gatewayURL = {
    return:
      process.env.VERCEL_ENV === "production" ?
        `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/payments/return`
      : "https://gkhg4mlb-3000.euw.devtunnels.ms/payments/return",
    notify:
      process.env.VERCEL_ENV === "production" ?
        `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/payments/notify`
      : "https://gkhg4mlb-3000.euw.devtunnels.ms/payments/notify",
    cancel:
      process.env.VERCEL_ENV === "production" ?
        `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/payments/cancel`
      : "https://gkhg4mlb-3000.euw.devtunnels.ms/payments/cancel",
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
