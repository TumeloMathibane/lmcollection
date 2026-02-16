export function ProductViewSkeleton() {
  return (
    <main className="w-full flex-1 p-2 space-y-2 sm:max-w-lg sm:place-self-center-safe md:max-w-4xl xl:py-10 animate-pulse">
      <div className="w-full space-y-2 place-self-center-safe md:w-full md:space-x-4 xl:space-x-6 lg:flex">
        <section className="space-y-2 w-full">
          {/* image */}
          <div className="rounded-2xl bg-stone-200 h-60 md:h-80 md:w-full lg:w-full xl:size-100" />
          {/* category */}
          <div className="bg-stone-200 px-4 w-1/4 h-6 rounded-full" />
        </section>

        <section className="space-y-2 md:space-y-4 md:w-full">
          {/* product name */}
          <div className="w-60 h-10 bg-stone-200 rounded-full" />

          <div className="flex justify-between">
            {/* stock status */}
            <div className="w-1/7 h-7 bg-stone-200 rounded-full" />
            {/* product price */}
            <div className="w-1/7 h-7 bg-stone-200 rounded-full" />
          </div>

          <div className="flex flex-col justify-between text-lg space-y-4 space-x-3 overflow-auto">
            <div className="item-quantity flex flex-col gap-2">
              {/* product quantity */}
              <div className="bg-stone-200 w-1/7 h-4 rounded-full" />
              <div className="bg-stone-200 w-5/7 h-10 rounded-full" />
            </div>

            <div className="gap-2 flex flex-col">
              {/* product size */}
              <div className="w-1/7 h-4 bg-stone-200 rounded-full" />

              <div className="flex gap-2">
                <div className="w-10 h-10 bg-stone-200 rounded-full" />
                <div className="w-10 h-10 bg-stone-200 rounded-full" />
                <div className="w-10 h-10 bg-stone-200 rounded-full" />
                <div className="w-10 h-10 bg-stone-200 rounded-full" />
                <div className="w-10 h-10 bg-stone-200 rounded-full" />
              </div>
            </div>
          </div>

          {/* product description */}
          <div className="border border-stone-200 rounded-xl p-3 space-y-2">
            <div className="w-1/4 h-7 bg-stone-200 rounded-full" />
            <div className="w-full border-b border-stone-200" />
            <div className="w-full h-4 bg-stone-200 rounded-full" />
            <div className="w-4/9 h-4 bg-stone-200 rounded-full" />
            <div className="w-5/7 h-4 bg-stone-200 rounded-full" />
          </div>
        </section>
      </div>

      <section className="w-full flex place-self-center-safe space-x-2 py-2 md:w-[70%] lg:w-full lg:py-0">
        {/* add to cart button */}
        <div className="bg-stone-200 w-full h-9 rounded-full lg:w-[45%]" />
        {/* add to favorites button */}
        <div className="w-9 h-9 rounded-full bg-stone-200" />
      </section>
    </main>
  );
}
