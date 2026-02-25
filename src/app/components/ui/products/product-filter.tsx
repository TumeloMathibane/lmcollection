import { useDebounce } from "@/hooks/useDebouce";
import { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";

export interface Filter {
  availability: string;
  minPrice: number;
  maxPrice: number;
  rating: string;
  soring: string;
}

interface FilterProps {
  heading?: string;
  filter?: Filter;
  onFilterChange?: (filter: Filter | undefined) => void;
}

export default function ProductFilter({
  heading,
  filter,
  onFilterChange,
}: FilterProps) {
  // possible filters: availability, price range, rating,

  const [filterOpen, setFilterOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState<Filter | undefined>(
    filter,
  );
  const [min, setMin] = useState<number | undefined>(undefined);
  const [max, setMax] = useState<number | undefined>(undefined);
  const minPriceVal = useDebounce(min, 500);
  const maxPriceVal = useDebounce(max, 500);
  useEffect(() => {
    if (minPriceVal !== undefined || maxPriceVal !== undefined) {
      setSelectedFilters(
        (prev) =>
          ({ ...prev, minPrice: minPriceVal, maxPrice: maxPriceVal }) as Filter,
      );
    }
  }, [minPriceVal, maxPriceVal]);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(selectedFilters);
    }
  }, [selectedFilters, onFilterChange]);

  // sorting options: name - ascending & descending, price - ascending & descending, rating - ascending & descending
  const sortOpts = [
    "Name - asc.",
    "Name - desc.",
    "Price - asc.",
    "Price - desc.",
    "Rating - asc.",
    "Rating - desc.",
  ];

  return (
    <div className="w-full">
      <div className="h-full w-full flex items-center-safe gap-2">
        <p>Filter </p>
        <FaFilter size={"1rem"} onClick={() => setFilterOpen(true)} />
      </div>

      <div
        className={`fixed top-0 right-0 bottom-0 left-0 flex justify-end transition-all ${filterOpen ? "z-10 backdrop-brightness-50 backdrop-blur-sm" : "delay-200 backdrop-brightness-100 backdrop-none -z-1"} lg:hidden`}>
        <div
          className={`w-74 min-h-dvh bg-stone-300 flex flex-col transition-all ${filterOpen ? "translate-0" : "translate-x-full"}`}>
          <p className="border-b border-stone-400 p-4 mx-2">{heading}</p>
          <BsX
            size={"1.5rem"}
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setFilterOpen(false)}
          />

          <div className="py-4 px-6 space-y-3">
            {/* avaliability */}
            <div>
              <p className="font-bold">Availability:</p>

              <div>
                {Array.from(["In stock", "Out of Stock"]).map((opt, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="radio"
                      name="availability"
                      id={`availability${idx}`}
                      value={opt}
                      className="radio radio-sm bg-transparent"
                      onChange={(e) => {
                        setSelectedFilters(
                          (prev) =>
                            ({
                              ...prev,
                              [e.target.name]: e.target.value as string,
                            }) as Filter,
                        );
                      }}
                    />

                    <label htmlFor={`availability${idx}`}>{opt}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* min & max price range */}
            <p className="font-bold">Price range:</p>
            <div>
              <div className="w-full flex gap-2 items-center">
                <input
                  type="number"
                  name="minPrice"
                  className="w-full p-1 rounded-none bg-transparent border border-stone-400 focus:bg-white focus:focus-within:outline-0 focus:focus-within:ring focus:focus-within:ring-blue-600"
                  onChange={(e) => {
                    setMin(e.target.valueAsNumber);
                  }}
                />

                <p>{"-"}</p>

                <input
                  type="number"
                  name="maxPrice"
                  className="w-full p-1 rounded-none bg-transparent border border-stone-400 focus:bg-white focus:focus-within:outline-0 focus:focus-within:ring focus:focus-within:ring-blue-600"
                  onChange={(e) => {
                    setMax(e.target.valueAsNumber);
                  }}
                />
              </div>
            </div>

            {/* rating */}
            <div>
              <p className="font-bold">Rating</p>

              <div>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="radio"
                      name="rating"
                      id={`rating${idx}`}
                      className="radio radio-sm bg-transparent"
                      value={`${idx + 1} ${idx + 1 > 1 ? "stars" : "star"}`}
                      onChange={(e) => {
                        setSelectedFilters(
                          (prev) =>
                            ({
                              ...prev,
                              [e.target.name]: e.target.value as string,
                            }) as Filter,
                        );
                      }}
                    />

                    <label
                      htmlFor={`rating${idx}`}>{`${idx + 1} ${idx + 1 > 1 ? "stars" : "star"}`}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* sorting */}
            <div>
              <p className="font-bold">Sort by:</p>

              <select
                name="sorting"
                className="p-2 border border-stone-400 focus:focus-within:ring focus:focus-within:ring-blue-600 focus:focus-within:outline-offset-0 focus:focus-within:outline-0"
                onChange={(e) => {
                  setSelectedFilters(
                    (prev) =>
                      ({
                        ...prev,
                        [e.target.name]: e.target.value as string,
                      }) as Filter,
                  );
                }}>
                <option value={""}>Select option</option>
                {sortOpts.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <p
              className="cursor-pointer text-red-600 underline underline-offset-2 w-fit"
              onClick={() => console.log("Button not functional")}>
              Clear filter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
