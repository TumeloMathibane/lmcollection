import { Metadata } from "next";
import CartView from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Cart",
};

// generate dynamic metadata to cart items length...
export default async function Cart() {
  return <CartView />;
}
