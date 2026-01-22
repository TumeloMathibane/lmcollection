import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
};

export default function About() {
  return (
<<<<<<< HEAD
    <main className="container place-self-center-safe flex-1 p-4 md:flex md:justify-center-safe">
      <div className="space-y-4 md:py-10 lg:max-w-[70%]">
=======
    <main className="min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em] space-y-3 md:space-y-5 p-2 mb-5 md:m-0 md:flex md:flex-col md:justify-center-safe md:align-middle xl:w-[70%] xl:place-self-center-safe xl:py-10 xl:px-40">
      <div className="space-y-4">
>>>>>>> parent of 37aaa6e (Commit all necessary edits in the store pages)
        <h1 className="text-4xl font-bold text-stone-900 text-center">
          About us - LM Collection
        </h1>
        <div className="text-justify space-y-3 md:text-center md:space-y-5">
          <p>
            Welcome to <strong>LM COLLECTION</strong> — your one-stop
            destination for quality products at prices that make sense.
            We&apos;re a proudly local business committed to bringing you the
            best in beauty, fashion, and tech without the premium price tag. At
            LM COLLECTION, we specialize in{" "}
            <em>luxury and everyday essentials</em> — from{" "}
            <em className="font-semibold">
              stunning hair extensions, stylish branded and non-branded
              clothing, trendy sneakers, to iPhones (both brand new and
              pre-owned)
            </em>{" "}
            that are carefully checked to ensure excellent condition.
          </p>
          <p>
            <em className="font-semibold">What sets us apart?</em> Every product
            we sell is handpicked for <em>quality, reliability, and value</em>.
            Whether you&apos;re upgrading your phone, stepping out in style, or
            looking for top-tier hair, we make sure you get premium products
            without overpaying. We believe everyone deserves to look and feel
            good, and we&apos;ve built <strong>LM COLLECTION</strong> around
            making that possible — one order at a time. Thank you for supporting
            our small business.
          </p>{" "}
          <p className="font-semibold italic text-stone-800">
            Your trust keeps us growing, and we can&apos;t wait to serve you
            again!
          </p>
        </div>
      </div>
    </main>
  );
}
