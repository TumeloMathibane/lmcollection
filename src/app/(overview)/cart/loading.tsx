import { BiLoaderAlt } from "react-icons/bi";

export default function Loading() {
  return (
    <div className="flex-1 flex justify-around items-center-safe">
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
