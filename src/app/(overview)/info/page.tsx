import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Info",
};

export default function Policies() {
  return (
    <main className="min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em]">
      <p>Info page; consists of About, Policy, & Contact page</p>
    </main>
  );
}
