import CheckoutMain from "@/app/components/Checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function Checkout() {
  const merchant_key = process.env.PAYGATE_MERCHANT_KEY ?? "";
  const merchant_id = process.env.PAYGATE_MERCHANT_ID ?? "";
  const passphrase = process.env.PAYGATE_SALT_PASSPHRASE;
  const formActionURL = process.env.PAYGATE_TEST_URL ?? "";

  return (
    <>
      <CheckoutMain
        m_key={merchant_key}
        m_id={merchant_id}
        passphrase={passphrase}
        formAction={formActionURL}
      />
    </>
  );
}
