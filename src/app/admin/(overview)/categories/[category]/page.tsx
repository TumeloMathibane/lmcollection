import Table from "@/components/ui/admin/product-table";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export default async function Category({
  params
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const product = await fetchQuery(api.products.getProducts, {
    category: category
  });

  return (
    <main className="w-full space-y-4 flex flex-col px-4 md:px-6">
      <section className="h-auto">
        <p className="text-xl text-stone-800 capitalize">
          Category: {category}
        </p>
        <p className="text-xs text-gray-400">
          Manage products of category &quot;{category}&quot;
        </p>
      </section>

      <section className="w-full space-y-4 space-x-4 flex">
        {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
          <p className="text-gray-500">
            Content for &quot;{category}&quot; will be displayed here.
          </p>
        </div> */}

        <Table data={product} />
      </section>
    </main>
  );
}
