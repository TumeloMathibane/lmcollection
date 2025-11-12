import Banner from "@/app/components/ui/admin/page-banner";

export default async function Home() {
  return (
    <main className="w-full h-full">
      <Banner title="categories" searchFrom="categories" />
      <p>Category page</p>
    </main>
  );
}
