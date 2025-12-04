export default function Input({
  placeholder,
  prefix,
  suffix,
  ...rest
}: {
  placeholder: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="space-x-2 border border-stone-300 rounded-md px-2 py-1 flex items-center-safe w-fit">
      {prefix && <span>{prefix}</span>}
      <input
        type="number"
        className={`w-full focus:outline-0 ${prefix && "w-25"} ${suffix && "w-10"}`}
        placeholder={placeholder}
        {...rest}
      />
      {suffix && <span>{suffix}</span>}
    </div>
  );
}
