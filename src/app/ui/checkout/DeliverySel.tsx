"use client";

import { ChangeEvent, useState } from "react";
import ImageWithFallback from "../ImageWithFallback";

interface DeliverySelProp {
  onChange: (value: string) => void;
}

export default function DeliverySelector({ onChange }: DeliverySelProp) {
  const [open, setOpen] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    onChange(e.currentTarget?.value);
  };

  return (
    <div className="bg-stone-200 p-4 rounded-sm space-y-3">
      <div className="join join-vertical flex flex-col space-y-3">
        <p className="text-stone-500">Select shipping service:</p>
        <div className=" flex space-x-3">
          <div className="join-item flex w-1/2 item-center-safe space-x-2">
            <input
              type="radio"
              name="shipping"
              id="shipping-the-courier-guy"
              className="radio"
              value="tcg"
              onChange={(e) => {
                setOpen(e.currentTarget.value);
                handleChange(e);
              }}
            />
            <label htmlFor="shipping-the-courier-guy" className="size-25 h-fit">
              <ImageWithFallback
                src="https://thecourierguy.co.za/wp-content/uploads/2025/03/tcg-logo.svg"
                alt="the-courier-guy"
              />
            </label>
          </div>
          <div className="join-item flex w-1/2 item-center-safe space-x-2">
            <input
              type="radio"
              name="shipping"
              id="shipping-paxi"
              className="radio"
              value="paxi"
              onChange={(e) => {
                setOpen(e.currentTarget?.value);
                handleChange(e);
              }}
            />
            <label htmlFor="shipping-paxi" className="size-25 h-fit">
              <ImageWithFallback
                src="https://cdn.prod.website-files.com/632874eb357ffe9936d5498d/636a4b9640d40d161b81e109_PAXI_logo%5B93%5D.webp"
                alt="paxi"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-3" hidden={open?.length === 0}>
        <div className="space-y-3" hidden={open === "tcg"}>
          <p>
            Information relating to <em>paxi</em> services will be requested
            here
          </p>
        </div>

        <div className="space-y-3" hidden={open === "paxi"}>
          <p>
            Information relating to <em>the courier guy</em> services will be
            requested here
          </p>
        </div>
      </div>
    </div>
  );
}
