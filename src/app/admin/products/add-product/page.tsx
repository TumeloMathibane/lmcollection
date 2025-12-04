import ProductForm from "@/components/ui/admin/products/add-product-form";

export default async function Home() {
  return (
    <main className="relative space-y-4 flex flex-col h-full">
      <section className="h-full flex flex-col">
        <div className="flex items-center-safe justify-between py-3">
          <p className="text-xl font-bold text-stone-800">Add product</p>
        </div>

        {/* <div className="border flex-1 rounded-md w-full h-full"> */}
        <div className="h-full w-full">
          <ProductForm />
        </div>
        {/* </div> */}
      </section>
    </main>
  );
}
