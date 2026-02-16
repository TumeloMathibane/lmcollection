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

  return (
    <main className="p-4 w-screen">
      <h1 className="text-xl font-bold mb-4">Admin Overview</h1>

      <section className="w-full space-y-4">
        {/* <CardList /> */}
        <div className="w-full flex gap-2 overflow-x-auto border-b border-stone-200">
          <div className="flex w-full space-x-2 pb-4">
            {/* \u2248 for approximately, & \u00b1 for plus/minus */}
            <Card
              className="border border-stone-200 rounded-md p-2 min-w-1/2 h-fit space-y-2 my-2 px-4"
              heading={"Stock value"}
              content={`${new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(stockValue)}`}
            />

            <Card
              className="border border-stone-200 rounded-md p-2 min-w-1/2 h-fit space-y-2 my-2 px-4"
              heading={"Orders"}
              content={`${String(orders)}`}
            />

            <Card
              className="border border-stone-200 rounded-md p-2 min-w-1/2 h-fit space-y-2 my-2 px-4"
              heading={"Revenue"}
              content={`\u00b1 ${new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(0)}`}
            />
          </div>
        </div>

        {/* table component */}
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-stone-900">
            <Link href="/admin/products">Products</Link>
          </h1>

          <div className="max-h-[80dvh] overflow-auto -m-0.5">
            <ProductTable products={products} />
          </div>
        </div>
      </section>
    </main>
  );
}
