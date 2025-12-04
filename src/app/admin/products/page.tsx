// import { api } from "@/convex/_generated/api";
import { BiPlus } from "react-icons/bi";
// import { fetchQuery } from "convex/nextjs";
import ProductTable from "@/components/ui/admin/products/product-table";
import Link from "next/link";

export default async function Home() {
  // const products = await fetchQuery(api.products.get, {});

  return (
    <main className="relative space-y-4 flex flex-col h-full">
      <section className="h-full flex flex-col">
        <div className="flex items-center-safe justify-between py-3">
          <div>
            <p className="text-xl font-bold text-stone-800">Product list</p>
          </div>

          <div className="flex gap-2">
            {/* <div className='border border-primary text-primary rounded-md py-1 px-6'> */}
            <Link
              href="products/add-product"
              className="btn btn-primary flex items-center-safe px-10 rounded-sm">
              <span>
                <BiPlus size={"1.5rem"} />
              </span>
              Add product
            </Link>
          </div>
        </div>

        <div className="border flex-1 rounded-md">
          <div className="p-2">
            <ProductTable />
          </div>
        </div>
      </section>
    </main>
  );
}
