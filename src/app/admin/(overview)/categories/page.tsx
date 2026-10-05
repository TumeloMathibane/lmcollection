import CategoryTable from "@/components/ui/admin/categories/category-table";
import { api } from "@/convex/_generated/api";
import { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";

export const metadata: Metadata = {
  title: "Categories"
};

export default async function Home() {
  const products = await fetchQuery(api.products.getProducts, {});

  return (
    <main className="w-full space-y-4 flex flex-col px-4 md:px-6">
      <section className="h-auto">
        <p className="text-xl text-stone-900">Category list</p>
        <p className="text-xs text-gray-600">
          Manage your product categories here.
        </p>
      </section>

      <section className="w-full space-y-4">
        <CategoryTable products={products} />
      </section>
    </main>
  );
}
