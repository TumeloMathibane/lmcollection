"use client";

export default function CheckoutSkeleton() {
  return (
    <>
      <div className="bg-stone-100 border-b border-stone-300 lg:hidden">
        <div className="h-12 w-full flex justify-between items-center-safe place-self-center-safe px-4 md:max-w-[760px]">
          <div className="h-3 w-12 bg-stone-200 rounded-lg" />
          <div className="h-5 w-15 bg-stone-200 rounded-lg" />
        </div>
      </div>

      <div className="lg:flex lg:divide-x divide-stone-300 lg:h-[618px]">
        <div className="lg:w-1/2 lg:h-full">
          <div>
            <div className="space-y-2 divide-y divide-stone-300 px-4 md:max-w-[760px] md:mx-auto lg:max-w-[550px] lg:p-10 lg:mx-0 lg:ml-auto">
              <div className="space-y-2 py-3">
                <div className="bg-stone-200 h-3 w-16 rounded-full" />
                <div className="space-y-2 sm:flex sm:space-x-2">
                  <div className="bg-stone-200 h-7 w-full rounded-lg" />
                  <div className="bg-stone-200 h-7 w-full rounded-lg" />
                </div>
                <div className="bg-stone-200 h-7 w-full rounded-lg" />
                <div className="space-y-2">
                  <div className="bg-stone-200 h-3 w-25 rounded-full" />
                  <div className="bg-stone-200 h-7 w-full rounded-lg" />
                </div>
              </div>

              <div className="space-y-2 py-3">
                <div className="h-3 w-12 bg-stone-200 rounded-full" />
                <div className="h-30 w-full bg-stone-200 rounded-lg" />
              </div>

              <div className="flex space-x-2 py-3 lg:hidden">
                <div className="h-15 w-15 bg-stone-200 rounded-lg" />
                <div className="w-full">
                  <div className="flex justify-between items-center-safe">
                    <div className="h-3 w-24 bg-stone-200 rounded-full" />
                    <div className="h-5 w-15 bg-stone-200 rounded-lg" />
                  </div>
                  <div className="h-3 w-10 bg-stone-200 rounded-full" />
                </div>
              </div>

              <div className="space-y-2 py-3 lg:hidden">
                <div className="flex justify-between">
                  <div className="h-3 w-10 bg-stone-200 rounded-full" />
                  <div className="h-3 w-10 bg-stone-200 rounded-full" />
                </div>

                <div className="flex justify-between">
                  <div className="h-3 w-12 bg-stone-200 rounded-full" />
                  <div className="h-3 w-10 bg-stone-200 rounded-full" />
                </div>

                <div className="flex justify-between">
                  <div className="h-4 w-10 bg-stone-200 rounded-full" />
                  <div className="h-4 w-14 bg-stone-200 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/2 lg:h-full lg:bg-stone-200">
          <div>
            <div className="lg:p-10 lg:max-w-[550px]">
              <div className="flex space-x-2 py-3">
                <div className="h-15 w-15 bg-stone-300 rounded-lg" />
                <div className="w-full">
                  <div className="flex justify-between items-center-safe">
                    <div className="h-3 w-24 bg-stone-300 rounded-full" />
                    <div className="h-5 w-15 bg-stone-300 rounded-lg" />
                  </div>
                  <div className="h-3 w-10 bg-stone-300 rounded-full" />
                </div>
              </div>

              <div className="space-y-2 py-3">
                <div className="flex justify-between">
                  <div className="h-3 w-10 bg-stone-300 rounded-full" />
                  <div className="h-3 w-10 bg-stone-300 rounded-full" />
                </div>

                <div className="flex justify-between">
                  <div className="h-3 w-12 bg-stone-300 rounded-full" />
                  <div className="h-3 w-10 bg-stone-300 rounded-full" />
                </div>

                <div className="flex justify-between">
                  <div className="h-4 w-10 bg-stone-300 rounded-full" />
                  <div className="h-4 w-14 bg-stone-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
