"use client";

import { useEffect, useState, useRef } from "react";
import { BsX } from "react-icons/bs";
import { useDebounce } from "../hooks/useDebouce";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import ImageWithFallback from "./image-with-fallback";

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
  const searchResults:
    | {
        _id: string;
        name: string;
        price: number;
        image: string | null;
        category: string;
      }[]
    | undefined = useQuery(
    api.products.searchProducts,
    debouncedSearchTerm?.trim() !== ""
      ? { searchTerm: debouncedSearchTerm, limit: 5 }
      : "skip",
  );

  const suggestions: { name: string }[] | undefined = useQuery(
    api.products.getSearchSuggestion,
    debouncedSearchTerm?.trim() !== ""
      ? { searchTerm: debouncedSearchTerm, limit: 5 }
      : "skip",
  );

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm || !searchResults)
      setIsLoading(true);
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
        className="bg-stone-900 flex justify-center h-30 max-h-full py-8 md:px-10 lg:px-0"
      >
        <div className="z-10 w-full md:max-w-150 flex flex-col justify-center-safe">
          <div className="w-full flex relative">
            <input
              ref={inputRef}
              className="w-full py-4 ps-4 pe-[3em] text-white border-b border-stone-200 focus:outline-1 focus:outline-stone-200 placeholder-stone-400"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target?.value)}
            />
            {searchTerm && searchTerm?.length > 0 && (
              <BsX
                size={"2em"}
                className="fill-stone-50 w-fit h-fit mx-2 absolute right-0 flex place-self-center-safe origin-center hover:cursor-pointer"
                onClick={() => {
                  setSearchTerm("");
                  inputRef.current?.focus();
                }}
              />
            )}
          </div>

          {searchTerm && (
            <div className="relative w-full">
              <div className="bg-white flex py-2 px-4 shadow-sm shadow-stone-900">
                <div className="flex flex-col w-full space-y-2">
                  <div className="flex space-x-4">
                    {isLoading ? (
                      // <BsOpencollective
                      //   className="flex my-5 mx-auto animate-spin"
                      //   size={"3em"}
                      // />
                      <span className="loading loading-bars loading-xl flex my-5 mx-auto" />
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
                                <p
                                  key={index}
                                  style={{
                                    cursor:
                                      item?.name !== searchTerm
                                        ? "pointer"
                                        : "default",
                                  }}
                                  className="py-1"
                                  onClick={() =>
                                    setSearchTerm(String(item?.name).trim())
                                  }
                                >
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

                          {searchResults && searchResults.length > 0 ? (
                            searchResults?.map((item, index) => (
                              <Link
                                href={`/collection/products/${item?._id}`}
                                key={index}
                                className="p-2 hover:cursor-pointer hover:bg-stone-800/5"
                                onClick={() => handleProductClick()}
                                prefetch={false}
                              >
                                <div className="flex space-x-2">
                                  <div className="h-auto size-15">
                                    <ImageWithFallback
                                      src={item?.image ?? ""}
                                      alt={item?.name}
                                    />
                                  </div>
                                  <p className="self-center-safe">
                                    {item?.name}
                                  </p>
                                </div>
                              </Link>
                            ))
                          ) : (
                            <p className="px-2">No products found</p>
                          )}
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
            </div>
          )}
        </div>
      </div>

      <div className="h-full backdrop-blur-xl" />
    </>
  );
}
