import AddProductForm from "@/components/ui/admin/products/add-product-form";

export default async function Home() {
  return (
    <main className="flex-1 space-y-4 flex flex-col p-2">
      <section className="h-full flex flex-col">
        <div className="flex items-center-safe justify-between">
          <p className="text-xl font-bold text-stone-800">Add product</p>
        </div>

        <div className="z-1 flex-1 flex">
          <AddProductForm />
        </div>
      </section>
    </main>
  );
}
