"use client";

import type { Product } from "@/(overview)/collection/products/types";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { dynamicPricedItem } from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import ImageWithFallback from "@/components/image-with-fallback";
import { Id } from "@/convex/_generated/dataModel";

export default function ProductTable({
  searchParams,
  viewing,
}: {
  searchParams?: { view?: string; edit?: string };
  viewing?: boolean;
}) {
  const products: Product[] | undefined = useQuery(
    api.products.getProducts,
    {},
  );

  const pathname = usePathname();
  const router = useRouter();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const updateProd = useMutation(api.products.updateProduct);
  const deleteProd = useMutation(api.products.deleteProduct);

  const handleProductDelete = async (id: string) => {
    try {
      await deleteProd({ id: id as Id<"product"> });
      setProduct(undefined);
      setWidgetOpen(false);
      router.push(pathname);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdatedProduct = async (id: Id<"product">) => {
    try {
      await updateProd({
        id: id,
        brand: product?.brand,
        name: product?.name,
        price:
          product?.dynamic_pricing ?
            dynamicPricedItem(product)?.prices?.[0]
          : product?.price,
        discount: product?.discount,
        shortDescription: product?.shortDescription,
        availability: product?.availability,
        category: product?.category,
        additional_options: product?.additional_options,
        dynamic_pricing: product?.dynamic_pricing,
        pricing_by: product?.pricing_by,
        sale: product?.sale,
      });

      setProduct(undefined);
      setWidgetOpen(false);
      router.push(pathname);
    } catch (err) {
      console.error("Server error: " + err);
    }
  };

  useEffect(() => {
    const viewId = searchParams?.edit ?? searchParams?.view;

    if (viewId) {
      const foundProduct = products?.find((p) => p._id === viewId);

      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setProduct(undefined);
        setWidgetOpen(false);
        router.push(pathname);
      }
    }
  }, [searchParams, products, router, pathname, viewing]);

  return (
    <>
      <aside
        className={`fixed top-0 right-0 bottom-0 left-0 w-full min-h-dvh flex items-end-safe transition-all ${widgetOpen ? "z-50 backdrop-blur-sm" : "-z-1 backdrop-blur-none"} lg:items-center-safe lg:justify-center-safe`}>
        <div
          className={`w-full max-h-[95%] flex flex-col p-4 pb-6 rounded-t-2xl bg-stone-200 border-t border-stone-300 space-y-2 transition ${widgetOpen ? "z-48 translate-0" : "translate-y-full"} lg:max-w-[900px] lg:rounded-2xl lg:border 2xl:max-w-[700px]`}>
          <div className="flex items-center-safe justify-between border-b border-stone-400 pb-2">
            <p className="text-xl font-extrabold text-shadow-stone-700">
              {viewing ? "Viewing Product Details" : "Editing Product Details"}
            </p>

            <BiX
              size={"2rem"}
              onClick={() => {
                setWidgetOpen(false);
                setProduct(undefined);
                router.push(pathname);
              }}
            />
          </div>

          {product === undefined ?
            <span className="loading loading-bars w-20 h-20 flex place-self-center-safe" />
          : <div className="flex-1 max-h-[70vh] overflow-y-auto space-y-2 mx-auto sm:flex sm:space-x-4 sm:space-y-0 md:max-w-3xl lg:max-w-4xl">
              <div className="w-full max-w-100 h-80 object-cover object-center place-self-center lg:place-self-auto lg:sticky lg:top-0 xl:h-60 xl:w-100">
                <ImageWithFallback
                  src={product?.images[0] ?? ""}
                  alt={product?.name ?? ""}
                />
              </div>

              <div className="flex flex-col space-y-4">
                <div className="space-y-2 flex-1">
                  <div>
                    <p className="font-bold">Category</p>
                    <input
                      type="text"
                      className={`border-b border-stone-300 bg-transparent focus:focus-within:outline-0 focus:focus-within:ring-0 w-full p-1 ${viewing ? "bg-stone-300 text-stone-700 capitalize" : "focus:focus-within:bg-white"}`}
                      defaultValue={product?.category}
                      disabled={viewing}
                      onChange={(e) =>
                        setProduct(
                          (prev) =>
                            prev && {
                              ...prev,
                              category: e.target.value,
                            },
                        )
                      }
                    />
                  </div>

                  <div>
                    <p className="font-bold">Product Name</p>
                    <input
                      type="text"
                      className={`border-b border-stone-300 bg-transparent focus:focus-within:outline-0 focus:focus-within:ring-0 w-full p-1 ${viewing ? "bg-stone-300 text-stone-700 capitalize" : "focus:focus-within:bg-white"}`}
                      defaultValue={product?.name}
                      disabled={viewing}
                      onChange={(e) =>
                        setProduct(
                          (prev) =>
                            prev && {
                              ...prev,
                              name: e.target.value,
                            },
                        )
                      }
                    />
                  </div>

                  <div>
                    <p className="font-bold">Brand</p>
                    <input
                      type="text"
                      className={`border-b border-stone-300 bg-transparent focus:focus-within:outline-0 focus:focus-within:ring-0 w-full p-1 ${viewing ? "bg-stone-300 text-stone-700 capitalize" : "focus:focus-within:bg-white"}`}
                      defaultValue={product?.brand}
                      disabled={viewing}
                      onChange={(e) =>
                        setProduct(
                          (prev) =>
                            prev && {
                              ...prev,
                              brand: e.target.value,
                            },
                        )
                      }
                    />
                  </div>

                  <div className="space-x-4 flex">
                    <div className="w-full">
                      <p className="font-bold">Price</p>

                      <input
                        type="text"
                        className={`border-b border-stone-300 bg-transparent focus:focus-within:outline-0 focus:focus-within:ring-0 w-full p-1 ${viewing ? "bg-stone-300 text-stone-700 capitalize" : "focus:focus-within:bg-white"}`}
                        defaultValue={
                          product?.dynamic_pricing ?
                            `R ${Math.min(dynamicPricedItem(product)?.prices?.at(0) ?? 0)} - ${Math.max(dynamicPricedItem(product)?.prices?.at(-1) ?? 0)}`
                          : product?.price
                        }
                        disabled={viewing || product?.dynamic_pricing}
                        onChange={(e) =>
                          setProduct(
                            (prev) =>
                              prev && {
                                ...prev,
                                price: e.target.valueAsNumber,
                              },
                          )
                        }
                      />
                    </div>

                    <div>
                      <p className="font-bold">Discount</p>
                      <input
                        type={viewing ? "text" : "number"}
                        className={`quantity-input border-b border-stone-300 bg-transparent focus:focus-within:outline-0 focus:focus-within:ring-0 w-full p-1 ${viewing ? "bg-stone-300 text-stone-700" : "focus:focus-within:bg-white"}`}
                        defaultValue={
                          viewing ?
                            new Intl.NumberFormat("en-ZA", {
                              style: "percent",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }).format(product?.discount ?? 0)
                          : 0
                        }
                        disabled={viewing}
                        onChange={(e) =>
                          setProduct(
                            (prev) =>
                              prev && {
                                ...prev,
                                discount: e.target.valueAsNumber,
                              },
                          )
                        }
                      />
                    </div>

                    {/* //! FIXME: fix y-axis alignment of the select element */}
                    <div className="w-full">
                      <p className="font-bold">Availability</p>

                      <select
                        defaultValue={product?.availability}
                        disabled={viewing}
                        onChange={(e) =>
                          setProduct(
                            (prev) =>
                              prev && {
                                ...prev,
                                availability: e.target.value as
                                  | "in-stock"
                                  | "out-of-stock",
                              },
                          )
                        }
                        className="quantity-input border-b border-stone-300 bg-transparent focus:focus-within:outline-0 focus:focus-within:ring-0 w-full p-1">
                        <option value="">Select option</option>
                        <option value="in-stock">In Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  {product?.shortDescription && (
                    <div>
                      <p className="font-bold">Description</p>
                      <textarea
                        className={`border border-stone-300 bg-white focus:focus-within:outline-0 focus:focus-within:ring-0 w-full p-1 ${viewing ? "bg-stone-300 text-stone-700" : "focus:focus-within:bg-white"}`}
                        defaultValue={product.shortDescription}
                        disabled={viewing}
                        onChange={(e) =>
                          setProduct(
                            (prev) =>
                              prev && {
                                ...prev,
                                shortDescription: e.target.value,
                              },
                          )
                        }
                      />
                    </div>
                  )}

                  {product?.additional_options && (
                    <div>
                      <p className="font-bold">Additional options</p>

                      <div className="border border-dashed border-stone-400">
                        {product.additional_options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-1">
                            <input
                              type="text"
                              className={`border-b border-stone-300 bg-transparent focus:focus-within:outline-0 focus:focus-within:ring-0 w-1/2 text-wrap pb-1 ${viewing ? "bg-stone-300 text-stone-700 capitalize" : "focus:focus-within:bg-white"}`}
                              defaultValue={option.label}
                              disabled={viewing}
                              onChange={(e) => {
                                const newLabel = e.target.value;

                                setProduct((prev) => {
                                  if (!prev) return prev;

                                  const updatedOptions = [
                                    ...prev.additional_options,
                                  ];

                                  if (
                                    product?.pricing_by ===
                                    updatedOptions[index].label
                                  ) {
                                    updatedOptions[index] = {
                                      ...updatedOptions[index],
                                      label: newLabel,
                                    };

                                    return {
                                      ...prev,
                                      additional_options: updatedOptions,
                                      pricing_by: newLabel,
                                    };
                                  }

                                  updatedOptions[index] = {
                                    ...updatedOptions[index],
                                    label: newLabel,
                                  };

                                  return {
                                    ...prev,
                                    additional_options: updatedOptions,
                                  };
                                });
                              }}
                            />

                            {viewing ?
                              <div className="w-1/2">
                                <p>{option.value.split(",").join(", ")}</p>
                              </div>
                            : <textarea
                                className={`border border-stone-300 bg-white focus:focus-within:outline-0 focus:focus-within:ring-0 w-1/2 h-fit p-1 text-stone-700`}
                                defaultValue={option.value
                                  .split(",")
                                  .join(", ")}
                                disabled={viewing}
                                onChange={(e) => {
                                  const newValue = e.target.value.split(",");

                                  setProduct((prev) => {
                                    if (!prev) return prev;

                                    const updatedOptions = [
                                      ...prev.additional_options,
                                    ];
                                    updatedOptions[index] = {
                                      ...updatedOptions[index],
                                      value: newValue
                                        .map((i) => (i as string).trim())
                                        .join(","),
                                    };

                                    return {
                                      ...prev,
                                      additional_options: updatedOptions,
                                    };
                                  });
                                }}
                              />
                            }
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          }

          <div className="flex border-t border-stone-400 pt-4 justify-end-safe gap-4">
            {!viewing && (
              <button
                type="button"
                className="btn btn-success w-min"
                onClick={() =>
                  handleUpdatedProduct(product?._id as Id<"product">)
                }>
                Submit
              </button>
            )}

            <button
              type="button"
              className="btn btn-error text-red-800 w-fit"
              onClick={() =>
                handleProductDelete(product?._id as Id<"product">)
              }>
              Delete product
            </button>
          </div>
        </div>
      </aside>

      <table className="divide-y divide-stone-200 w-full">
        <thead className="bg-stone-50 sticky top-0">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
              Name ({products?.length})
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
              Availability
            </th>
          </tr>
        </thead>

        {!products ?
          <tbody>
            <tr>
              <td className="text-center" colSpan={3}>
                <span className="loading loading-bars loading-xl my-10" />
              </td>
            </tr>
          </tbody>
        : <tbody className="bg-white divide-y divide-stone-200">
            {products?.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-stone-50 cursor-pointer"
                onClick={() => {
                  router.push(`?${viewing ? "view" : "edit"}=${product?._id}`);
                  setWidgetOpen(true);
                }}>
                <td className="px-6 py-4 text-sm text-stone-900">
                  {product.name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                  {product.dynamic_pricing ?
                    <>
                      <p>
                        {new Intl.NumberFormat("en-ZA", {
                          style: "currency",
                          currency: "ZAR",
                        }).format(
                          Math.min(
                            ...(dynamicPricedItem(product)?.prices ?? []),
                          ),
                        )}
                      </p>
                      {" - "}
                      <p>
                        {new Intl.NumberFormat("en-ZA", {
                          style: "currency",
                          currency: "ZAR",
                        }).format(
                          Math.max(
                            ...(dynamicPricedItem(product)?.prices ?? []),
                          ),
                        )}
                      </p>
                    </>
                  : new Intl.NumberFormat("en-ZA", {
                      style: "currency",
                      currency: "ZAR",
                    }).format(product.price)
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 capitalize">
                  {product.availability}
                </td>
              </tr>
            ))}
          </tbody>
        }
      </table>
    </>
  );
}
