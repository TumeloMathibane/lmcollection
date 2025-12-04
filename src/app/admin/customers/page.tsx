import Banner from "@/components/ui/admin/page-banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Home() {
  return (
    <main className="p-6 space-y-4 flex flex-col h-screen">
      <section>
        <Banner title="orders" />
      </section>

      <section className="h-full">
        <p>Orders...</p>
      </section>
    </main>
  );
}
