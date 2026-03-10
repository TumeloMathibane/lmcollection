import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Home() {
  return (
    <main className="p-4 space-y-4 flex flex-col">
      <section>
        <p className="text-xl font-bold">Customers...</p>
      </section>
    </main>
  );
}
