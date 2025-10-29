import type { CartItem } from "@/stores/types";
import Link from "next/link";

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const total = items.reduce(
    (total, item) => total + item.productPrice * item.productQty,
    0
  );

  return (
    <>
      <p className="text-2xl font-bold text-stone-900">Cart summary</p>
      <div>
        <p className="flex justify-between">
          Estimated total:{" "}
          <span className="before:content-['R'] before:mr-2">
            {total.toFixed(2)}
          </span>
        </p>
      </div>
      <Link
        href="/payment/checkout"
        className="btn self-center-safe w-full md:text-lg"
      >
        Proceed to checkout
      </Link>
    </>
  );
}
