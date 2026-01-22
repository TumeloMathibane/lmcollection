"use client";

import Banner from "@/components/ui/admin/banner";
import { usePathname } from "next/navigation";
// import { BiRightArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";

export default function AdminSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navOpen]);

  return (
    <>
      <Banner navOpen={() => setNavOpen(true)} />

      <div
        className={`fixed top-0 left-0 w-full h-full z-50 transition-transform duration-300 ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div
          className="w-full h-full absolute top-0 left-0 right-0 bottom-0 backdrop-blur-md"
          onClick={() => setNavOpen(false)}
        />

        <div className="relative w-2/3">
          <Sidebar />
        </div>

        <span
          className="absolute top-[50%] right-5 text-gray-300 rotate-90"
          onClick={() => setNavOpen(false)}>
          Press to close
        </span>
      </div>

      <main>{children}</main>
    </>
  );
}
