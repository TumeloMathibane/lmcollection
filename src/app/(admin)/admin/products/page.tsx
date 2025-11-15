import Banner from "@/app/components/ui/admin/page-banner";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { BiPlus } from "react-icons/bi";

export default async function Home() {
    // query products and pass them to the ui table component...
    const products = await fetchQuery(api.products.get, {});

    return (
        <main className="p-6 space-y-4 flex flex-col h-screen">
            <section>
                <Banner title="products" />
            </section>

            <section className="h-full flex flex-col">
                <div className="flex justify-between py-3">
                    {/* top banner of the products' display */}
                    <div>
                        <p className="text-xl font-bold text-stone-800">Product list</p>
                    </div>

                    <div className="flex gap-2">
                        <div className="border border-primary text-primary rounded-md py-1 px-6">
                            <p className="flex items-center-safe"><span><BiPlus /></span>Add product</p>
                        </div>
                        {/* <div className="border border-stone-400 text-stone-400 py-1 px-4 rounded-full">
                            <p>Search products...</p>
                        </div> */}
                    </div>
                </div>

                <div className="border flex-1 rounded-md flex items-center-safe justify-center">
                    {/* table for displaying products */}

                    {products?.length === 0 ? <p className="text-4xl font-bold text-stone-900">No products</p> : <p className="text-4xl font-bold text-stone-900">Products</p>}
                </div>
            </section>
        </main>
    );
}
