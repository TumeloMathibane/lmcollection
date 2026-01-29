// import { ChangeEvent, useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { AdditionalInfoField } from "./add-product-form";

export default function AdditionalInfo({
  info,
  onFieldInfoChange,
  onAddField,
  disabled,
}: {
  info?: AdditionalInfoField;
  onFieldInfoChange?: (field: AdditionalInfoField) => void;
  onAddField?: () => void;
  disabled?: boolean;
}) {
  const [aiDivOpen, setAiDivOpen] = useState<boolean>(false);

  const afTypes = ["bulletpoints", "colors", "options", "text"];

  const handleFieldInfoChange = (field: {
    label: string;
    type: string;
    value: string | string[];
  }) => {
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
        className="btn"
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
          <div>
            <label htmlFor="aflabel">Field label</label>

            <input
              type="text"
              className="input input-md w-full"
              placeholder="e.g. Color"
              name="aflabel"
              id="aflabel"
              value={info!.label}
              onChange={(e) =>
                handleFieldInfoChange({
                  label: e.target.value,
                  type: info!.type,
                  value: info!.value,
                })
              }
            />
          </div>

          <div>
            <label htmlFor="afType">Field type</label>

            <select
              name="afType"
              id="afType"
              className="select select-md w-full p-2 pe-10 rounded capitalize"
              value={info!.type}
              onChange={(e) =>
                handleFieldInfoChange({
                  label: info!.label,
                  type: e.target.value,
                  value: info!.value,
                })
              }>
              <option value="">Select type</option>
              {afTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {info!.type === "colors" && (
            <div className="min-w-fit">
              <label htmlFor="color-selector">Select color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  id="color-selector"
                  className="input input-md rounded"
                />
              </div>
            </div>
          )}

          {info!.label && info!.type !== "" && (
            <div>
              <label htmlFor="afValue">Field value(s)</label>

              {info!.type === "text" && (
                <input
                  type="text"
                  className="input input-md w-full"
                  placeholder={`Enter ${info!.label.toLowerCase()}...`}
                  name="afValue"
                  id="afValue"
                  value={info!.value}
                  onChange={(e) =>
                    handleFieldInfoChange({
                      label: info!.label,
                      type: info!.type,
                      value: e.target.value,
                    })
                  }
                />
              )}

              {(info!.type === "bulletpoints" ||
                info!.type === "options" ||
                info!.type === "colors") && (
                <textarea
                  className="textarea textarea-md w-full"
                  placeholder={`Enter ${info!.label.toLowerCase()}s separated by commas...`}
                  name="afValue"
                  id="afValue"
                  value={info!.value}
                  onChange={(e) =>
                    handleFieldInfoChange({
                      label: info!.label,
                      type: info!.type,
                      value: e.target.value,
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
