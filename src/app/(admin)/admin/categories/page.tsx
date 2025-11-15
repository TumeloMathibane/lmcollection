import Banner from "@/app/components/ui/admin/page-banner";

export default async function Home() {
  return (
    <main className="p-6 space-y-4 flex flex-col h-screen">
      {/* <Banner title="categories" searchFrom="categories" /> */}
      <section>
        <Banner title="categories" />
      </section>

      <section className="h-full">
      </section>
    </main>
  );
}
