import ProductView from "@/app/components/ProductView";
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
  const { productId } = await params;

  return (
    <>
      <ProductView productId={productId} />
    </>
  );
}
