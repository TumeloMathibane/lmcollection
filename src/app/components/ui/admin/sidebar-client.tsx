"use client";

import Banner from "@/components/ui/admin/banner";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Sidebar from "./sidebar";

export default function AdminSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { status } = useSession();

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
    <main className="flex h-screen w-screen relative">
      {status === "loading" && (
        <div className="absolute top-0 bottom-0 left-0 right-0 backdrop-blur-md flex items-center justify-center z-10">
          <div className="h-screen w-screen flex bg-stone-300/20" />
        </div>
      )}

      <aside
        className={`min-h-dvh w-full absolute top-0 bottom-0 left-0 flex z-5 transition-all ${navOpen ? "translate-0" : "-translate-x-full"} lg:relative lg:translate-0 lg:w-fit lg:h-screen`}>
        <div className="h-full w-72 z-5">
          <Sidebar />
        </div>

        <div
          className={`absolute top-0 right-0 bottom-0 left-0 h-full z-4 transition-all ${navOpen ? "backdrop-blur-md backdrop-brightness-80" : "backdrop-blur-none"} lg:hidden`}
          onClick={() => setNavOpen(false)}
        />
      </aside>

      <section className="flex-1 flex flex-col w-full h-screen overflow-y-auto lg:h-dvh lg:overflow-auto">
        <Banner navOpen={() => setNavOpen(!navOpen)} />
        {children}
      </section>
    </main>
  );
}
