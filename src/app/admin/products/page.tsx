import { api } from "@/convex/_generated/api";
import { BiPlus } from "react-icons/bi";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";
import ProductTable from "@/components/ui/admin/products/product-table";

export default async function Home() {
  const products = await fetchQuery(api.products.getProducts, {});

  return (
    <main className="space-y-4 flex flex-col p-4">
      <section className="flex flex-col">
        <div className="flex items-center-safe justify-between">
          <div>
            <p className="text-xl font-bold text-stone-800">Product list</p>
          </div>

          <div className="flex gap-2">
            <Link
              href="products/add-product"
              className="btn btn-primary flex items-center-safe rounded-sm">
              <span>
                <BiPlus size={"1.5rem"} />
              </span>
              Add product
            </Link>
          </div>
        </div>
      </section>

      <section className="h-[79dvh] overflow-auto">
        <ProductTable products={products} />
      </section>
    </main>
  );
}
