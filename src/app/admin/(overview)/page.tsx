import { Card } from "@/components/ui/admin/cards";
import ProductTable from "@/components/ui/admin/products/product-table";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";

export default async function Home() {
  const products = (await fetchQuery(api.products.getProducts, {})) ?? [];
  const orders = (await fetchQuery(api.orders.orderCount, {})) ?? 0;
  const stockValue = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
  // {/* \u2248 for approximately, & \u00b1 for plus/minus */}

  return (
    <main className="w-full flex-1 p-2 lg:p-6">
      <h1 className="text-xl font-bold mb-4 w-fit">Admin Overview</h1>

      <section className="w-full space-y-4">
        {/* <CardList /> */}
        <div className="flex gap-2 w-full overflow-x-auto border-b border-stone-200 pb-4">
          <div className="flex w-full space-x-2">
            <Card
              className="border border-stone-200 rounded-md min-w-1/2 h-fit space-y-2 my-2 px-4"
              heading={"Stock value"}
              content={`${new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(stockValue)}`}
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

          <div className="w-full max-h-[80dvh] overflow-auto z-1">
            <ProductTable products={products} />
          </div>
        </div>
      </section>
    </main>
  );
}
