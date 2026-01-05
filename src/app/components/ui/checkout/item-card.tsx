import type { CartItem } from "../../../../stores/types";
import ImageWithFallback from "../../image-with-fallback";

type ItemCardProp = {
  item: CartItem;
};

export default function ItemCard({ item }: ItemCardProp) {
  return (
    <div className="flex space-x-4">
      <div className="img relative">
        <div className="size-15 xl:size-15 overflow-hidden rounded-lg shadow-md h-fit">
          <ImageWithFallback src={item.productImg} alt={item.productName} />
        </div>
        <span className="absolute -top-2 -right-2 bg-stone-800 text-stone-200 px-2 rounded-full z-auto">
          {item.productQty}
        </span>
      </div>
      <div className="info w-full">
        <div className="flex justify-between">
          <p className="font-bold xl:font-semibold">{item.productName}</p>
          <p className="before:content-['R'] before:mr-1 text-sm self-center-safe">
            {(item.productPrice * item.productQty).toFixed(2)}
          </p>
        </div>
        <p className="text-stone-500 text-sm">Size: {item.productSize}</p>
      </div>
    </div>
  );
}
