import type { CartItem } from "../../../../stores/types";
import ImageWithFallback from "../../image-with-fallback";

type ItemCardProp = {
  item: CartItem;
};

export default function ItemCard({ item }: ItemCardProp) {
  return (
    <div className="flex space-x-4">
      <div className="img relative">
        <div className="w-20 h-20 xl:w-15 xl:h-15 overflow-hidden rounded-lg shadow-md">
          <ImageWithFallback src={item.productImage} alt={item.productName} />
        </div>
        <span className="absolute -top-2 -right-2 bg-stone-800 text-stone-200 px-2 rounded-full">
          {item.productQty}
        </span>
      </div>
      <div className="info w-full">
        <div className="flex justify-between">
          <p className="font-bold xl:font-semibold">{item.productName}</p>
          <p className="text-sm self-center-safe">
            {new Intl.NumberFormat("en-ZA", {
              style: "currency",
              currency: "ZAR",
            }).format(item.productPrice * item.productQty)}
          </p>
        </div>
        {Object.keys(item.options).length > 0 &&
          Object.entries(item.options).map(([key, val]) => (
            <p key={key} className="text-stone-500 text-sm">
              {key}: {val.includes("=") ? val.split("=")[0] : val}
            </p>
          ))}
      </div>
    </div>
  );
}
