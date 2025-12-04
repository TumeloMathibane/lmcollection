"use client";

import Input from "../price-input";

export default function ProductForm() {
  return (
    <form className="size-full">
      <div className="gap-7 flex size-full">
        <div className="flex flex-col w-full">
          <div className="w-full h-full space-y-3">
            <div className="flex gap-5 w-full">
              <div className="flex flex-col w-full">
                <label htmlFor="product-name">Product name</label>
                <input
                  type="text"
                  id="product-name"
                  className="input input-bordered input-sm w-full focus:outline-0"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="product-price">Price</label>
                <Input placeholder="123.45" prefix="R" />
              </div>
            </div>

            <div className="flex gap-5">
              <div>
                <label htmlFor="product-discount">Discount</label>
                <Input placeholder="5.0" suffix="%" />
              </div>

              <div>
                <label htmlFor="product-quantity">Quantity</label>
                <input
                  type="number"
                  id="product-quanity"
                  className="border border-stone-300 rounded-md px-2 py-1 flex content-center-safe w-full focus:outline-0"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="product-description">Description</label>
              <textarea
                id="product-description"
                className="textarea textarea-md p-1 focus:outline-0 w-full"></textarea>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="product-category">Category</label>
              <select className="border border-stone-300 px-2 py-1 rounded-md w-full">
                <option value="">Select category</option>
                <option value="appliances">Appliances</option>
                <option value="shoes">Shoes</option>
              </select>
            </div>

            <div className="border border-stone-300 p-3 bg-gray-300 transition-all">
              <p>Additional information...</p>
            </div>
          </div>

          <button type="button" className="btn btn-success w-fit px-10">
            Add product
          </button>
        </div>

        {/* Hidden, and only shown when category is selected. */}
        <div className="w-full">
          <div className="bg-gray-500 h-full p-5 text-white">
            <p>Second section...</p>
          </div>
        </div>
      </div>
    </form>
  );
}
