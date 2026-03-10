// import Banner from "@/components/ui/admin/banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function Home() {
  return (
    <main className="p-4 space-y-4">
      {/* <Banner title="categories" searchFrom="categories" /> */}

      <section className="h-auto">
        <p className="text-xl font-bold">Categories</p>
      </section>
    </main>
  );
}
