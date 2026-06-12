"use client";

export default function ComingSoon() {
  const isOpen = process.env.NEXT_PUBLIC_LAUNCH_DATE
    ? Date.now() > new Date(`${process.env.NEXT_PUBLIC_LAUNCH_DATE}`).getTime()
    : false;

  if (isOpen) return null;
  else {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
    setTimeout(() => {
      window.location.href = "/coming-soon";
    }, 3000);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center dark:bg-black bg-white bg-opacity-50 z-50 scrollbar-hidden bg-[url('/images/ali-pazani-3w14X-Yxffk-unsplash.jpg')] bg-cover bg-no-repeat">
      <div className="absolute top-0 right-0 bottom-0 left-0 min-h-dvh backdrop-brightness-50 backdrop-blur-[2px] grayscale-100" />

      <div className="text-center w-[90%] max-w-md dark:bg-white bg-black rounded-lg shadow-lg p-8 z-1">
        <div className="text-2xl lg:text-4xl font-bold flex items-center justify-center mb-4">
          <h2 className="me-2">Coming Soon</h2>
          <span className="animate-bounce [animation-delay:-0.3s] -mb-0.5">
            .
          </span>
          {/* <!-- Second Dot --> */}
          <span className="animate-bounce [animation-delay:-0.15s] -mb-0.5">
            .
          </span>
          {/* <!-- Third Dot --> */}
          <span className="animate-bounce -mb-0.5">.</span>
        </div>

        <p className="text-gray-400 text-xs">
          Our website is launching soon. Stay tuned!
        </p>
      </div>
    </div>
  );
}
