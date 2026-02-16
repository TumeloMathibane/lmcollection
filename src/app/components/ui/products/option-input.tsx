"use client";

interface OptionInputProps {
  opt: string;
  options: string[];
  unit?: string;
  onOptionChange: (option: string) => void;
}

export default function OptionInput({
  opt,
  options,
  unit,
  onOptionChange,
}: OptionInputProps) {
  const handleOptionChange = (opt: string) => {
    onOptionChange(opt);
  };

  return (
    <div className="w-full flex flex-wrap items-center-safe gap-3">
      {options.map((option, index) => (
        <p
          key={index}
          className={`flex items-center-safe px-[1.2em] py-[0.5em] border border-stone-300 rounded-full hover:cursor-pointer ${opt === option ? "bg-stone-300 inset-shadow-xs inset-shadow-stone-400 font-semibold" : "inset-shadow-none text-stone-400"}`}
          onClick={() => handleOptionChange(option)}>
          {unit ?
            new Intl.NumberFormat("en-ZA", {
              style: "unit",
              unit: unit,
              unitDisplay: "narrow",
            }).format(Number(option.split("=")[0]?.trim()))
          : option.split("=")[0]?.trim()}
        </p>
      ))}
    </div>
  );
}
