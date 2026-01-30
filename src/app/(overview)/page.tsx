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
  const products: Product[] = await fetchQuery(api.products.getProducts, {
    count: 5,
  });

  return (
    <div className="flex-1 font-sans flex justify-center">
      <main className="w-full space-y-10 flex flex-col place-content-center-safe">
        <section className="bg-[url('/images/ali-pazani-3w14X-Yxffk-unsplash.jpg')] bg-cover bg-no-repeat grayscale-100 h-screen flex items-center-safe justify-around mask-alpha mask-b-from-70% relative md:mask-b-from-80% md:h-[92vh] md:bg-fill lg:min-h-screen">
          <div className="w-full h-full p-4 space-y-4 flex flex-col justify-center-safe sm:px-15 md:items-center-safe">
            <p className="text-7xl font-serif font-extrabold text-wrap md:hidden">
              Like it, Love it, & Wear it
            </p>

            <Link
              href="#categories"
              className="btn px-6 py-3 bg-stone-900/50 border border-white rounded-md w-fit h-fit text-white text-xl z-100">
              Shop now
            </Link>
          </div>
        </section>

        <section className="flex flex-col items-center-safe space-y-5">
          <p className="section-title text-center font-bold text-4xl">
            Welcome to
          </p>
          <div className="welcome-section-logo">
            <div className="w-50 h-fit">
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

        <section id="categories" className="space-y-4 py-4">
          <div>
            <p className="text-4xl text-stone-950 font-bold text-center">
              Categories
            </p>
          </div>

          <div className="px-2 sm:px-15 md:max-w-4xl md:place-self-center-safe">
            <Categories />
          </div>
        </section>

        <section className="p-2 space-y-5">
          <div className="sm:px-15">
            <div className="space-y-4 md:max-w-3xl md:place-self-center-safe">
              <p className="text-2xl font-bold text-stone-950">
                Products of interest
              </p>

              {!products || products?.length === 0 ?
                <p className="font-light text-xl italic">
                  Products not available
                </p>
              : <div>
                  <ProductList products={products} />
                </div>
              }
            </div>
          </div>
        </section>

        <section className="bg-stone-200 border-y border-stone-300 py-4 justify-items-center-safe">
          <div className="justify-items-center-safe space-y-5">
            <p className="font-bold text-2xl text-stone-950">Benefits</p>

            <div className="w-full justify-items-center">
              <div className="flex flex-col md:grid md:grid-cols-2 md:gap-10 lg:flex lg:flex-row lg:py-10">
                <div className="py-2">
                  <SlBadge size={"5em"} className="place-self-center" />
                  <p className="text-center">Quality products</p>
                </div>

                <div className="py-2">
                  <BsTruck size={"5em"} className="place-self-center" />
                  <p className="text-center">In-time delivery</p>
                </div>

                <div className="py-2">
                  <BsTelephone size={"5em"} className="place-self-center" />
                  <p className="text-center">Great customer service</p>
                </div>

                <div className="py-2">
                  <GoPackageDependencies
                    size={"5em"}
                    className="place-self-center"
                  />
                  <p className="text-center">Easy returns</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

//! TODO: Continue with checks...
//! FIXME: Fix index page components' width...
//! TODO: Reconfigure the 'addItem' method in cart store to accept product object with relevent details
//! TODO: Implement contact page logic
//!
//! ==================================================
