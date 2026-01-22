import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "Our website is coming soon. Stay tuned for updates!",
};

export default async function Home() {
  return (
    <div className="flex-1">
      <div className="absolute top-0 right-0 bottom-0 left-0 backdrop-blur-sm backdrop-brightness-70">
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="items-center-safe place-self-center-safe text-white text-2xl md:text-7xl font-extrabold">
            LM Collection
          </h1>
          <div className="border-t border-white w-full mb-10" />

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Coming Soon
          </h2>

          <p className="text-md md:text-2xl text-white max-w-2xl">
            We are working hard to bring you an amazing experience. Stay tuned
            for updates and be the first to know when we launch!
          </p>
        </div>
      </div>
    </div>
  );
}
