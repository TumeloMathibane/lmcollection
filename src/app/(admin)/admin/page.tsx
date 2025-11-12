import Banner from "@/app/components/ui/admin/page-banner";

export default async function Home() {
  return (
    <main className="p-6 space-y-4">
      <section>
        <Banner title="Admin" searchFrom="all" />
      </section>

      <section>
        <div className="border w-full h-full"></div>
      </section>
    </main>
  );
}
