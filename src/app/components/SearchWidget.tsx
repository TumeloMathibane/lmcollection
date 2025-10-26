"use client";

import { useEffect, useState, useRef } from "react";
import { BsOpencollective, BsX } from "react-icons/bs";
import { useDebounce } from "../hooks/useDebouce";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

export default function SearchWidget({
  isOpen,
  closeWidget,
}: {
  isOpen: boolean;
  closeWidget: (isOpen: boolean) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500) ?? "";
  const searchResults = useQuery(
    api.products.searchProducts,
    debouncedSearchTerm?.trim() !== ""
      ? { searchTerm: debouncedSearchTerm, limit: 5 }
      : "skip"
  );
  const suggestions = useQuery(
    api.products.getSearchSuggestion,
    debouncedSearchTerm?.trim() !== ""
      ? { searchTerm: debouncedSearchTerm, limit: 5 }
      : "skip"
  );

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) setIsLoading(true);
    else setIsLoading(false);
  }, [searchTerm, debouncedSearchTerm, searchResults]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        closeWidget(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeWidget]);

  const handleProductClick = () => {
    setSearchTerm("");
    closeWidget(false);
  };

  return (
    <>
      <div
        ref={searchRef}
        className="bg-stone-950 flex flex-col items-center justify-center-safe space-x-3 md:h-30 xl:h-25"
      >
        <div className="z-10 relative">
          <div className="flex relative mt-3">
            <input
              ref={inputRef}
              className="w-[850px] py-4 ps-2 pe-[2em] text-white focus:outline-0 placeholder-stone-400 border-b border-white"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target?.value)}
            />
            {searchTerm && searchTerm?.length > 0 && (
              <BsX
                size={"2em"}
                className="fill-stone-50 w-fit h-fit absolute right-0 flex place-self-center-safe origin-center hover:cursor-pointer"
                onClick={() => {
                  setSearchTerm("");
                  inputRef.current?.focus();
                }}
              />
            )}
          </div>

          {/* <div className="w-full h-full flex flex-col items-center-safe z-10"> */}
          {searchTerm && (
            <div className="bg-white w-[850px] absolute flex py-2 px-4 shadow-sm shadow-stone-900">
              <div className="flex flex-col w-full space-y-2">
                <div className="flex space-x-4">
                  {isLoading ? (
                    <BsOpencollective
                      className="flex my-5 mx-auto animate-spin"
                      size={"3em"}
                    />
                  ) : (
                    <>
                      <div className="w-2/5">
                        <div className="font-semibold text-stone-700">
                          <p>Suggestions:</p>
                          <div className="w-full border-b border-stone-300" />
                        </div>

                        <div>
                          {suggestions && suggestions?.length > 0 ? (
                            suggestions?.map((item, index) => (
                              <p key={index} className="py-1">
                                {item?.name}
                              </p>
                            ))
                          ) : (
                            <p>No suggestions</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col w-3/5">
                        <div className="px-2 font-semibold text-stone-700">
                          <p>Products</p>
                          <div className="w-full border-b border-stone-300" />
                        </div>
                        {searchResults?.map((item, index) => (
                          <Link
                            href={`/collection/products/${item?._id}`}
                            key={index}
                            className="p-2 hover:cursor-pointer hover:bg-stone-800/5"
                            onClick={() => handleProductClick()}
                          >
                            <div className="flex space-x-2">
                              <div className="h-auto size-15">
                                <ImageWithFallback
                                  src={item?.image}
                                  alt={item?.name}
                                />
                              </div>
                              <p className="self-center-safe">{item?.name}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <p
                  className={`${searchResults && searchResults?.length > 0 && "border-t border-stone-400 py-2 "} w-full`}
                >
                  Search results for: {searchTerm}
                </p>
              </div>
            </div>
          )}
        </div>
        {/* </div> */}
      </div>

      <div className="h-full backdrop-blur-xl" />
    </>
  );
}
