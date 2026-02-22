import ReturnView from "@/components/ui/return-view";

export default async function Page() {
  const res = await fetch(
    process.env.VERCEL_ENV === "production" ?
      `https://${process.env.VERCEL_URL}/notify`
    : "https://d1r891fk-3000.eun1.devtunnels.ms/notify",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const paymentStatus = (await res.json())?.message;

  return (
    <div className="flex-1 flex flex-col min-h-[75dvh]">
      <div className="flex-1 flex justify-center-safe items-center-safe px-4">
        <ReturnView paymentStatus={paymentStatus} />
      </div>
    </div>
  );
}
