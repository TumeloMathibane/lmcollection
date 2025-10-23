import { BsXLg } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function SearchWidget({
  isOpen,
  closeWidget,
}: {
  isOpen: boolean;
  closeWidget: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string | undefined>("");

  useEffect(() => {
    if (isOpen) document.getElementById("search-widget")?.focus();
  }, [isOpen]);

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
          onClick={() => closeWidget()}
          className="hover:cursor-pointer"
        />
      </div>
      <div className="h-full backdrop-blur-xl">
        <div className="w-full h-full flex flex-col items-center-safe py-5">
          {searchTerm && (
            <div className="bg-white rounded-lg w-[590px] flex border border-stone-400 py-2 px-4">
              <p>{searchTerm}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
