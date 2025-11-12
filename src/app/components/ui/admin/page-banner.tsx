"use client";

export default function Banner({
  title,
  searchFrom,
}: {
  title: string;
  searchFrom?: "products" | "categories" | "customers" | "all";
}) {
  return (
    <main className="flex justify-between w-full">
      <h1 className="capitalize text-2xl font-bold text-stone-950">{title}</h1>
      <section>
        {searchFrom === "categories" && (
          <input
            type="search"
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

        {searchFrom === "all" && (
          <input
            type="text"
            className="border border-stone-300 rounded-full ps-4 py-1"
            placeholder="Search Store..."
          />
        )}
      </section>
    </main>
  );
}
