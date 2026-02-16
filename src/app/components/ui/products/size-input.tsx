interface SizeInputProps {
  size: string | undefined;
  availableSizes: string[];
  unit?: string;
  onSizeChange: (size: string) => void;
}

export default function SizeInput({
  size,
  availableSizes,
  unit,
  onSizeChange,
}: SizeInputProps) {
  const handleSizeChange = (value: string) => {
    onSizeChange(value);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center-safe">
      {availableSizes?.length === 1 ?
        availableSizes?.map((availableSize, key) => (
          <p
            key={key}
            className="flex items-center bg-stone-900 text-white border border-stone-900 rounded-full w-fit h-full text-center text-nowrap hover:cursor-pointer px-3 py-2"
            onClick={() => handleSizeChange(availableSize)}>
            {availableSize.includes("=") ?
              Number(availableSize.split("=")[0]).toLocaleString("en-GB", {
                style: "unit",
                unit: unit,
                unitDisplay: "narrow",
              })
            : availableSize}
          </p>
        ))
      : availableSizes?.map((availableSize, key) => (
          <p
            key={key}
            className={`${size === availableSize && "flex items-center bg-stone-900 text-white"} border border-stone-900 rounded-full w-fit h-full px-[1.2em] py-[0.5em] text-center text-nowrap hover:cursor-pointer`}
            onClick={() => handleSizeChange(availableSize)}>
            {availableSize.includes("=") ?
              Number(availableSize.split("=")[0]).toLocaleString("en-GB", {
                style: "unit",
                unit: unit,
                unitDisplay: "narrow",
              })
            : availableSize}
          </p>
        ))
      }
    </div>
  );
}
