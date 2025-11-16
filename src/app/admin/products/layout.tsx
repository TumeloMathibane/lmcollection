import Banner from "@/app/components/ui/admin/page-banner";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative p-6 space-y-4 flex flex-col h-screen">
      <section>
        <Banner title="products" />
      </section>

      {children}
    </main>
  );
}
