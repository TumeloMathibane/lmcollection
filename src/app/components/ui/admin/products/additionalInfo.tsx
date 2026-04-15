import { useEffect, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { AdditionalInfoField } from "./add-product-form";

export default function AdditionalInfo({
  info,
  onFieldInfoChange,
  onAddField,
  disableSelectables,
  disabled,
}: {
  info: AdditionalInfoField;
  onFieldInfoChange?: (field: AdditionalInfoField) => void;
  onAddField?: () => void;
  disableSelectables?: boolean;
  disabled?: boolean;
}) {
  const [aiDivOpen, setAiDivOpen] = useState<boolean>(false);

  const afTypes = ["bulletpoints", "colors", "options", "sizes", "text"];
  const afUnits = [
    { abbr: "mm", name: "millimeter" },
    { abbr: "cm", name: "centimeter" },
    { abbr: "inch", name: "inch" },
    { abbr: "ft", name: "foot" },
    { abbr: "g", name: "gram" },
    { abbr: "kg", name: "kilogram" },
    { abbr: "lb", name: "pounds" },
  ];

  const handleFieldInfoChange = (field: AdditionalInfoField) => {
    if (onFieldInfoChange) {
      onFieldInfoChange(field);
    }
  };

  const handleAddField = () => {
    if (onAddField) {
      onAddField();
    }
  };

  useEffect(() => {
    if (disabled) {
      setAiDivOpen(false);
    }
  }, [disabled]);

  return (
    <div className="space-y-2">
      <button
        type="button"
        className="btn disabled:bg-stone-300 disabled:text-stone-500"
        disabled={disabled}
        onClick={() => setAiDivOpen(!aiDivOpen)}>
        Add Additional Info
        <BiSolidDownArrow
          size={"1em"}
          className={`ml-2 ${aiDivOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <div
        className={`rounded bg-stone-100 overflow-hidden border border-stone-300 transition-all ${aiDivOpen ? "max-h-full" : "max-h-0 border-0"}`}>
        <div className="m-2 space-y-2">
          <div className="flex flex-col gap-2">
            <div>
              <label htmlFor="aflabel">Field label</label>

              <input
                type="text"
                className="input bg-transparent border border-stone-300 focus-within:bg-white focus:outline-0 focus:ring focus:ring-blue-400 p-1.5 w-full"
                placeholder="e.g. Color"
                name="aflabel"
                id="aflabel"
                value={info.label}
                onChange={(e) =>
                  handleFieldInfoChange({
                    label: e.target.value,
                    type: info.type,
                    value: (info.value as string) || "",
                    unit: info.unit,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="afUnit" className="italic text-stone-500">
                unit of measurement {"(optional)"}
              </label>

              <select
                name="afUnit"
                id="afUnit"
                className="select bg-stone-100 border border-stone-300 w-full p-2 pe-2 focus-within:outline-0"
                value={info.unit}
                onChange={(e) =>
                  e.target.value &&
                  handleFieldInfoChange({
                    label: info.label,
                    type: info.type,
                    value: info.value as string,
                    unit: e.target.value,
                  })
                }>
                <option value="">Select unit</option>
                {afUnits.map((unit) => (
                  <option key={unit.abbr} value={unit.name}>
                    {unit.name} {"(" + unit.abbr + ")"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="afType">Field type</label>

            <select
              name="afType"
              id="afType"
              className="select bg-stone-100 border border-stone-300 w-full p-2 pe-2 focus-within:outline-0 capitalize"
              value={info.type}
              onChange={(e) =>
                handleFieldInfoChange({
                  label: info.label,
                  type: e.target.value as
                    | ""
                    | "bulletpoints"
                    | "colors"
                    | "options"
                    | "sizes"
                    | "text",
                  value: info.value as string,
                  unit: info.unit,
                })
              }>
              <option value="">Select type</option>
              {afTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                  className={``}
                  disabled={
                    disableSelectables &&
                    (type === "options" ||
                      type === "colors" ||
                      type === "sizes")
                  }>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {info.type === "colors" && !disableSelectables && (
            <div className="min-w-fit">
              <label htmlFor="color-selector">Select color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  id="color-selector"
                  className="bg-transparent border border-stone-300 w-full h-10 px-2 rounded"
                />
              </div>
            </div>
          )}

          {info.label && info.type !== "" && (
            <div>
              <label htmlFor="afValue">Field value(s)</label>

              {info.type === "text" && (
                <input
                  type="text"
                  className="border border-stone-300 focus:focus-within:ring focus:focus-within:ring-blue-500 focus:focus-within:outline-0 focus:focus-wthin:rounded-none p-1.5 w-full"
                  placeholder={`Enter ${info.label.toLowerCase()}...`}
                  name="afValue"
                  id="afValue"
                  value={info.value as string}
                  onChange={(e) =>
                    handleFieldInfoChange({
                      label: info.label,
                      type: info.type,
                      value: e.target.value,
                      unit: info.unit,
                    })
                  }
                />
              )}

              {(info.type === "bulletpoints" ||
                info.type === "options" ||
                info.type === "colors" ||
                info.type === "sizes") && (
                <textarea
                  className="border border-stone-300 focus:focus-within:ring focus:focus-within:ring-blue-500 focus:focus-within:outline-0 focus:focus-wthin:rounded-none p-1.5 w-full"
                  placeholder={`Enter ${info.label.toLowerCase()}s separated by commas...`}
                  name="afValue"
                  id="afValue"
                  value={info.value as string}
                  onChange={(e) =>
                    handleFieldInfoChange({
                      label: info.label,
                      type: info.type,
                      value: e.target.value,
                      unit: info.unit,
                    })
                  }
                />
              )}
            </div>
          )}

          <button
            type="button"
            className="btn mt-3"
            onClick={() => handleAddField()}>
            Add field
          </button>
        </div>
      </div>
    </div>
  );
}
