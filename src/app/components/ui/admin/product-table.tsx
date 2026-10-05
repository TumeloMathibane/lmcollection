"use client";

import type { Product } from "@/(overview)/collection/products/types";
import Modal from "./product-modal";
import { useState } from "react";
import { dynamicPricedItem } from "@/utils/helper";

export default function Table({ data }: { data: Product[] }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickRow = (product: Product) => {
    // Handle row click event, e.g., navigate to product details page
    setProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      {product && isModalOpen && (
        <Modal
          product={product}
          isOpen={isModalOpen}
          onClose={(modalOpen) => setIsModalOpen(modalOpen)}
        />
      )}

      <table className="divide-y divide-stone-200 w-full">
        <thead className="bg-stone-50 sticky top-0">
          <tr className="border-b border-gray-200">
            <th
              scope="col"
              className="ps-3 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="py-3 text-xs font-medium text-stone-500 uppercase"
            >
              Price
            </th>
            <th
              scope="col"
              className="pe-3 py-3 text-xs font-medium text-stone-500 uppercase"
            >
              Availability
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {data.length > 0 ? (
            data.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-stone-50 cursor-pointer"
                onClick={() => onClickRow(product)}
              >
                <td className="ps-3 py-3 text-sm text-stone-900">
                  {product.name}
                </td>
                <td className="py-3 text-center text-sm text-stone-900 sm:flex sm:gap-2 sm:items-center sm:justify-center">
                  {product.dynamic_pricing ? (
                    <>
                      <p>
                        {new Intl.NumberFormat("en-ZA", {
                          style: "currency",
                          currency: "ZAR"
                        }).format(
                          Math.min(
                            ...(dynamicPricedItem(product)?.prices ?? [])
                          )
                        )}
                      </p>
                      {" - "}
                      <p>
                        {new Intl.NumberFormat("en-ZA", {
                          style: "currency",
                          currency: "ZAR"
                        }).format(
                          Math.max(
                            ...(dynamicPricedItem(product)?.prices ?? [])
                          )
                        )}
                      </p>
                    </>
                  ) : (
                    new Intl.NumberFormat("en-ZA", {
                      style: "currency",
                      currency: "ZAR"
                    }).format(product.price)
                  )}
                </td>
                <td className="pe-3 py-3 text-center text-sm text-stone-900 capitalize">
                  {product.availability}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
