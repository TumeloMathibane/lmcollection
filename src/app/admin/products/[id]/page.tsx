import { Id } from "@/convex/_generated/dataModel";

export default async function Home({
  params,
}: {
  params: Promise<{ id: Id<"product"> }>;
}) {
  const prodId = (await params).id;

  return (
    <main>
      {prodId ?
        <p>You are viewing product with id {prodId}</p>
      : <p>Manually enter product id in url to see the value</p>}
    </main>
  );
}
