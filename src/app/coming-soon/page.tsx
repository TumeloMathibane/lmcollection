"use client";

import Image from "next/image";
import whiteLogo from "../../../public/logos/Liphiwe_business_logo_white.png";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // const launchDate = new Date(`${process.env.NEXT_PUBLIC_LAUNCH_DATE}`);
    // const timer = setInterval(() => {
    //   const now = new Date();
    //   const difference = launchDate.getTime() - now.getTime();

    //   if (difference > 0) {
    //     const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    //     const hours = Math.floor(
    //       (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    //     );
    //     const minutes = Math.floor(
    //       (difference % (1000 * 60 * 60)) / (1000 * 60),
    //     );
    //     const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    //     // Format the countdown string so that if the value is 0 remove the suffix; remove hour suffix if hours is 0 and days is 0, etc.
    //     const formattedDays = days > 0 ? `${days}d ` : "";
    //     const formattedHours = hours > 0 ? `${hours}h ` : "";
    //     const formattedMinutes = minutes > 0 ? `${minutes}m ` : "";

    //     setTimeLeft(
    //       `${formattedDays}${formattedHours}${formattedMinutes}${seconds}s`,
    //     );
    //   } else {
    //     setTimeLeft("Launched!");
    //     clearInterval(timer);
    //   }
    // }, 1000);

    // return () => clearInterval(timer);

    setTimeLeft("");
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[url('/images/ali-pazani-3w14X-Yxffk-unsplash.jpg')] bg-cover bg-no-repeat h-screen">
      <header className="z-5">
        <div className="flex justify-center items-center-safe px-5 w-full pt-5">
          <Link href="/" prefetch={false}>
            <Image
              src={whiteLogo}
              alt="lmcollection-logo"
              width={500}
              height={500}
              className="w-15 h-auto brightness-90 md:w-20 lg:w-15"
              priority={false}
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex">
        <div className="absolute top-0 right-0 bottom-0 left-0 min-h-dvh backdrop-brightness-50 backdrop-blur-[2px] z-3 grayscale-100" />

        <div className="h-[90vh] w-[60%] z-3 flex flex-col justify-center mx-4 md:w-[40%] md:mx-8 lg:w-full lg:h-[80vh] lg:items-center">
          <p className="text-5xl font-extrabold text-stone-400 text-center text-wrap uppercase font-serif md:text-7xl lg:text-5xl">
            coming soon
          </p>

          <div className="w-full flex items-center-safe space-x-2 lg:w-[26%]">
            <div className="border-b border-stone-400 w-full" />
            <p className="text-md text-white text-nowrap md:text-2xl">
              stay tuned
            </p>
            <div className="border-b border-stone-400 w-full" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-stone-200 text-center">{timeLeft}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
