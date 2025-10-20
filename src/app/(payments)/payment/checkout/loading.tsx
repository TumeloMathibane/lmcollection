import CheckoutSkeleton from "@/app/components/ui/checkout/CheckoutSkeleton";

export default function Loading() {
  return (
    <main className="animate-pulse">
      <CheckoutSkeleton />
    </main>
  );
}
