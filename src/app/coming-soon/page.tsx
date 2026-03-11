import Image from "next/image";
import whiteLogo from "../../../public/logos/Liphiwe_business_logo_white.png";
// import blackLogo from "../../../public/logos/Liphiwe_business_logo_black.png";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col bg-[url('/images/ali-pazani-3w14X-Yxffk-unsplash.jpg')] bg-cover bg-no-repeat grayscale-100 h-screen">
      <header className="z-5">
        <div className="flex justify-center items-center-safe px-5 w-full pt-5">
          <Image
            src={whiteLogo}
            alt="lmcollection-logo"
            width={500}
            height={500}
            className="w-15 h-auto brightness-90 md:w-20 lg:w-15"
            priority={false}
          />
        </div>
      </header>

      <main className="flex-1 flex">
        <div className="absolute top-0 right-0 bottom-0 left-0 backdrop-brightness-50 backdrop-blur-[2px] z-3" />

        <div className="h-[90vh] w-[60%] z-3 flex flex-col justify-center mx-4 md:w-[40%] md:mx-8 lg:w-full lg:h-[80vh] lg:items-center">
          <p className="text-5xl font-extrabold text-stone-200 text-center text-wrap uppercase font-serif md:text-7xl lg:text-5xl">
            coming soon
          </p>

          <div className="w-full flex items-center-safe space-x-2 lg:w-[26%]">
            <div className="border-b border-white w-full" />
            <p className="text-md text-stone-200 text-nowrap md:text-2xl">
              stay tuned
            </p>
            <div className="border-b border-white w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}
