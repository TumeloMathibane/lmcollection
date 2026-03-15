import type { CartItem } from "../../../../stores/types";
import Link from "next/link";

interface CartSummaryProps {
  items: CartItem[];
  onCartClear?: () => void;
}

export default function CartSummary({ items, onCartClear }: CartSummaryProps) {
  const total = items.reduce(
    (total, item) =>
      Number.isNaN(item.productPrice * item.productQty) ? total : (
        total + item.productPrice * item.productQty
      ),
    0,
  );

  return (
    <>
      <div className="flex items-center-safe justify-between">
        <p className="text-2xl font-bold text-stone-900">Cart summary</p>

        <p
          className="text-sm text-red-500 font-semibold hover:cursor-pointer flex flex-col w-fit group"
          onClick={() => onCartClear && onCartClear()}>
          Clear cart
          <span className="border-b w-0 transition-all duration-500 group-hover:w-full" />
        </p>
      </div>

      <div>
        <p className="flex justify-between">
          Estimated total:{" "}
          {new Intl.NumberFormat("en-ZA", {
            style: "currency",
            currency: "ZAR",
          }).format(total)}
        </p>
      </div>
      {items.length > 0 && (
        <Link
          href="/payments/checkout"
          className="btn self-center-safe w-full md:text-lg">
          Proceed to checkout
        </Link>
      )}
    </>
  );
}
