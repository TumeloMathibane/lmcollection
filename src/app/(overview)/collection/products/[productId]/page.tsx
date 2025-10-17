import ProductView from "@/app/components/ProductView";
import { getProduct } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
};

// generate dynamic metadata...
export default async function Product({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = (await params) ?? undefined;

  return (
    <>
      <ProductView product={getProduct(productId) ?? undefined} />
    </>
  );
}
