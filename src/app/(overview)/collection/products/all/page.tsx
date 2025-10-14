import CollectionView from "@/app/components/CollectionView";
import { getProducts } from "@/app/lib/data";
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
  const query = (await searchParams).category;
  const products =
    process.env.NEXT_PUBLIC_ENV !== "development"
      ? await fetchQuery(api.products.get, { category: query })
      : getProducts((await searchParams).category, undefined);

  return (
    <>
      <CollectionView products={products} />
    </>
  );
}
