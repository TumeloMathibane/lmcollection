"use client";

import { ChangeEvent, useState } from "react";
import ImageWithFallback from "../ImageWithFallback";

interface DeliverySelProp {
  method?: string;
  onChange: (value: string) => void;
}

export default function DeliverySelector({
  method,
  onChange,
}: DeliverySelProp) {
  const [open, setOpen] = useState<string | undefined>(method);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    onChange(e.currentTarget?.value);
  };

  return (
    <div className="bg-stone-200 p-4 rounded-xl space-y-3">
      <div className="flex flex-col space-y-3">
        <p className="text-stone-500">Select shipping service:</p>
        <div className="join join-horizontal flex w-full space-x-0.5">
          <div className="join-item flex justify-center-safe w-1/2 p-4 space-x-2 has-checked:ring ring-blue-800 has-checked:bg-blue-800/10">
            <input
              type="radio"
              name="shipping"
              id="shipping-the-courier-guy"
              className="radio hidden"
              value="tcg"
              onChange={(e) => {
                setOpen(e.currentTarget.value);
                handleChange(e);
              }}
              checked={method === "tcg"}
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
          <div className="join-item flex justify-center-safe w-1/2 p-4 space-x-2 has-checked:ring ring-blue-800 has-checked:bg-blue-800/10">
            <input
              type="radio"
              name="shipping"
              id="shipping-paxi"
              className="radio hidden"
              value="paxi"
              onChange={(e) => {
                setOpen(e.currentTarget?.value);
                handleChange(e);
              }}
              checked={method === "paxi"}
            />
            <label
              htmlFor="shipping-paxi"
              className="size-25 h-fit self-center md:size-40 md:h-fit lg:size-25 lg:h-fit"
            >
              <ImageWithFallback
                src="https://cdn.prod.website-files.com/632874eb357ffe9936d5498d/636a4b9640d40d161b81e109_PAXI_logo%5B93%5D.webp"
                alt="paxi"
              />
            </label>
          </div>
        </div>
      </div>

      <div hidden={open?.length === 0}>
        <div hidden={open === "tcg"}>
          <p>
            Information relating to <em>paxi</em> services will be requested
            here
          </p>
        </div>

        <div hidden={open === "paxi"}>
          <p>
            Information relating to <em>the courier guy</em> services will be
            requested here
          </p>
        </div>
      </div>
    </div>
  );
}
