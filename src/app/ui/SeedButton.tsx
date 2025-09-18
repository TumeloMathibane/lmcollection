"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import products from "../../data/product-catalog.json";

export default function SeedBtn() {
  const addMany = useMutation(api.products.addMany);

  const _prod = useQuery(api.products.get);

  return (
    <button
      className={`btn btn-secondary px-5 rounded-md`}
      onClick={() => addMany({ products })}
      disabled={_prod?.length > 0}
    >
      Seed data
    </button>
  );
}
