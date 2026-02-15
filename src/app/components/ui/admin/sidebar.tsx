"use client";

import Image from "next/image";
import blackLogo from "../../../../../public/logos/Liphiwe_business_logo_black.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  { name: "Dashboard", href: "/admin" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Products", href: "/admin/products" },
  { name: "Customers", href: "/admin/customers" },
  { name: "Orders", href: "/admin/orders" },
  // { name: "Settings", href: "/admin/settings" },
];

export default function Sidebar() {
  const pathName = usePathname();

  return (
    <div className="flex flex-col items-center-safe w-full h-dvh bg-gray-100 absolute top-0 left-0 p-5 gap-6 border-r border-gray-300">
      <div className="w-full">
        <Link href={"/admin"} className="w-full">
          <Image
            src={blackLogo}
            alt={"business-logo"}
            width={100}
            className="h-auto place-self-center-safe"
          />
        </Link>
      </div>

      <div className="flex-1 w-full">
        <nav className="overflow-y-auto">
          <ol>
            {adminLinks.map((link, index) => (
              <li key={index} className="p-3">
                <Link
                  href={link.href}
                  className={`${pathName === link.href && "text-gray-400"}`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div>
        <Link
          href={"/"}
          className="w-full"
          target="_blank"
          rel="noopener noreferrer">
          <button className="btn w-full">Go to shop</button>
        </Link>
      </div>

      <div className="w-full">
        <div className="w-full p-2 border-t border-gray-300">
          sidebar footer
        </div>
      </div>
    </div>
  );
}
