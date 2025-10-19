import { BiLoaderAlt } from "react-icons/bi";

export default function Loading() {
  return (
    <div className="min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em] flex justify-around items-center-safe">
      <div className="space-y-3 md:space-y-5 flex flex-col items-center-safe xl:w-[80%]">
        <p className="text-2xl text-stone-900 text-center font-bold md:text-4xl">
          <BiLoaderAlt
            size={"2em"}
            className="inline-block self-center-safe origin-center animate-spin"
          />{" "}
          Loading cart
        </p>
      </div>
    </div>
  );
}
