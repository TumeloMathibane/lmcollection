import CheckoutSkeleton from "@/app/components/ui/checkout/checkout-skeleton";

export default function Loading() {
  return (
    <main className="animate-pulse">
      <CheckoutSkeleton />
    </main>
  );
}
