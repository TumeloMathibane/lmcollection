"use client";

import { ChangeEvent } from "react";
import ImageWithFallback from "../ImageWithFallback";

interface DeliverySelProp {
  value?: string;
  onChange: (key: string, value: string) => void;
}

export default function DeliverySelector({ value, onChange }: DeliverySelProp) {
  return (
    <>
      <div className="join-item flex justify-center-safe w-1/2 has-checked:ring ring-blue-800 has-checked:rounded-l-lg has-checked:bg-blue-800/10">
        <input
          type="radio"
          name="method"
          id="shipping-the-courier-guy"
          className="radio hidden"
          value="tcg"
          onChange={(e) => {
            onChange("method", e.target?.value);
          }}
          checked={value === "tcg"}
        />
        <label
          htmlFor="shipping-the-courier-guy"
          className="size-25 h-fit self-center md:size-40 md:h-fit lg:size-25 lg:h-fit"
        >
          <ImageWithFallback
            src="https://thecourierguy.co.za/wp-content/uploads/2025/03/tcg-logo.svg"
            alt="the-courier-guy"
          />
        </label>
      </div>
      <div className="join-item flex justify-center-safe w-1/2 has-checked:ring ring-blue-800 has-checked:rounded-r-lg has-checked:bg-blue-800/10">
        <input
          type="radio"
          name="method"
          id="shipping-paxi"
          className="radio hidden"
          value="paxi"
          onChange={(e) => {
            onChange("method", e.target?.value);
          }}
          checked={value === "paxi"}
        />
        <label
          htmlFor="shipping-paxi"
          className="size-25 p-3 h-fit self-center md:size-40 md:h-fit lg:size-25 lg:h-fit"
        >
          <ImageWithFallback
            src="https://cdn.prod.website-files.com/632874eb357ffe9936d5498d/636a4b9640d40d161b81e109_PAXI_logo%5B93%5D.webp"
            alt="paxi"
          />
        </label>
      </div>
    </>
  );
}
