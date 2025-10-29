interface SizeInputProps {
  size: string | undefined;
  availableSizes: string[] | undefined;
  onSizeChange: (size: string | undefined) => void;
}

export default function SizeInput({
  size,
  availableSizes,
  onSizeChange,
}: SizeInputProps) {
  const handleSizeChange = (value: string | undefined) => {
    onSizeChange(value);
  };

  return (
    <div className="flex space-x-4">
      {availableSizes?.length === 1
        ? availableSizes?.map((availableSize, key) => (
            <p
              key={key}
              className="bg-stone-900 text-stone-200 border border-stone-900 rounded-full w-fit h-full px-4 py-2 text-center text-nowrap hover:cursor-pointer"
            >
              {availableSize}
            </p>
          ))
        : availableSizes?.map((availableSize, key) => (
            <p
              key={key}
              className={`${size === availableSize && "bg-stone-900 text-stone-200"} border border-stone-900 rounded-full w-fit h-full px-4 py-2 text-center text-nowrap hover:cursor-pointer`}
              onClick={() => handleSizeChange(availableSize)}
            >
              {availableSize}
            </p>
          ))}
    </div>
  );
}
