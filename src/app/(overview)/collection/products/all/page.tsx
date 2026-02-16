import CollectionView from "@/components/collection-view";
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
  const { category } = await searchParams;

  return (
    <main className="flex-1">
      <div className="h-full w-full">
        <CollectionView category={category ?? ""} />
      </div>
    </main>
  );
}
