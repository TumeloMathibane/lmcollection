import ProductList from "@/components/product-list";
import ProductView from "@/components/product-view";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Loading from "./loading";
import type { Product } from "../types";

export const metadata: Metadata = {
  title: "Product",
};

export default async function Product({
  params,
}: {
  params: Promise<{ productId: Id<"product"> }>;
}) {
  const product = await fetchQuery(api.products.getProduct, {
    id: (await params)?.productId,
  });

  const products = await fetchQuery(api.products.getProducts, {
    category: product?.category,
    count: 5,
  });

  if (!product)
    return (
      <div className="flex-1">
        <Loading />
      </div>
    );

  return (
    <main className="flex-1 p-2 space-y-2 xl:w-[70%] xl:place-self-center-safe xl:py-10">
      <ProductView product={product} />

      <div className="border-t border-stone-900 w-[50%] place-self-center-safe my-4" />

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
