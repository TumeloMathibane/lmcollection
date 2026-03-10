"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ImageSelector from "./previewImages";
import AdditionalInfo from "./additionalInfo";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { categories } from "@/lib/categories.json";
import { BiCheckCircle, BiEdit, BiTrash, BiX } from "react-icons/bi";
import { ConvexError } from "convex/values";

export interface AdditionalInfoField {
  label: string;
  type: string;
  value: string;
  unit: string;
}
interface ProductFormData {
  brand: string;
  product_name: string;
  price: number;
  product_desc: string;
  category: string;
  discount?: number;
  quantity: number;
  images: File[];
  additional_options: AdditionalInfoField[];
  dynamic_pricing: boolean;
  pricing_by: string;
}

export default function AddProductForm() {
  const [prodFormData, setProdFormData] = useState<ProductFormData>({
    brand: "",
    product_name: "",
    price: 0,
    product_desc: "",
    category: "",
    discount: 0,
    quantity: 1,
    images: [],
    additional_options: [],
    dynamic_pricing: false,
    pricing_by: "",
  });

  const [field, setField] = useState<AdditionalInfoField>({
    label: "",
    type: "",
    value: "",
    unit: "",
  });

  const [error, setError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const generateUploadURL = useMutation(api.products.generateUploadURL);

  const addProductMutation = useMutation(api.products.createProduct);

  const validateImageFile = (file: File) => {
    const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    return validImageTypes.includes(file.type);
  };

  const validateFormData = (formData: ProductFormData): string => {
    // Validates the formData object to check if all required inputs are filled in
    let errorString: string = "";

    Object.entries(formData).forEach(([key, val]) => {
      if (
        (key === "product_name" ||
          key === "images" ||
          key === "quantity" ||
          key === "category") &&
        (val === "" || val?.length === 0 || val === undefined || val === 0)
      ) {
        errorString += `${key}, `;
      }

      if (
        key === "price" &&
        formData.dynamic_pricing === false &&
        (val === undefined || Number(val) <= 0)
      ) {
        errorString += `${key}, `;
      }
    });

    if (errorString.length > 0) {
      return errorString.slice(0, -2); // Remove the trailing comma and space
    }

    return errorString;
  };

  const validateDynPricing = (formData: ProductFormData) => {
    if (formData.pricing_by === "" || formData.pricing_by === undefined) {
      setError(`Please select a field for variable pricing.`);

      setTimeout(() => {
        setError("");
      }, 8000);

      return false;
    }

    const field = formData.additional_options.find(
      (info) => info.label === formData.pricing_by,
    );

    if (field) {
      const variations = field.value.split(",");

      for (const variation of variations) {
        const parts = variation.split("=");

        if (parts.length !== 2 || isNaN(Number(parts[1]))) {
          setError(
            `Please ensure that the price variations for "${prodFormData.pricing_by}" are correctly formatted as "option=price"; where option can be text or number/s, and price is a positive number; separated by commas.`,
          );

          setTimeout(() => {
            setError("");
          }, 12000);

          return false;
        }
      }
    }

    return true;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const target = e.target as HTMLElement;

    const { name, checked, value } = target as HTMLInputElement;

    setProdFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "discount" || name === "quantity" ?
          (value ?? undefined)
        : name === "dynamic_pricing" ? checked
        : value,
    }));
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //! validate required text fields
    if (validateFormData(prodFormData) !== "") {
      setError(
        `Please fill in the required fields: ${validateFormData(prodFormData)}.`,
      );

      setTimeout(() => {
        setError("");
      }, 8000);

      return;
    }

    //! validate image files
    for (const file of prodFormData.images) {
      if (!validateImageFile(file)) {
        setError(
          `Invalid image file type: ${file.name}. Please upload JPEG, JPG, PNG, GIF, or WEBP images only.`,
        );
        setTimeout(() => {
          setError("");
        }, 8000);

        return;
      }
    }

    //! validate if field select to change prices has valid prices
    if (prodFormData.dynamic_pricing) {
      if (!validateDynPricing(prodFormData)) {
        return;
      }
    }

    // Prepare additional options for submission
    const additional_options = prodFormData.additional_options.map((info) => ({
      label: info.label,
      type: info.type,
      value: info.value,
      unit: info.unit,
    }));

    // Call the mutation to add the product
    try {
      // Generate upload URLs for each image
      const uploadUrls = await Promise.all(
        prodFormData.images.map(async () => await generateUploadURL()),
      );

      const imageUploadIds = await Promise.all(
        prodFormData.images.map(async (file, index) => {
          const response = await fetch(uploadUrls[index], {
            method: "POST",
            headers: {
              "Content-Type": file!.type,
            },
            body: file,
          });

          return (await response.json()).storageId;
        }),
      );

      const productId = await addProductMutation({
        brand: prodFormData.brand,
        name: prodFormData.product_name,
        price:
          prodFormData.dynamic_pricing ?
            (Number(
              additional_options
                .find((info) => info.label === prodFormData.pricing_by)
                ?.value?.split(",")[0]
                .split("=")[1],
            ) ?? 0)
          : Number(prodFormData.price ?? 0),
        discount: Number(prodFormData.discount),
        shortDescription: prodFormData.product_desc,
        quantity: Number(prodFormData.quantity) ?? 1,
        category: prodFormData.category,
        images: imageUploadIds,
        additional_options: additional_options,
        dynamic_pricing: prodFormData.dynamic_pricing,
        pricing_by: prodFormData.pricing_by,
      });

      if (productId) {
        // Reset form after submission
        setProdFormData({
          brand: "",
          product_name: "",
          price: 0,
          product_desc: "",
          category: "",
          discount: 0,
          quantity: 1,
          images: [],
          additional_options: [],
          dynamic_pricing: false,
          pricing_by: "",
        });

        setSuccessMsg("Product added successfully!");

        setTimeout(() => {
          setSuccessMsg("");
        }, 5000);
      }
    } catch (error) {
      const message =
        error instanceof ConvexError ?
          (error.data as { message: string }).message
        : "Server error: Error adding product. Please try again.";

      setError(message);

      setTimeout(() => {
        setError("");
      }, 15000);

      return;
    }
  };

  const handleFieldInfoChange = (field: AdditionalInfoField) => {
    setField(field);
  };

  const handleAddField = () => {
    Object.entries(field).forEach(([key, val]) => {
      if (key !== "unit" && (val === "" || val === undefined)) {
        setError(`Please fill in all the field information before adding.`);

        setTimeout(() => {
          setError("");
        }, 8000);

        throw new Error("Incomplete field information.");
      }
    });

    setProdFormData((prev) => ({
      ...prev,
      additional_options: [
        ...prev.additional_options.filter(
          (info) => info.label !== field.label || info.type !== field.type,
        ),
        field,
      ],
    }));

    setField({
      label: "",
      type: "",
      value: "",
      unit: "",
    });
  };

  const handleRemoveField = (field: AdditionalInfoField) => {
    setProdFormData((prev) => ({
      ...prev,
      additional_options: prev.additional_options.filter(
        (info) => info.label !== field.label || info.type !== field.type,
      ),
    }));
  };

  const fieldForPriceVar = () => {
    return prodFormData.additional_options.filter(
      (option) =>
        option?.type === "colors" ||
        option?.type === "sizes" ||
        option?.type === "options",
    );
  };

  useEffect(() => {
    if (prodFormData.additional_options.length === 0) {
      setProdFormData((prev) => ({
        ...prev,
        dynamic_pricing: false,
        pricing_by: "",
      }));
    }
  }, [prodFormData.additional_options.length]);

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      {error && (
        <div className="fixed top-0 left-0 right-0 z-5">
          <div className="ring ring-red-300 text-red-500 bg-red-100 rounded m-5 p-2 relative">
            <BiX
              size={"1.5rem"}
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => setError("")}
            />
            <p className="pe-4">{error}</p>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="fixed top-0 left-0 right-0 m-0 z-5 flex justify-center-safe">
          <div className="ring ring-green-300 text-green-500 bg-green-100 rounded m-5 p-2 relative w-[75%]">
            <BiCheckCircle
              size={"1.5rem"}
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => setSuccessMsg("")}
            />
            <p className="pe-4">{successMsg}</p>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="product_name">Product Name:</label>
        <input
          type="text"
          name="product_name"
          id="product_name"
          className="border border-stone-300 focus:focus-within:ring focus:focus-within:ring-blue-500 focus:focus-within:outline-0 focus:focus-wthin:rounded-none p-1.5 w-full"
          placeholder="e.g. iPhone 14 Pro"
          value={prodFormData.product_name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="brand">Product Brand:</label>
        <input
          type="text"
          name="brand"
          id="brand"
          className="border border-stone-300 focus:focus-within:ring focus:focus-within:ring-blue-500 focus:focus-within:outline-0 focus:focus-wthin:rounded-none p-1.5 w-full"
          placeholder="e.g. Apple"
          value={prodFormData.brand}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="quantity">Quantity:</label>

        <input
          type="number"
          min={1}
          name="quantity"
          id="quantity"
          className="border border-stone-300 focus:focus-within:ring focus:focus-within:ring-blue-500 focus:focus-within:outline-0 focus:focus-wthin:rounded-none p-1.5 w-full"
          placeholder="e.g. 100"
          value={prodFormData.quantity}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="product_desc">Description:</label>
        <textarea
          name="product_desc"
          id="product_desc"
          className="border border-stone-300 focus:focus-within:ring focus:focus-within:ring-blue-500 focus:focus-within:outline-0 focus:focus-wthin:rounded-none p-1.5 w-full"
          placeholder="Enter product description"
          value={prodFormData.product_desc}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="category">Category:</label>

        <input
          name="category"
          id="category"
          list="categories"
          className="border border-stone-300 focus:focus-within:ring focus:focus-within:ring-blue-500 focus:focus-within:outline-0 focus:focus-wthin:rounded-none p-1.5 w-full"
          placeholder="e.g. Smartphones"
          value={prodFormData.category}
          onChange={handleInputChange}
        />
        <datalist id="categories">
          {categories?.map((category, index) => (
            <option key={index} value={category?.name} />
          ))}
        </datalist>
      </div>

      <div>
        <p>Images:</p>

        <ImageSelector
          images={prodFormData.images}
          onImagesChange={(imgs) => {
            setProdFormData((prev) => ({
              ...prev,
              images: [...imgs],
            }));
          }}
        />
      </div>

      {/* Additional information... */}
      {prodFormData.additional_options.length > 0 && (
        <div>
          <label className="font-bold">Additional Information:</label>

          <div className="mt-2 p-3 space-y-4 border border-gray-300 rounded-md bg-gray-50">
            {prodFormData.additional_options.map((info, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 group">
                  <label className="underline decoration-1 underline-offset-2">
                    {info.label}
                  </label>

                  <span onClick={() => setField(info)}>
                    <BiEdit size={"1.3rem"} className="text-neutral-800" />
                  </span>

                  <span onClick={() => handleRemoveField(info)}>
                    <BiTrash size={"1.3rem"} className="text-red-700" />
                  </span>
                </div>

                <div className="mt-1">
                  {info.type === "text" && (
                    <p>{(info.value as string).trim()}</p>
                  )}

                  {info.type === "colors" && (
                    <div className="flex flex-wrap gap-3 mt-1">
                      {info.value.split(",").map((color, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center-safe">
                          <div
                            className="w-10 h-10 rounded-sm"
                            style={{ backgroundColor: color }}
                          />
                          <p className="w-full perspective-origin-center">
                            {color}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {(info.type === "options" || info.type === "sizes") && (
                    <div>
                      <p>{info.value?.split(",")?.join(", ")}</p>
                    </div>
                  )}

                  {info.type === "bulletpoints" && (
                    <ul className="list-disc list-inside">
                      {info.value.split(",").map((point, idx) => (
                        <li key={idx}>{point.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional info. input component */}
      <AdditionalInfo
        info={field}
        onFieldInfoChange={(field) => handleFieldInfoChange(field)}
        onAddField={() => handleAddField()}
        disableSelectables={
          (
            prodFormData.additional_options.find(
              (opt) =>
                opt?.type === "options" ||
                opt?.type === "sizes" ||
                opt?.type === "colors",
            )
          ) ?
            true
          : false
        }
        disabled={prodFormData.images.length === 0}
      />

      <div className="space-y-2">
        <div className="flex gap-3 group">
          <input
            type="checkbox"
            id="dynamicPricing"
            name="dynamic_pricing"
            className="checkbox checkbox-md checkbox-neutral peer"
            checked={prodFormData.dynamic_pricing}
            onChange={handleInputChange}
            disabled={
              (
                prodFormData.additional_options.find(
                  (opt) =>
                    opt?.type === "options" ||
                    opt?.type === "sizes" ||
                    opt?.type === "colors",
                )
              ) ?
                false
              : true
            }
          />

          <label
            htmlFor="dynamicPricing"
            className="hover:underline underline-offset-3 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
            Variable Price
          </label>
        </div>

        {prodFormData.dynamic_pricing && (
          <div className="flex gap-3 items-center-safe">
            <p className="w-fit text-nowrap">Price varied by: </p>

            <select
              className="select select-md ps-3 w-full focus:outline-0 focus-within:outline-0 border border-stone-300"
              onChange={handleInputChange}
              value={prodFormData.pricing_by}
              name="pricing_by"
              id="pricing_by">
              <option value="">Select option</option>
              {fieldForPriceVar().map((field, index) => (
                <option key={index} value={field.label}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {!prodFormData.dynamic_pricing && (
        <div className="flex gap-3">
          <div className="w-full">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              title="Enter a valid price with up to 2 decimal places (e.g., 123 or 123.45)"
              name="price"
              id="price"
              className="border border-stone-300 focus:focus-within:ring focus:focus-within:ring-blue-500 focus:focus-within:outline-0 focus:focus-wthin:rounded-none p-1.5 w-full"
              placeholder="e.g. 123 or 123.45"
              value={prodFormData.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full">
            <label htmlFor="discount" className="truncate">
              Discount (%):
            </label>
            <input
              type="number"
              title="Enter a number or decimal with up to 2 decimal places (e.g., 10 or 12.34)"
              name="discount"
              id="discount"
              className="border border-stone-300 focus:focus-within:ring focus:focus-within:ring-blue-500 focus:focus-within:outline-0 focus:focus-wthin:rounded-none p-1.5 w-full"
              placeholder="e.g. 10 or 12.34"
              value={prodFormData.discount}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

      <div className="flex gap-3 items-center">
        <button type="submit" className="btn btn-success">
          Add Product
        </button>

        <button
          type="button"
          className="w-fit p-3 text-red-700 font-semibold"
          onClick={() => {
            setProdFormData({
              brand: "",
              product_name: "",
              price: 0,
              product_desc: "",
              category: "",
              discount: 0,
              quantity: 1,
              images: [],
              additional_options: [],
              dynamic_pricing: false,
              pricing_by: "",
            });

            setField({
              label: "",
              type: "",
              value: "",
              unit: "",
            });
          }}>
          Clear form
        </button>
      </div>
    </form>
  );
}
