// import Banner from "@/components/ui/admin/banner";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-col">
      <div className="p-4">{children}</div>
    </main>
  );
}
