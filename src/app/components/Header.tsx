"use client";

import { navlinks } from "@/constants/links";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logos/Liphiwe_business_logo_white.svg";
import { useEffect, useState } from "react";
import { BiSearch, BiShoppingBag, BiMenu, BiX } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/stores/cart";

export default function Header() {
  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.productQty, 0)
  );

  const [navOpen, setNavOpen] = useState(false);
  const [searchWidgetOpen, setSearchWidgetOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (navOpen || searchWidgetOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else if (
      (!navOpen || !searchWidgetOpen) &&
      document.body.classList.contains("overflow-y-hidden")
    )
      document.body.classList.remove("overflow-y-hidden");
  });

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  return (
    <div className="bg-stone-950">
      <section
        className={`${searchWidgetOpen ? "block" : "hidden"} w-full h-screen fixed top-0 left-0 right-0 z-100`}
      >
        <div className="bg-stone-950 flex items-center justify-center-safe px-20 md:h-30 xl:h-25">
          <input
            type="text"
            name="home-search"
            id="home-search"
            placeholder="Search products"
            className="bg-stone-50 border border-stone-400 rounded-md w-1/2 py-2 ps-4 focus:outline-none focus:placeholder:mx-10"
          />
          <BiX
            size={"3em"}
            fill="white"
            stroke="white"
            onClick={() => setSearchWidgetOpen(false)}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="h-full backdrop-blur-xl"></div>
      </section>
      <section>
        <div className="flex items-center justify-between mx-5 md:mx-20">
          <i className="hidden md:block">
            <BiSearch
              size={"2em"}
              stroke="white"
              fill="white"
              onClick={() => setSearchWidgetOpen(true)}
              className="hover:cursor-pointer"
            />
          </i>
          <i className="md:hidden">
            {navOpen ? (
              <BiX
                size={"2em"}
                fill="white"
                stroke="white"
                onClick={() => setNavOpen(false)}
                className="hover:cursor-pointer"
              />
            ) : (
              <BiMenu
                size={"2em"}
                fill="white"
                stroke="white"
                onClick={() => setNavOpen(true)}
                className="hover:cursor-pointer"
              />
            )}
          </i>
          <Link href={"/"}>
            <Image
              src={logo}
              alt="lmcollection-logo"
              width={100}
              height={100}
              className="size-15 md:size-30 xl:size-25"
            />
          </Link>
          <Link href="/cart" className="relative">
            <BiShoppingBag
              size={"2em"}
              stroke="white"
              fill="white"
              className="hover:cursor-pointer"
            />
            {totalItems > 0 && (
              <span className="text-stone-800 bg-stone-200 text-left text-nowrap font-semibold absolute -top-1 -right-2 w-fit h-fit px-2 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </section>

      {/* Mobile nav */}
      <section
        className={`flex fixed z-10 w-full h-screen ${navOpen ? "translate-0" : "transition-all delay-100 -translate-x-[100%]"}`}
      >
        <div
          className={`backdrop-blur-sm w-full h-full fixed z-4 ${navOpen ? "translate-0" : "transition-all delay-75 duration-25 -translate-x-[100%]"}`}
          onClick={() => setNavOpen(!navOpen)}
        />
        {/* Nav links must be mapped here... */}
        <nav
          className={`md:hidden flex flex-col space-y-3 py-4 px-5 w-[70%] md:w-[50%] bg-stone-200 h-full z-5 transition-all ${navOpen ? "duration-700 translate-0 ease-out" : "duration-100 -translate-x-[100%]"}`}
        >
          {navlinks.map(
            ({ name, href }, key) =>
              name !== "Policies" && (
                <Link
                  key={key}
                  href={href}
                  className="font-semibold text-shadow-stone-950"
                >
                  {name}
                </Link>
              )
          )}
        </nav>
      </section>
    </div>
  );
}
