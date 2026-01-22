"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { BiSearch, BiMenu } from "react-icons/bi";

export default function Banner({ navOpen }: { navOpen: () => void }) {
  const [bannerTitle, setBannerTitle] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") {
      setBannerTitle("dashboard");
    } else {
      setBannerTitle(pathname.split("/")[2]);
    }
  }, [pathname]);

  return (
    <div className="flex items-center-safe justify-between p-4">
      <BiMenu size={"1.5em"} onClick={navOpen} />

      <h1 className="text-3xl font-bold capitalize">{bannerTitle}</h1>

      <div>
        {/* search functionality; additional component will be added... */}
        <BiSearch size={"1.5em"} />
      </div>
    </div>
  );
}
