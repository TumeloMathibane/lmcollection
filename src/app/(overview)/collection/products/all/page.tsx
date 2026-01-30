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
      <main className="flex-1 flex flex-col py-4">
        <p className="text-4xl font-bold text-stone-900 text-center">
          Products
        </p>

        <div className="px-2 max-w-[480px] place-self-center-safe sm:max-w-2xl lg:max-w-5xl">
          <div className="space-y-4">
            <div className="border-b border-stone-300 pb-3">
              <p>
                This is the catalog page.{" "}
                {products &&
                  `(${products?.length}) ${products?.length > 1 ? "products" : "product"}`}
              </p>
            </div>

            <div className="h-full w-full">
              <CollectionView products={products} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
