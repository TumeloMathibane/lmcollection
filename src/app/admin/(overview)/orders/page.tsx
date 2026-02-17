import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function Home() {
  return (
    <main className="p-4 space-y-4 flex flex-col">
      <section>
        <p className="font-bold text-xl">Orders...</p>
      </section>
    </main>
  );
}
