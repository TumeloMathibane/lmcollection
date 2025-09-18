interface ISizeInput {
  size: string | number | undefined;
  availableSizes: string[] | number[] | undefined;
  onSizeChange: (size: string | number | undefined) => void;
}

export default function SizeInput({
  size,
  availableSizes,
  onSizeChange,
}: ISizeInput) {
  const handleSizeChange = (value: string | number | undefined) => {
    onSizeChange(value);
  };

  return (
    <div className="flex space-x-4">
      {availableSizes?.map((availableSize, key) => (
        <p
          key={key}
          className={`${size === availableSize && "bg-stone-900 text-stone-200"} border border-stone-900 rounded-full w-fit h-full px-4 py-2 text-center hover:cursor-pointer`}
          onClick={() => handleSizeChange(availableSize)}
        >
          {availableSize}
        </p>
      ))}
    </div>
  );
}
