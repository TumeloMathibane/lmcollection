"use client";

export default function Banner({
  title,
  searchFrom,
}: {
  title: string;
  searchFrom: "products" | "categories" | "customers";
}) {
  return (
    <main className="flex justify-between w-full">
      <h1 className="capitalize">{title}</h1>
      <section>
        {searchFrom === "categories" && (
          <input
            type="text"
            className="border border-stone-300 rounded-full ps-4 py-1"
            placeholder="Search categories..."
          />
        )}
        {searchFrom === "products" && (
          <input
            type="text"
            className="border border-stone-300 rounded-full ps-4 py-1"
            placeholder="Search products..."
          />
        )}
        {searchFrom === "customers" && (
          <input
            type="text"
            className="border border-stone-300 rounded-full ps-4 py-1"
            placeholder="Search customers..."
          />
        )}
      </section>
    </main>
  );
}
