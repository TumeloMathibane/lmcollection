import AddProductForm from "@/components/ui/admin/products/add-product-form";

export default async function Home() {
  return (
    <main className="flex-1 space-y-4 flex flex-col p-2 lg:place-items-center">
      <section className="h-full flex flex-col lg:w-[85%]">
        <div className="flex items-center-safe justify-between py-1.5">
          <p className="text-xl font-bold text-stone-800">Add product</p>
        </div>

        <div className="z-1">
          <AddProductForm />
        </div>
      </section>
    </main>
  );
}
