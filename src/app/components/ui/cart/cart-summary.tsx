import type { CartItem } from "../../../../stores/types";
import Link from "next/link";

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const total = items.reduce(
    (total, item) =>
      Number.isNaN(item.productPrice * item.productQty) ? total : (
        total + item.productPrice * item.productQty
      ),
    0,
  );

  return (
    <>
      <p className="text-2xl font-bold text-stone-900">Cart summary</p>
      <div>
        <p className="flex justify-between">
          Estimated total:{" "}
          {new Intl.NumberFormat("en-ZA", {
            style: "currency",
            currency: "ZAR",
          }).format(total)}
        </p>
      </div>
      <Link
        href="/payments/checkout"
        className="btn self-center-safe w-full md:text-lg">
        Proceed to checkout
      </Link>
    </>
  );
}
