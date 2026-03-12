import ProductList from "@/components/product-list";
import ProductView from "@/components/ui/products/product-view";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import type { Product } from "../types";

export const metadata: Metadata = {
  title: "Product",
};

export default async function Product({
  params,
}: {
  params: Promise<{ productId: Id<"product"> }>;
}) {
  const prodId = await params;

  const { category } = (await fetchQuery(api.products.getProduct, {
    id: prodId.productId,
  })) as Product;

  const products = await fetchQuery(api.products.getProducts, {
    category: category,
    count: 5,
  });

  return (
    <main className="flex-1 p-2 space-y-2 sm:max-w-lg sm:place-self-center-safe md:max-w-4xl xl:py-10">
      <ProductView productId={prodId.productId} />

      <div className="border-t border-stone-900 w-[50%] mx-auto my-4" />

      <section className="mb-4 space-y-2">
        <p className="text-lg font-bold text-stone-900">
          Products you may like...
        </p>
        <section>
          <ProductList products={products} />
        </section>
      </section>
    </main>
  );
}
