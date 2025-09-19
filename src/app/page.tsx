import Link from "next/link";
import Categories from "./ui/Categories";
import ProductList from "./ui/products/ProductList";
import ImageWithFallback from "./ui/ImageWithFallback";

export default function Home() {
  return (
    <div className="font-sans flex justify-center min-h-fit">
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
              <ImageWithFallback
                src="/emblems/Liphiwe_business_emblem_black.svg"
                alt="welcome-image"
                fallbackSrc="https://placehold.jp/ffffff/595959/400x500.png?text=No%20Image&css=%7B%22border-radius%22%3A%2215px%22%2C%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23666666)%2C%20to(%23cccccc))%22%7D"
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
            <ProductList count={5} />
          </div>
        </section>
      </main>
    </div>
  );
}

//! TODO: Implement Cart & Checkout page
//! TODO: ...try the payment gateway after implementing some parts of the Checkout page; if possible
//! TODO: FIX the letter casing of the category fields in the db...
//! TODO: Implement review feature...
//!
//! ==================================================
//!
//! NOTE: Put pointer cursors to all relevent elements...
//! NOTE: Construct a placeholder image so that it is hosted locally in the app
