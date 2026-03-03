"use client";

import { ChangeEvent } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

interface QuantityInputProps {
  quantity: number;
  onChange: (value: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  incrementDisable?: boolean;
  decrementDisable?: boolean;
}

export default function QuantityInput({
  quantity,
  onChange,
  onIncrement,
  onDecrement,
  incrementDisable,
}: QuantityInputProps) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // if (!Number.isNaN(e.target.valueAsNumber)) {
    onChange(e.target.valueAsNumber);
    // }
  };

  return (
    <div className="product-quantity border border-stone-400 flex w-full overflow-hidden">
      <button
        onClick={() => onDecrement()}
        className="flex items-center-safe justify-center disabled:bg-stone-300 disabled:mask-alpha disabled:mask-r-from-80% disabled:cursor-not-allowed disabled:text-stone-500 w-1/3 p-2"
        disabled={quantity <= 1 || quantity.toString() === ""}>
        <BiMinus />
      </button>
      <input
        type="number"
        name="quantity-input"
        value={quantity}
        onChange={handleOnChange}
        onBlur={(e) => {
          if (Number.isNaN(e.target.valueAsNumber)) {
            onChange(1);
          }
        }}
        className="quantity-input text-center w-1/3 p-2"
      />
      <button
        onClick={() => onIncrement()}
        className="flex items-center-safe justify-center disabled:bg-stone-300 disabled:mask-alpha disabled:mask-l-from-80% disabled:cursor-not-allowed disabled:text-stone-500 w-1/3 p-2"
        disabled={incrementDisable}>
        <BiPlus />
      </button>
    </div>
  );
}
