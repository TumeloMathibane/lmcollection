import ProductList from "@/components/product-list";
import ProductView from "@/components/product-view";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Product",
};

export default async function Product({
  params,
}: {
  params: Promise<{ productId: Id<"product"> }>;
}) {
  const productId = (await params)?.productId ?? "";
  const product =
    (await fetchQuery(api.products.getProduct, { id: productId })) ?? undefined;
  const products = await fetchQuery(api.products.getCategoryProducts, {
    category: product?.category ?? "",
    count: 5,
  });

  if (!product) return <Loading />;

  return (
    <main className="p-2 space-y-2 xl:w-[70%] xl:place-self-center-safe xl:py-10 min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em]">
      <ProductView product={product} />
      <div className="border-t border-stone-900 w-[50%] place-self-center-safe my-4" />
      <section>
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
