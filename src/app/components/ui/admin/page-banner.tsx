"use client";

export default function Banner({
  title
}: {
  title: string;
}) {
  return (
    <main className="flex justify-between w-full">
      <h1 className="capitalize text-3xl font-bold text-stone-950">{title}</h1>
      <section>
        <input
          type="text"
          className="border border-stone-400 rounded-full ps-4 py-1"
          placeholder="Search Store..."
        />
      </section>
    </main>
  );
}
