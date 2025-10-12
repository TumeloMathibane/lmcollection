import CollectionView from "@/app/components/CollectionView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog",
  description: "LMCollection product catalog",
};

export default function Collection() {
  return (
    <>
      <CollectionView />
    </>
  );
}
