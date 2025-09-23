"use client";

import { navlinks } from "@/constants/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* desktop nav */}
      <nav className="hidden md:flex sticky top-0 z-50 bg-white w-full py-1 justify-center-safe space-x-5">
        {navlinks.map(({ name, href }, key) => (
          <Link
            key={key}
            href={href}
            className={`font-semibold text-stone-600 ${pathname === href && "text-stone-950 underline decoration-2 underline-offset-2"} ${pathname !== href && "hover:underline hover:underline-offset-3"}`}
          >
            {name}
          </Link>
        ))}
      </nav>
    </>
  );
}
