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
      <main className="space-y-10 flex flex-col place-content-center-safe">
        <section className="bg-[url('/images/ali-pazani-3w14X-Yxffk-unsplash.jpg')] bg-cover bg-no-repeat min-h-screen relative md:min-h-[92vh] md:bg-fill lg:min-h-screen mask-alpha mask-b-from-70% md:mask-b-from-80% sm:mask-l-from-90% sm:mask-r-from-90%">
          <div className="absolute top-0 bottom-0 left-0 right-0 backdrop-grayscale-100" />
          <div className="h-full flex flex-col justify-center space-y-5 px-7">
            <p className="text-6xl font-extrabold font-serif text-stone-900">
              Like it, Love it, & Wear it.
            </p>
            <Link
              href="#categories"
              className="btn px-7 py-3 bg-stone-900/50 border border-white rounded-md w-fit h-fit text-white text-lg z-50">
              Shop now
            </Link>
          </div>
        </section>

        <section className="md:py-5 lg:w-[70%] lg:place-self-center-safe place-items-center space-y-5">
          <p className="section-title text-center font-bold text-4xl">
            Welcome to
          </p>
          <div className="welcome-section-logo">
            <div className="size-50 h-fit">
              <Image
                src={welcomeBizLogo}
                alt="welcome-image"
                width={500}
                placeholder="blur"
              />
            </div>
          </div>
          <div className="welcome-section-text px-2">
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
          className="space-y-8 py-4 md:px-2 md:py-8 md:place-self-center-safe lg:w-[70%] lg:flex flex-col lg:place-self-center-safe">
          <div>
            <p className="text-5xl text-stone-950 font-bold text-center">
              Categories
            </p>
          </div>
          <div className="px-2 md:max-w-[70%] md:place-self-center-safe">
            <Categories />
          </div>
        </section>

        <section className="p-2 mb-10 space-y-5">
          <div className="md:min-w-[70%] md:place-self-center-safe">
            <div>
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

        <section className="bg-stone-200 border-y border-stone-300 py-4 justify-items-center-safe mt-20">
          <div className="justify-items-center-safe space-y-5 w-sm md:w-2xl">
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
//! TODO: Reconfigure the 'addItem' method in cart store to accept product object with relevent details
//! TODO: Implement contact page logic
//!
//! ==================================================
