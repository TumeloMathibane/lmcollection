import { Metadata } from "next";
import CartView from "@/app/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
};

// generate dynamic metadata to cart items length...
export default function Cart() {
  return <CartView />;
}
