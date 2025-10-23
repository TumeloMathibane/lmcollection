"use client";

import { BsXLg, BsOpencollective } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "../hooks/useDebouce";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SearchWidget({
  isOpen,
  closeWidget,
}: {
  isOpen: boolean;
  closeWidget: (close: boolean) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const debouncedSearchTerm = useDebounce(searchTerm, 500) ?? "";
  const searchResults = useQuery(
    api.products.searchProducts,
    debouncedSearchTerm?.trim() !== ""
      ? { searchTerm: debouncedSearchTerm, limit: 8 }
      : "skip"
  );

  useEffect(() => {
    if (isOpen) document.getElementById("search-widget")?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) setIsLoading(true);
    else setIsLoading(false);
  }, [searchTerm, debouncedSearchTerm, searchResults]);

  return (
    <>
      <div className="bg-stone-950 flex items-center justify-center-safe space-x-3 md:h-30 xl:h-25">
        <input
          type="text"
          name="search-widget"
          id="search-widget"
          placeholder="Search products"
          className="bg-stone-50 rounded-md w-[550px] py-2 ps-4 focus:outline-none focus:placeholder:mx-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget?.value)}
        />
        <BsXLg
          size={"2em"}
          fill="white"
          stroke="white"
          onClick={() => closeWidget(false)}
          className="hover:cursor-pointer"
        />
      </div>
      <div className="h-full backdrop-blur-xl">
        <div className="w-full h-full flex flex-col items-center-safe py-5">
          {searchTerm && (
            <div className="bg-white rounded-lg w-[590px] flex border border-stone-400 py-2 px-4">
              <div className="flex flex-col w-full">
                {isLoading ? (
                  <BsOpencollective
                    className="flex my-5 mx-auto animate-spin"
                    size={"3em"}
                  />
                ) : (
                  <div className="flex flex-col">
                    {searchResults?.map((item, index) => (
                      <p key={index}>{item?.name}</p>
                    ))}
                  </div>
                )}
                <p
                  className={`${searchResults && searchResults?.length > 0 && "border-t border-stone-400 py-2 "} w-full`}
                >
                  Search results for: {searchTerm}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
