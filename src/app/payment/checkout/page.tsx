// Do onsite payment method...
import OrderSummary from "@/app/components/OrderSummary";
import ShippingForm from "@/app/components/ShippingForm";

export default function Checkout() {
  const merchant_key = process.env.PAYGATE_MERCHANT_KEY ?? "";
  const merchant_id = process.env.PAYGATE_MERCHANT_ID ?? "";
  const passphrase = process.env.PAYGATE_MERCHANT_SALT_PASSPHRASE;

  return (
    <main className="flex flex-col min-h-[41em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em]">
      <OrderSummary />
      <div className="checkout-content bg-white z-10 min-h-screen">
        <div className="p-5">
          <ShippingForm
            passphrase={passphrase}
            m_key={merchant_key}
            m_id={merchant_id}
          />
        </div>
      </div>
    </main>
  );
}
