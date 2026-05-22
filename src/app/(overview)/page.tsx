import welcomeBizLogo from "../../../public/emblems/Liphiwe_business_emblem_black.png";
import ProductList from "../components/product-list";
import Categories from "../components/categories";
import Image from "next/image";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Product } from "./collection/products/types";
import { BsTruck, BsTelephone } from "react-icons/bs";
import { GoPackageDependencies } from "react-icons/go";
import { SlBadge } from "react-icons/sl";

export default async function Home() {
  let products: Product[] | undefined;

  try {
    products = await fetchQuery(api.products.getProducts, {
      count: 5,
    });
  } catch (err) {
    console.error("Error fetching products for homepage:", err);
  }

  return (
    <div className="flex-1 font-sans flex justify-center">
      <main className="w-full space-y-10 flex flex-col place-content-center-safe">
        <section className="bg-[url('/images/ali-pazani-3w14X-Yxffk-unsplash.jpg')] bg-cover bg-no-repeat grayscale-100 h-screen flex items-center-safe justify-around mask-alpha mask-b-from-70% relative md:mask-b-from-80% md:h-[92vh] md:bg-fill lg:min-h-screen">
          <div className="w-full h-full p-4 space-y-4 flex flex-col justify-center-safe sm:px-15 md:items-center-safe">
            <p className="text-5xl font-serif font-extrabold text-wrap max-w-sm md:hidden">
              Like it, Love it, & Wear it
            </p>

            <Link
              href="#categories"
              className="px-6 py-3 bg-stone-600/80 border w-fit h-fit text-xl font-bold border-white text-white">
              Shop now
            </Link>
          </div>
        </section>

        {/*//* NOTE: possible special effects to be implemented; animate-on-scroll */}
        <section className="flex flex-col justify-center-safe items-center-safe h-[50dvh] space-y-5 lg:h-[70dvh]">
          <p className="section-title text-center font-bold text-4xl">
            Welcome to
          </p>
          <div className="welcome-section-logo">
            <div className="w-70 h-fit relative">
              <Image
                src={welcomeBizLogo}
                alt="welcome-image"
                width={500}
                placeholder="blur"
              />
            </div>
          </div>
          <div className="welcome-section-text px-2 sm:px-15 md:max-w-4xl lg:mt-5">
            <p className="text-justify md:text-center">
              Whether you&apos;re upgrading your phone, stepping out in style,
              or looking for top-tier hair, we make sure you get premium
              products without overpaying. We believe everyone deserves to look
              and feel good, and we&apos;ve built LM COLLECTION around making
              that possible — one order at a time.
            </p>
          </div>
        </section>

        <section
          id="categories"
          className="space-y-4 py-4 md:py-10 flex flex-col justify-center-safe items-center-safe">
          <div>
            {/* //* NOTE: thinking of changing this heading to 'Collections' instead... */}
            <p className="text-4xl text-stone-950 font-bold">Categories</p>
          </div>

          <div className="px-2 sm:px-15 md:max-w-4xl">
            <Categories />
          </div>
        </section>

        <section className="p-2 space-y-4">
          <div className="sm:px-15">
            <div className="space-y-2 mx-auto md:max-w-3xl">
              <p className="text-2xl font-bold text-stone-950">
                Products of interest
              </p>

              {!products || products?.length === 0 ?
                <p className="font-light text-xl italic">
                  Products not available
                </p>
              : <ProductList products={products} />}
            </div>
          </div>
        </section>

        <section className="bg-stone-200 border-t border-stone-300 py-4 place-items-center-safe">
          <div className="flex flex-col place-items-center-safe space-y-5">
            <p className="font-bold text-2xl text-stone-950">Benefits</p>

            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-10 lg:flex lg:flex-row lg:py-10">
              <div className="py-2 w-full flex flex-col items-center-safe">
                <SlBadge size={"5em"} />
                <p className="text-center">Quality products</p>
              </div>

              <div className="py-2 w-full flex flex-col items-center-safe">
                <BsTruck size={"5em"} />
                <p className="text-center">In-time delivery</p>
              </div>

              <div className="py-2 w-full flex flex-col items-center-safe">
                <BsTelephone size={"5em"} />
                <p className="text-center">Great customer service</p>
              </div>

              <div className="py-2 w-full flex flex-col items-center-safe">
                <GoPackageDependencies size={"5em"} />
                <p className="text-center">Easy returns</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export const dynamic = "force-dynamic";
