import ReturnView from "@/components/ui/return-view";
import axios from "axios";

export default async function Page() {
  const validation = await axios.get(
    "https://d1r891fk-3000.eun1.devtunnels.ms/notify",
  );
  const data = validation.data;

  return (
    <div className="flex-1 flex flex-col min-h-[75dvh]">
      <div className="flex-1 flex justify-center-safe items-center-safe px-4">
        <ReturnView paymentStatus={data.message} />
      </div>
    </div>
  );
}
