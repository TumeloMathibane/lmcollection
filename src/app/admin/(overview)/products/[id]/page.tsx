import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";

export default async function Home({
  params,
}: {
  params: Promise<{ id: Id<"product"> }>;
}) {
  const prodId = (await params).id;
  const product = await fetchQuery(api.products.getProduct, { id: prodId });

  return (
    <main className="p-4">
      <p>
        You are viewing product ({product?.name}) with ID{" "}
        {prodId === product?._id && prodId}
      </p>

      <Image
        src={product?.images[0] || ""}
        alt={product?.name || "Product Image"}
        width={500}
        height={500}
        priority={false}
      />
    </main>
  );
}
