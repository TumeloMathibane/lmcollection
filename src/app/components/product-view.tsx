"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../../stores/cart";
import type { Product } from "../(overview)/collection/products/types";
import SizeInput from "./ui/products/size-input";
import type { CartItem } from "../../stores/types";
import OptionInput from "./ui/products/option-input";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loading from "@/(overview)/collection/products/[productId]/loading";
import useFavoritesStore from "../../stores/favorites";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import ImageCarousel from "./image-carousel";

export default function ProductView({
  productId,
}: {
  productId: Id<"product">;
}) {
  const { addItem } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const product: Product | null | undefined = useQuery(
    api.products.getProduct,
    {
      id: productId,
    },
  );

  const additional_options: { [key: string]: string }[] | undefined =
    product?.additional_options;
  const [cartItem, setCartItem] = useState<CartItem>({
    productId: "",
    productName: "",
    productPrice: 0,
    productQty: 1,
    productCategory: "",
    productImage: "",
    options: {},
  });

  //! TODO: implement a component for notifying customer that item is added successfully
  const [cartRes, setCartRes] = useState<{
    success: boolean;
    action: "added" | "updated";
    newQty?: number;
  } | null>(null);

  const handleAddToCart = () => {
    const result = addItem(cartItem);
    if (!result.success) {
      throw new Error("Failed to add item.");
    }
    setCartRes(result);
    setTimeout(() => {
      setCartRes(null);
    }, 7000);

    setCartItem({
      productId: product?._id ?? "",
      productName: product?.name ?? "",
      productPrice: product?.price ?? 0,
      productQty: 1,
      productCategory: product?.category ?? "",
      productImage: product?.images[0] ?? "",
      options: Object.fromEntries(
        additional_options
          ?.filter(
            (opt) =>
              opt?.type === "options" ||
              opt?.type === "colors" ||
              opt?.type === "sizes",
          )
          ?.map((opt) => [opt?.label, opt?.value?.split(",")[0]]) ?? [],
      ),
    });
  };

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(
    () =>
      setCartItem({
        productId: product?._id ?? "",
        productName: product?.name ?? "",
        productPrice: product?.price ?? 0,
        productQty: 1,
        productCategory: product?.category ?? "",
        productImage: product?.images[0] ?? "",
        options: Object.fromEntries(
          additional_options
            ?.filter(
              (opt) =>
                opt?.type === "options" ||
                opt?.type === "colors" ||
                opt?.type === "sizes",
            )
            ?.map((opt) => [opt?.label, opt?.value?.split(",")[0]]) ?? [],
        ),
      }),
    [product, additional_options],
  );

  if (product === undefined) {
    return <Loading />;
  }

  return (
    <>
      <div className="space-y-4 md:flex md:space-x-10 xl:space-x-6">
        <section className="w-full space-y-2 md:w-1/2">
          <div className="space-y-4 md:sticky md:top-10">
            <div className="w-full h-90 overflow-hidden rounded-2xl flex justify-items-center-safe relative md:shadow-lg">
              <span
                className={`absolute top-2 left-2 text-sm flex items-center-safe rounded-full border px-4 z-5 ${product?.quantity && product?.quantity > 0 ? "border-green-700 bg-green-100/50 text-green-900" : "border-red-700 bg-red-100 text-red-800"}`}>
                {product?.quantity && product?.quantity > 0 ?
                  "In Stock"
                : "Out of Stock"}
              </span>

              <div className="w-full h-full">
                {/* Image carousel component */}
                <ImageCarousel
                  images={product?.images ?? []}
                  alt={product?.name ?? ""}
                />
              </div>
            </div>

            <div className="border border-stone-900 px-4 w-fit rounded-full text-xs">
              <p className="capitalize">{product?.category}</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 md:flex md:flex-col md:w-1/2 md:space-y-2">
          <div className="space-y-4 md:flex-1">
            <div>
              <p className="text-2xl text-stone-900 font-bold md:text-3xl">
                {product?.name}
              </p>
              <p className="text-sm text-stone-500">{product?.brand}</p>
            </div>

            <div className="stock-status-price flex text-lg font-light justify-between">
              <p>
                {new Intl.NumberFormat("en-ZA", {
                  style: "currency",
                  currency: "ZAR",
                }).format(cartItem?.productPrice)}
              </p>
            </div>

            {/* component for dynamically changing prices */}
            {product?.dynamic_pricing && (
              <div className="w-full">
                <div>
                  <p className="font-bold text-lg">
                    {product?.pricing_by as string}
                  </p>

                  {/* dynamic options of type sizes */}
                  {additional_options?.find(
                    (opt) => opt?.label === product?.pricing_by,
                  )?.type === "sizes" && (
                    <SizeInput
                      size={
                        cartItem.options?.[
                          product?.pricing_by as string
                        ] as string
                      }
                      availableSizes={
                        additional_options
                          ?.find((opt) => opt?.label === product?.pricing_by)
                          ?.value.split(",") as string[]
                      }
                      onSizeChange={(size) =>
                        setCartItem((prev) => ({
                          ...prev,
                          options: {
                            ...prev.options,
                            [product?.pricing_by as string]: size,
                          },
                          productPrice: Number(size.split("=")[1]),
                        }))
                      }
                      unit={
                        additional_options?.find(
                          (opt) => opt.label === product?.pricing_by,
                        )?.unit as string
                      }
                    />
                  )}

                  {/* dynamic options of type colors */}
                  {additional_options?.find(
                    (opt) => opt?.label === product?.pricing_by,
                  )?.type === "colors" && (
                    <div className="w-full flex flex-wrap items-center-safe gap-3">
                      {additional_options
                        ?.find((opt) => opt.label === product?.pricing_by)
                        ?.value.split(",")
                        ?.map((color, index) => (
                          <div
                            key={index}
                            className={`rounded-full w-14 h-14 flex items-center-safe ${Object.values(cartItem).includes(color.trim()) ? "p-1 border-3 bg-transparent" : ""}`}
                            onClick={() =>
                              setCartItem((prev) => ({
                                ...prev,
                                options: {
                                  ...prev.options,
                                  [additional_options?.find(
                                    (opt) => opt.label === product?.pricing_by,
                                  )?.label as string]: color.trim(),
                                },
                              }))
                            }>
                            <span
                              style={{ backgroundColor: color.trim() }}
                              className="w-full h-full rounded-full"
                            />
                          </div>
                        ))}
                    </div>
                  )}

                  {/* dynamic options of type options */}
                  {additional_options?.find(
                    (opt) => opt?.label === product?.pricing_by,
                  )?.type === "options" && (
                    <OptionInput
                      opt={cartItem.options?.[product?.pricing_by] as string}
                      options={
                        additional_options
                          ?.find((opt) => opt?.label === product?.pricing_by)
                          ?.value.split(",")
                          .map((opt) => opt.trim()) as string[]
                      }
                      unit={
                        additional_options?.find(
                          (opt) => opt.label === product?.pricing_by,
                        )?.unit as string
                      }
                      onOptionChange={(option) =>
                        setCartItem((prev) => ({
                          ...prev,
                          options: {
                            ...prev.options,
                            [additional_options?.find(
                              (opt) => opt.label === product?.pricing_by,
                            )?.label as string]: option,
                          },
                          productPrice: Number(option.split("=")[1].trim()),
                        }))
                      }
                    />
                  )}
                </div>
              </div>
            )}

            {/* ...follows the additional info. with type of color */}
            {additional_options?.find((opt) => opt.type === "colors") &&
              product?.pricing_by !==
                additional_options?.find((opt) => opt.type === "colors")
                  ?.label && (
                <div className="w-full">
                  <div>
                    <p className="font-bold text-lg">
                      {
                        additional_options?.find((opt) => opt.type === "colors")
                          ?.label
                      }
                    </p>

                    <div className="w-full flex flex-wrap items-center-safe gap-3">
                      {additional_options
                        ?.find((opt) => opt.type === "colors")
                        ?.value.split(",")
                        ?.map((color, index) => (
                          <div
                            key={index}
                            className={`rounded-full w-14 h-14 flex items-center-safe ${Object.values(cartItem.options).includes(color.trim()) ? "p-1 border-3 bg-transparent" : ""}`}
                            onClick={() =>
                              setCartItem((prev) => ({
                                ...prev,
                                options: {
                                  ...prev.options,
                                  [additional_options?.find(
                                    (opt) => opt.type === "colors",
                                  )?.label as string]: color.trim(),
                                },
                              }))
                            }>
                            <span
                              style={{ backgroundColor: color.trim() }}
                              className="w-full h-full rounded-full"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

            {/* ...follows the additional info. with type of size */}
            {additional_options?.find((opt) => opt.type === "sizes") &&
              product?.pricing_by !==
                additional_options?.find((opt) => opt.type === "sizes")
                  ?.label && (
                <div className="w-full">
                  <div>
                    <p className="font-bold text-lg">
                      {
                        additional_options?.find((opt) => opt.type === "sizes")
                          ?.label
                      }
                    </p>

                    <SizeInput
                      size={
                        cartItem.options?.[
                          additional_options?.find(
                            (opt) => opt.type === "sizes",
                          )?.label as string
                        ] as string
                      }
                      availableSizes={
                        additional_options
                          ?.find((opt) => opt.type === "sizes")
                          ?.value.split(",")
                          .map((opt) => opt.trim()) as string[]
                      }
                      onSizeChange={(value) =>
                        setCartItem((prev) => ({
                          ...prev,
                          options: {
                            ...prev.options,
                            [additional_options?.find(
                              (opt) => opt.type === "sizes",
                            )?.label as string]: value.trim(),
                          },
                        }))
                      }
                      unit={
                        additional_options?.find((opt) => opt.type === "sizes")
                          ?.unit as string
                      }
                    />
                  </div>
                </div>
              )}

            {/* ...follows the options */}
            {additional_options &&
              additional_options?.filter((opt) => opt.type === "options")
                .length > 0 &&
              additional_options
                ?.filter(
                  (opt) =>
                    opt.type === "options" && product?.pricing_by !== opt.label,
                )
                ?.map((opt, index) => (
                  <div key={index} className="w-full">
                    <p className="font-bold text-lg">{opt.label}</p>

                    <OptionInput
                      opt={cartItem.options?.[opt.label as string] as string}
                      options={
                        opt.value
                          .split(",")
                          .map((opt) => opt.trim()) as string[]
                      }
                      onOptionChange={(value) =>
                        setCartItem((prev) => ({
                          ...prev,
                          options: {
                            ...prev.options,
                            [opt.label as string]: value.trim(),
                          },
                        }))
                      }
                    />
                  </div>
                ))}

            {/* ...then, quantity selection comes last as an option */}
            {/* <div className="w-full">
              <div className="w-4/9">
                <p className="font-bold text-lg">Quantity</p>

                <QuantityInput
                  quantity={cartItem?.productQty}
                  onChange={(value) =>
                    setCartItem((prev) => ({
                      ...prev,
                      productQty:
                        product?.quantity && Number(value) > product?.quantity ?
                          1
                        : Number(value),
                    }))
                  }
                  onIncrement={() =>
                    setCartItem((prev) => ({
                      ...prev,
                      productQty: prev.productQty + 1,
                    }))
                  }
                  onDecrement={() =>
                    setCartItem((prev) => ({
                      ...prev,
                      productQty: prev.productQty - 1,
                    }))
                  }
                  incrementDisable={cartItem.productQty === product?.quantity}
                />
              </div>
            </div> */}

            <div className="flex flex-col justify-between space-y-4 w-full">
              {product?.shortDescription && (
                <div className="space-y-2 md:w-fit pb-5">
                  <p className="border-b border-stone-900 pb-2 text-lg font-bold">
                    Description
                  </p>
                  <p className="text-justify">{product?.shortDescription}</p>
                </div>
              )}
            </div>
          </div>

          {product && product?.quantity > 0 && (
            <div className="flex items-center-safe space-x-3 md:w-full md:place-self-end-safe pe-1">
              <button
                className={`py-2 bg-stone-900 text-stone-200 rounded-full w-full hover:cursor-pointer relative overflow-hidden`}
                onClick={() => handleAddToCart()}>
                Add to cart
              </button>

              {isFavorite(productId) ?
                <BsSuitHeartFill
                  size={"2rem"}
                  className="text-red-600"
                  onClick={() => toggleFavorite(productId)}
                />
              : <BsSuitHeart
                  size={"2rem"}
                  className="text-gray-400"
                  onClick={() => toggleFavorite(productId)}
                />
              }
            </div>
          )}
        </section>
      </div>

      {cartRes && (
        <div className="w-full h-14 fixed bottom-0 left-0 right-0 z-5 p-2">
          <div
            className={`w-full h-full flex items-center-safe justify-center text-stone-200 font-bold ${cartRes.success ? "bg-green-500" : "bg-red-500"}`}>
            {cartRes.action === "added" ?
              "Item added to cart successfully!"
            : `Cart updated successfully! New quantity: ${cartRes.newQty}`}
          </div>
        </div>
      )}
    </>
  );
}
