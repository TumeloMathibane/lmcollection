export default function ProductListSkeleton() {
  return (
    <div className="w-48 h-60 md:w-60 lg:w-full bg-stone-50 shadow-sm md:shadow-md rounded-xl overflow-hidden relative flex flex-col">
      <div className="bg-stone-200 h-5/7 animate-pulse" />
      <div className="w-full space-y-2 p-3">
        <div className="bg-stone-200 rounded-full w-full h-5 animate-pulse" />
        <div className="bg-stone-200 rounded-full w-1/3 h-5 animate-pulse" />
      </div>
    </div>
  );
}
