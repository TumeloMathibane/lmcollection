export function CollectionSkeleton() {
  return (
    <main className="flex-1 flex flex-col space-y-2 py-4 px-2 items-center-safe">
      <p className="text-4xl font-bold text-stone-900 text-center">Products</p>

      <div className="w-full max-w-[480px] sm:max-w-2xl lg:max-w-5xl">
        <div className="space-y-4">
          <div className="border-b border-stone-300 pb-3">
            <p>This is the catalog page. ... products</p>
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, index) => {
              return <ItemSkeleton key={index} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
function ItemSkeleton() {
  return (
    <div className="space-y-2">
      <div className="relative overflow-hidden rounded-md h-50 animate-pulse">
        <div className="w-full size-max bg-stone-200 h-full" />

        <div className="add-to-cart absolute top-0 left-0 right-0 w-full h-full" />
      </div>
      <div className="w-full h-17 flex flex-col animate-pulse space-y-1">
        <div className="bg-stone-200 w-2/7 h-3 rounded-full animate-pulse" />
        <div className="bg-stone-200 w-6/7 h-3 rounded-full animate-pulse" />
        <div className="bg-stone-200 w-3/7 h-3 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
