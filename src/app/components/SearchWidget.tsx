"use client";

import { useEffect, useState, useRef } from "react";
import { BsOpencollective, BsX } from "react-icons/bs";
import { useDebounce } from "../hooks/useDebouce";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

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
      ? { searchTerm: debouncedSearchTerm, limit: 8 }
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
        <div className="flex relative mt-3">
          <input
            ref={inputRef}
            className="w-[550px] py-4 ps-2 pe-[2em] text-white focus:outline-0 placeholder-stone-400 border-b border-white"
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

        <div className="w-full h-full flex flex-col items-center-safe z-10">
          {searchTerm && (
            <div className="bg-white rounded-x-lg rounded-b-lg w-[550px] flex border-x border-b border-stone-400 py-2 px-4">
              <div className="flex flex-col w-full space-y-2">
                {isLoading ? (
                  <BsOpencollective
                    className="flex my-5 mx-auto animate-spin"
                    size={"3em"}
                  />
                ) : (
                  <div className="flex flex-col">
                    {searchResults?.map((item, index) => (
                      <Link
                        href={`/collection/products/${item?._id}`}
                        key={index}
                        className="border-b last:border-0 border-stone-400 p-2 hover:cursor-pointer hover:ring ring-blue-800 hover:rounded hover:bg-blue-800/10"
                        onClick={() => handleProductClick()}
                      >
                        {item?.name}
                      </Link>
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

      <div className="h-full backdrop-blur-xl">
        {/* <div className="w-full h-full flex flex-col items-center-safe">
          {searchTerm && (
            <div className="bg-white rounded-x-lg rounded-b-lg w-[550px] flex border-x border-b border-stone-400 py-2 px-4">
              <div className="flex flex-col w-full space-y-2">
                {isLoading ? (
                  <BsOpencollective
                    className="flex my-5 mx-auto animate-spin"
                    size={"3em"}
                  />
                ) : (
                  <div className="flex flex-col">
                    {searchResults?.map((item, index) => (
                      <Link
                        href={`/collection/products/${item?._id}`}
                        key={index}
                        className="border-b last:border-0 border-stone-400 p-2 hover:cursor-pointer hover:ring ring-blue-800 hover:rounded hover:bg-blue-800/10"
                        onClick={() => handleProductClick(item?._id)}
                      >
                        {item?.name}
                      </Link>
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
        </div> */}
      </div>
    </>
  );
}
