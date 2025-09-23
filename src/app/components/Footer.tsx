import { navlinks } from "@/constants/links";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logos/Liphiwe_business_logo_white.svg";

export default function Footer() {
  return (
    <section className="bg-stone-950 w-full flex p-10 justify-evenly">
      <Link
        href="/"
        className="hidden md:flex footer-logo size-30 items-center-safe"
      >
        <Image src={logo} alt="footer-logo" width={500} height={500} />
      </Link>
      <div className="flex flex-col">
        <p className="text-white font-semibold">Quick links</p>
        {navlinks.map(
          ({ name, href }, key) =>
            name !== "Policies" && (
              <Link key={key} href={href} className="text-stone-400">
                {name}
              </Link>
            )
        )}
      </div>
      <div>
        {navlinks.map(
          ({ name, href, sublinks }, key) =>
            name === "Policies" && (
              <div key={key} className="flex flex-col">
                <Link
                  key={key}
                  href={href}
                  className="text-white font-semibold"
                >
                  {name}
                </Link>
                {sublinks.map(({ name, href }, index) => (
                  <Link key={index} href={href} className="text-stone-400">
                    {name}
                  </Link>
                ))}
              </div>
            )
        )}
      </div>
    </section>
  );
}
