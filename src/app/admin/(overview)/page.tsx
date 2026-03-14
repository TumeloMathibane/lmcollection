import ProductTable from "@/components/ui/admin/products/product-table";
import { dynamicPricedItem } from "@/utils/helper";
import type { Product } from "@/(overview)/collection/products/types";
import { fetchQuery } from "convex/nextjs";
import { Card } from "@/components/ui/admin/cards";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; edit?: string }>;
}) {
  const { view, edit } = await searchParams;

  let products: Product[] | undefined;
  try {
    products = await fetchQuery(api.products.getProducts, {});
  } catch (error) {
    console.error("Error fetching products for admin overview:", error);
  }

  const orders = (await fetchQuery(api.orders.orderCount, {})) ?? 0;
  const stockValue = products?.reduce(
    (total, product) =>
      total +
      (product.dynamic_pricing ?
        (dynamicPricedItem(product)?.totalValue ?? 0)
      : product?.price),
    0,
  );
  // {/* \u2248 for approximately, & \u00b1 for plus/minus */}

  return (
    <main className="w-full p-2 lg:p-6">
      <h1 className="text-xl font-bold mb-4 w-fit">Admin Overview</h1>

      <section className="w-full space-y-4">
        {/* CardList */}
        <div className="flex gap-2 w-full overflow-x-auto border-b border-stone-200 pb-4">
          <div className="flex w-full space-x-2">
            <Card
              className="border border-stone-200 rounded-md min-w-1/2 h-fit space-y-2 my-2 px-4"
              heading={"Stock value"}
              content={`${new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(stockValue ?? 0)}`}
            />

            <Card
              className="border border-stone-200 rounded-md min-w-1/2 h-fit space-y-2 my-2 px-4"
              heading={"Orders"}
              content={`${String(orders)}`}
            />

            <Card
              className="border border-stone-200 rounded-md min-w-1/2 h-fit space-y-2 my-2 px-4"
              heading={"Revenue"}
              content={`\u00b1 ${new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(0)}`}
            />
          </div>
        </div>

        {/* table component */}
        <div className="w-full space-y-2">
          <h1 className="text-xl font-bold text-stone-900">
            <Link href="/admin/products">Products</Link>
          </h1>

          <div className="w-full max-h-[65dvh] overflow-y-auto z-1 border-b border-stone-300">
            <ProductTable searchParams={{ view, edit }} viewing={true} />
          </div>
        </div>
      </section>
    </main>
  );
}
