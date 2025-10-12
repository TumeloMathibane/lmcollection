"use client";

import Image from "next/image";

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
          className="size-30 h-fit self-center md:size-40 md:h-fit lg:size-25 lg:h-fit"
        >
          <Image
            src={"/images/tcg_assets/The Courier Guy_id8GRqw8Lq_1.svg"}
            alt="tcg"
            width={500}
            height={500}
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
          className="size-30 h-fit self-center md:size-40 md:h-fit lg:size-25 lg:h-fit"
        >
          <Image
            src={"/images/paxi_assets/PAXI Full Colur 1.png"}
            alt="paxi"
            width={500}
            height={500}
          />
        </label>
      </div>
    </>
  );
}
