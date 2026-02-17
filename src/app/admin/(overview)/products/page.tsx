import { BiPlus } from "react-icons/bi";
import Link from "next/link";
import ProductTable from "@/components/ui/admin/products/product-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Manage your product listings",
};

export default async function Home() {
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

      <section className="h-[79dvh] overflow-y-auto">
        {/* Change this component to have products queried inside it */}
        <ProductTable />
      </section>
    </main>
  );
}
