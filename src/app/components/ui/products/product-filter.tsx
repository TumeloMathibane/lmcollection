import { useDebounce } from "@/hooks/useDebouce";
import { useEffect, useState } from "react";
import { BsChevronDown, BsX } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { useRouter } from "next/navigation";

export interface Filter {
  availability: string;
  minPrice: number;
  maxPrice: number;
  rating: string;
  sorting: string;
}

interface FilterProps {
  heading?: string;
  noOfProducts?: number;
}

export default function ProductFilter({ heading, noOfProducts }: FilterProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState<Filter | undefined>(
    undefined,
  );
  const [min, setMin] = useState<number | undefined>(undefined);
  const [max, setMax] = useState<number | undefined>(undefined);
  const minPriceVal = useDebounce(min, 500);
  const maxPriceVal = useDebounce(max, 500);

  const router = useRouter();

  const sortOpts = [
    "Name - asc.",
    "Name - desc.",
    "Price - asc.",
    "Price - desc.",
    "Rating - asc.",
    "Rating - desc.",
  ];

  useEffect(() => {
    if (minPriceVal !== undefined || maxPriceVal !== undefined) {
      setSelectedFilters(
        (prev) =>
          ({ ...prev, minPrice: minPriceVal, maxPrice: maxPriceVal }) as Filter,
      );
    }
  }, [minPriceVal, maxPriceVal]);

  useEffect(() => {
    let sParams = "";

    Object.entries(selectedFilters ?? {}).forEach(
      ([key, value]) =>
        value !== "" && !Number.isNaN(value) && (sParams += `${key}=${value}&`),
    );
    router.replace(`?${sParams}`);
  }, [selectedFilters, router]);

  return (
    <div className="w-full md:flex md:flex-col md:relative md:mb-3 md:space-y-2">
      <div className="flex items-center justify-between">
        <div
          className="group w-fit flex items-center-safe gap-2 md:h-fit md:space-x-2"
          onClick={() => setFilterOpen(!filterOpen)}>
          <p className="md:text-stone-500 md:group-hover:text-black md:group-hover:cursor-pointer">
            Filter & sort
          </p>
          <FaFilter size={"1rem"} className="md:hidden" />

          <BsChevronDown
            size={"1rem"}
            className={`hidden md:block stroke-1 group-hover:cursor-pointer transition-transform ${filterOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>

        <div>
          <p className="text-nowrap font-light text-stone-500">
            {noOfProducts && noOfProducts > 1 ?
              `${noOfProducts} products`
            : noOfProducts === 1 && `${noOfProducts} product`}
          </p>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 bottom-0 left-0 flex justify-end transition-all ${filterOpen ? "z-10 backdrop-blur-sm" : "delay-100 backdrop-none -z-1 md:delay-0"} md:backdrop-blur-none md:w-full md:relative md:flex`}>
        <div
          className={`w-74 min-h-dvh bg-stone-300 flex flex-col transition-all ${filterOpen ? "translate-0" : "translate-x-full"} md:translate-0 md:min-h-0 md:w-full md:flex-row md:bg-white md:border-t md:border-stone-200 md:overflow-hidden ${filterOpen ? "md:max-h-[90vh]" : "md:max-h-0"}`}>
          <div className="w-full bg-stone-950 text-white font-bold md:hidden">
            <p className="p-4 mx-2">{heading}</p>
            <BsX
              size={"1.5rem"}
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setFilterOpen(false)}
            />
          </div>

          <div className="py-4 px-6 space-y-5 md:w-full md:flex md:justify-between md:p-0 md:space-y-0 md:mx-4 md:my-2">
            {/* avaliability */}
            {/*//! TODO 1: change implementation to allowing for simultaneously viewing of all available and not available items */}
            <div className="md:h-fit md:space-y-2 md:pb-2">
              <p className="font-bold md:font-normal">Availability</p>

              <div className="space-y-1 md:space-y-0 md:bg-white md:w-fit">
                {Array.from(["In stock", "Out of Stock"]).map((opt, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="availability"
                      id={`availability${idx}`}
                      value={opt}
                      className="radio radio-xs bg-transparent"
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
            <div className="space-y-1 md:max-w-50 md:h-fit md:px-1 md:space-y-2">
              <p className="font-bold md:font-normal">Price range</p>

              <div>
                <div className="w-full flex gap-2 items-center">
                  <input
                    type="number"
                    name="minPrice"
                    className="w-full p-1 rounded-none bg-transparent border border-stone-200 focus:bg-white focus:focus-within:outline-0 focus:focus-within:ring focus:focus-within:ring-blue-600"
                    onChange={(e) => {
                      setMin(e.target.valueAsNumber);
                    }}
                    placeholder="From"
                  />

                  <p>{"-"}</p>

                  <input
                    type="number"
                    name="maxPrice"
                    className="w-full p-1 rounded-none bg-transparent border border-stone-200 focus:bg-white focus:focus-within:outline-0 focus:focus-within:ring focus:focus-within:ring-blue-600"
                    onChange={(e) => {
                      setMax(e.target.valueAsNumber);
                    }}
                    placeholder="To"
                  />
                </div>
              </div>
            </div>

            {/* rating */}
            <div className="space-y-1 md:hidden">
              <p className="font-bold md:font-normal">Rating</p>

              <div className="space-y-2">
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
            <div className="space-y-1 md:max-w-80 md:h-fit md:px-1 md:space-y-2">
              <p className="font-bold md:font-normal">Sort by</p>

              <select
                name="sorting"
                className="p-2 border border-stone-400 focus:focus-within:ring focus:focus-within:ring-blue-600 focus:focus-within:outline-offset-0 focus:focus-within:outline-0 md:w-full md:px-2 md:py-1"
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
              className="cursor-pointer text-red-600 underline underline-offset-2 w-fit md:hidden"
              onClick={() => console.log("Button not functional")}>
              Clear filter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
