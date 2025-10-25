import welcomeBizLogo from "../../../public/emblems/Liphiwe_business_emblem_black.png";
import ProductList from "../components/ProductList";
import Categories from "../components/Categories";
import Image from "next/image";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function Home() {
  const products = await fetchQuery(api.products.get, { count: 5 });

  return (
    <div className="font-sans flex justify-center min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em]">
      <main className="container space-y-10">
        <section className="w-full min-h-[16em] lg:min-h-screen bg-[url('/images/ali-pazani-3w14X-Yxffk-unsplash.jpg')] bg-cover bg-no-repeat flex items-center-safe justify-around mask-alpha mask-b-from-70% md:mask-b-from-80% lg:mask-l-from-90% lg:mask-r-from-90%">
          <Link
            href="#categories"
            className="btn px-4 py-2 md:px-6 md:py-3 bg-stone-900/50 border border-white rounded-md w-fit h-fit text-white z-100"
          >
            Shop now
          </Link>
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
          className="space-y-8 py-4 md:px-2 md:py-8 md:place-self-center-safe lg:w-[70%] lg:flex flex-col lg:place-self-center-safe"
        >
          <div>
            <p className="text-5xl text-stone-950 font-bold text-center">
              Categories
            </p>
          </div>
          <div className="px-2 md:px-0">
            <Categories />
          </div>
        </section>

        <section className="w-full p-2 mb-10 space-y-5 lg:w-[70%] lg:flex flex-col lg:place-self-center">
          <p className="text-2xl font-bold text-stone-950">
            Products of interest
          </p>
          <div>
            <ProductList products={products} />
          </div>
        </section>
      </main>
    </div>
  );
}

/// TODO: ...continue search component implementation...
//! TODO: ...continue search component implementation; and convert all data retreivals to be from the database and not the file...
//! TODO: Implement a search input components that is different from the traditional input element...
//! TODO: Implement search logic
//! TODO: Implement admin page and components... 📌
//! TODO: For scollable elements/components, have the movable cursor for scrolling through element/component...
//! ----  [above] possible change to select element...
//! TODO: Implement review feature
//! TODO: Implement pages with dynamic routes to have dynamic metadata...
//!
//! TODO: Implement contact page logic
//! TODO: In page components, move all uninteractive elements to server file (page.tsx)...
//!
//! ==================================================
//!
//! TODO: Change ProductList component to ui component 📌
//! NOTE: Construct a placeholder image so that it is hosted locally in the app
//! NOTE: Implement way of storing user info as they input it, and load it in relevent inputs on page reload...
