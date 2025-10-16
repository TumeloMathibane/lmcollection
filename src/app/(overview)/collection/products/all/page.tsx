import CollectionView from "@/app/components/CollectionView";
import { getProducts } from "@/app/lib/data";
import { Metadata } from "next";

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

  return (
    <>
      <CollectionView products={(await getProducts(query)) ?? undefined} />
    </>
  );
}
