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
    <div className="flex flex-col space-y-3 rounded-lg border lg:border-0 border-stone-400 p-3">
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
    </div>
  );
}
