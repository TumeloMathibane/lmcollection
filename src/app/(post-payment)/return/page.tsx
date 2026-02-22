import ReturnView from "@/components/ui/return-view";

export default async function Page() {
  return (
    <div className="flex-1 flex flex-col min-h-[75dvh]">
      <div className="flex-1 flex justify-center-safe items-center-safe px-4">
        <ReturnView />
      </div>
    </div>
  );
}
