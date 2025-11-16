"use client";

import { useSearchParams } from "next/navigation";

export default function FormModal({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const action = searchParams.get("action");

  const isOpen = action === "add-product";

  return (
    <section
      className={`w-full h-full ${isOpen ? "absolute" : "hidden"} top-0 bottom-0 left-0 right-0 backdrop-blur-[3px] backdrop-brightness-70 flex place-items-center-safe justify-center-safe`}>
      {children}
    </section>
  );
}
