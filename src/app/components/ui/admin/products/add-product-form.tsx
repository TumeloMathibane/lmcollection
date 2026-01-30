"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import ImageSelector from "./previewImages";
import AdditionalInfo from "./additionalInfo";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { categories } from "@/lib/categories.json";

export interface AdditionalInfoField {
  label: string;
  type: string;
  value: string | string[];
}
interface ProductFormData {
  brand: string;
  name: string;
  price: number;
  description: string;
  category: string;
  discount: number;
  quantity: number;
  images: File[];
  additionalInfo: AdditionalInfoField[];
}

export default function AddProductForm() {
  const [prodFormData, setProdFormData] = useState<ProductFormData>({
    brand: "",
    name: "",
    price: 0,
    description: "",
    category: "",
    discount: 0,
    quantity: 0,
    images: [],
    additionalInfo: [],
  });

  const [field, setField] = useState<AdditionalInfoField>({
    label: "",
    type: "",
    value: "",
  });

  const generateUploadURL = useMutation(api.products.generateUploadURL);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setProdFormData({
      ...prodFormData,
      [name]:
        name === "price" || name === "discount" || name === "quantity" ?
          Number(value)
        : value,
    });
  };

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

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !(
        prodFormData.name &&
        prodFormData.quantity &&
        prodFormData.price &&
        prodFormData.category &&
        prodFormData.images.length > 0
      )
    ) {
      throw new Error("Please fill in all required fields.");
    }
    console.log("Pre-submission form data:", prodFormData);

    // Prepare additional options for submission
    const additional_options = prodFormData.additionalInfo.map((info) => ({
      label: info.label,
      type: info.type,
      value: info.value,
    }));

    // validate image files
    for (const file of prodFormData.images) {
      if (!validateImageFile(file)) {
        throw new Error(
          `Invalid image file type: ${file.name}. Please upload JPEG, JPG, PNG, GIF, or WEBP images only.`,
        );
        return;
      }
    }

    // Generate upload URLs for each image
    const uploadUrls = await Promise.all(
      prodFormData.images.map(async () => await generateUploadURL()),
    );
    // console.log("Generated Upload URLs:", uploadUrls);

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

    console.log("Uploaded Image IDs:", imageUploadIds);

    // Call the mutation to add the product
    const productId = await addProductMutation({
      brand: prodFormData.brand, // Added brand field
      name: prodFormData.name,
      price: prodFormData.price,
      discount: prodFormData.discount,
      shortDescription: prodFormData.description,
      quantity: prodFormData.quantity,
      category: prodFormData.category,
      images: imageUploadIds,
      additional_options: additional_options,
    });

    if (productId) {
      console.log("Product added with ID:", productId);

      // Reset form after submission
      setProdFormData({
        brand: "",
        name: "",
        price: 0,
        description: "",
        category: "",
        discount: 0,
        quantity: 0,
        images: [],
        additionalInfo: [],
      });
    }
  };

  const handleFieldInfoChange = (field: AdditionalInfoField) => {
    setField(field);
  };

  const handleAddField = () => {
    if (
      field.label.trim() !== "" &&
      field.type !== "" &&
      ((typeof field.value === "string" && field.value.trim() !== "") ||
        (Array.isArray(field.value) && field.value.length > 0))
    ) {
      // console.log("Field added:", field);
      setProdFormData((prev) => ({
        ...prev,
        additionalInfo: [
          ...prev.additionalInfo,
          (
            field.type === "bulletpoints" ||
            field.type === "colors" ||
            field.type === "options"
          ) ?
            {
              label: field.label,
              type: field.type,
              value: field.value
                .toString()
                .split(",")
                .map((item) => item.trim()),
            }
          : field,
        ],
      }));

      // Reset field info
      setField({
        label: "",
        type: "",
        value: "",
      });
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          className="input input-md w-full"
          placeholder="e.g. iPhone 14 Pro"
          value={prodFormData.name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="brand">Product Brand:</label>
        <input
          type="text"
          name="brand"
          id="brand"
          className="input input-md w-full"
          placeholder="e.g. Apple"
          value={prodFormData.brand}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="quantity">Quantity:</label>

        <input
          type="number"
          name="quantity"
          id="quantity"
          className="input input-md w-full"
          placeholder="e.g. 100"
          value={prodFormData.quantity}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex gap-3">
        <div className="w-2/3">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            className="input input-md w-full"
            placeholder="e.g. 123 or 123.45"
            value={prodFormData.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-1/3">
          <label htmlFor="discount" className="truncate">
            Discount (%):
          </label>
          <input
            type="number"
            name="discount"
            id="discount"
            className="input input-md w-full"
            placeholder="e.g. 10 or 12.34"
            value={prodFormData.discount}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          className="textarea textarea-md w-full"
          placeholder="Enter product description"
          value={prodFormData.description}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="category">Category:</label>

        <input
          name="category"
          id="category"
          list="categories"
          className="input input-md w-full"
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
      {prodFormData.additionalInfo.length > 0 && (
        <div>
          <label className="font-bold">Additional Information:</label>

          <div className="mt-2 p-3 space-y-4 border border-gray-300 rounded-md bg-gray-50">
            {prodFormData.additionalInfo.map((info, index) => (
              // <div key={index}>
              //   <p className="underline decoration-2 underline-offset-2">
              //     {info.label}
              //   </p>

              //   {Array.isArray(info.value) &&
              //     (info.type === "colors" ?
              //       <div className="flex gap-3 mt-1">
              //         {info.value.map((color, idx) => (
              //           <div
              //             key={idx}
              //             className="w-10 h-10 rounded-sm"
              //             style={{ backgroundColor: color }}
              //           />
              //         ))}
              //       </div>
              //     : (info.type === "bulletpoints" ||
              //         info.type === "options") && (
              //         <div>
              //           <ul className="list-disc list-inside mt-1">
              //             {info.value.map((val, idx) => (
              //               <li key={idx}>{val}</li>
              //             ))}
              //           </ul>
              //         </div>
              //       ))}

              //   {info.type === "text" && (
              //     <div className="mt-1">
              //       <p>{info.value}</p>
              //     </div>
              //   )}
              // </div>

              <div key={index}>
                <label className="underline decoration-1 underline-offset-2">
                  {info.label}
                </label>

                <div className="mt-1">
                  {info.type === "text" && <p>{info.value}</p>}

                  {Array.isArray(info.value) &&
                    (info.type === "colors" ?
                      <div className="flex flex-wrap gap-3 mt-1">
                        {info.value.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-10 h-10 rounded-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    : (info.type === "bulletpoints" ||
                        info.type === "options") && (
                        <div>
                          <ul className="list-disc list-inside mt-1 ml-2">
                            {info.value.map((val, idx) => (
                              <li key={idx}>{val}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AdditionalInfo
        info={field}
        onFieldInfoChange={(field) => handleFieldInfoChange(field)}
        onAddField={() => handleAddField()}
        disabled={prodFormData.images.length === 0}
      />

      <button type="submit" className="btn btn-primary mt-4">
        Add Product
      </button>
    </form>
  );
}
