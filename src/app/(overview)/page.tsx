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

        <section className="flex flex-col items-center-safe space-y-5">
          <p className="section-title text-center font-bold text-4xl">
            Welcome to
          </p>
          <div className="welcome-section-logo">
            <div className="w-50 h-fit relative">
              <Image
                src={welcomeBizLogo}
                alt="welcome-image"
                width={500}
                placeholder="blur"
              />
            </div>
          </div>
          <div className="welcome-section-text px-2 sm:px-15 md:max-w-4xl">
            <p className="text-justify md:text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis molestias, perferendis praesentium sint culpa quos
              dolor, natus consequatur sed eaque qui facilis repellendus
              architecto libero a provident in! Saepe, eligendi. Error obcaecati
              laborum omnis, reiciendis velit est illum, vero voluptates soluta
              sit minima fuga sapiente rem accusantium quas repellat ab adipisci
              culpa et dolor quidem? Distinctio totam odio labore corrupti!
              Esse, vel labore rerum architecto voluptates dicta asperiores
              optio vitae repellat nulla, impedit inventore! Numquam odit
              explicabo optio ullam qui facilis, hic est ratione cupiditate,
              voluptatem, harum unde architecto. Voluptas?
            </p>
          </div>
        </section>

        <section
          id="categories"
          className="space-y-4 py-4 flex flex-col justify-center-safe items-center-safe">
          <div>
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

//! TODO  [*]: Continue with checks...
//! TODO  [ ]: Implement product filtering and sorting functionality on the collection page to allow customers to easily find products based on their preferences (e.g. filter by price, category, popularity, etc.)...
//! TODO  [ ]: Store 'collection/all' - add some elements from the collection view file to the server component (page.tsx) to reduce the amount of client components used in the collection page, and to improve performance by reducing the amount of client-side rendering required for the collection page...
//! TODO  [ ]: Implement contact page logic
//! TODO  [ ]: Admin 'add product form' - if possible, implement method to select primary image from selected images
//! TODO  [ ]: Admin 'sidebar' - add store name to the bottom of sidebar to make logged in user info visible
//! FIXME [ ]: Sort app components; components that manipulate data are to stay in components folder, and those that are only used for displaying the data must move to the subdir. of 'ui'
//!
//! ==================================================
