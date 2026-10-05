"use client";

import categoryList from "@/lib/categories.json";
import type { Product } from "@/(overview)/collection/products/types";
import { useState } from "react";
import Link from "next/link";

export default function CategoryTable({ products }: { products: Product[] }) {
  const { categories } = categoryList;
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    // <div>
    <div className="mt-4 space-y-2">
      {categories.map((category, index) => {
        const isExpanded = expandedCategory === category.name;

        return (
          <div
            key={index}
            tabIndex={index}
            className={`collapse bg-base-100 border border-base-300 ${isExpanded ? "collapse-open" : "collapse-close"}`}
          >
            <div
              className="collapse-title flex items-center gap-2"
              role="button"
              tabIndex={0}
              onClick={() =>
                setExpandedCategory(isExpanded ? null : category.name)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setExpandedCategory(isExpanded ? null : category.name);
                }
              }}
            >
              {isExpanded ? (
                <Link
                  href={`/admin/categories/${encodeURIComponent(
                    category.name
                  )}`}
                  className="font-bold text-blue-600 hover:underline capitalize"
                  onClick={(event) => event.stopPropagation()}
                >
                  {category.name}
                </Link>
              ) : (
                <span className="font-bold capitalize">{category.name}</span>
              )}
              &middot;
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>

            <div className="collapse-content text-sm">
              <ul className={`${isExpanded ? "block" : "hidden"}`}>
                {products?.filter((prod) => prod.category === category.name)
                  .length > 0 ? (
                  products
                    ?.filter((product) => product.category === category.name)
                    .map((product, index) =>
                      index < 5 ? (
                        <li
                          key={product._id}
                          className="py-1 flex gap-2 items-center"
                        >
                          <p>{product.name}</p>
                          &middot;
                          <p>
                            {Number(product.price).toLocaleString("en-ZA", {
                              style: "currency",
                              currency: "ZAR"
                            })}
                          </p>
                        </li>
                      ) : null
                    )
                ) : (
                  <li className="py-1 text-gray-400">
                    No products in this category.
                  </li>
                )}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
    // </div>
  );
}
