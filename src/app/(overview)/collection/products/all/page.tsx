import CollectionView from "@/components/collection-view";
import Loading from "./loading";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { api } from "@/convex/_generated/api";

export const metadata: Metadata = {
  title: "Catalog",
  description: "LMCollection product catalog",
};

export default async function Collection({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = await fetchQuery(api.products.getProducts, {
    category: category,
  });

  if (!products) return <Loading />;

  if (products?.length === 0) {
    return (
      <>
        <main className="flex-1 flex justify-center-safe items-center-safe">
          <p className="text-4xl font-bold text-stone-900 text-center xl:py-2">
            No products
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="flex-1 flex flex-col p-2 space-y-2">
        <p className="text-4xl font-bold text-stone-900 text-center xl:text-6xl xl:py-2">
          Products
        </p>
        <p>
          This is the catalog page.{" "}
          {products &&
            `(${products?.length}) ${products?.length > 1 ? "products" : "product"}`}
        </p>

        <div className="h-full w-full">
          <CollectionView products={products} />
        </div>
      </main>
    </>
  );
}
