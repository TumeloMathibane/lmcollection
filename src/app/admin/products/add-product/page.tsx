import AddProductForm from "@/components/ui/admin/products/add-product-form";

export default async function Home() {
  return (
    <main className="space-y-4 flex flex-col h-full">
      <section className="h-full flex flex-col gap-4">
        <div className="flex items-center-safe justify-between">
          <p className="text-xl font-bold text-stone-800">Add product</p>
        </div>

        <div>
          <AddProductForm />
        </div>
      </section>
    </main>
  );
}
