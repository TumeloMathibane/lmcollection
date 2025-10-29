export function CollectionSkeleton() {
  return (
    <main className="container place-self-center-safe p-2 space-y-4 xl:w-[70%] min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em]">
      <p className="text-4xl font-bold text-stone-900 text-center xl:text-6xl xl:py-2">
        Products
      </p>
      <p>This is the catalog page. ... products</p>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, index) => {
          return <ItemSkeleton key={index} />;
        })}
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
