export default function Construction() {
  return (
    <main className="fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center-safe space-y-4 backdrop-blur-md backdrop-brightness-50 z-20 p-4">
      <div className="text-center lg:flex lg:space-x-4">
        <p className="text-white font-extrabold text-8xl lg:text-6xl">Under</p>
        <p className="text-white font-extrabold text-4xl lg:text-6xl">
          Construction
        </p>
      </div>

      {/* ...probably need to update DaisyUI for this to work */}
      {/* <span className="text-rotate duration-2000">
        <span className="text-white font-extrabold text-5xl justify-items-center">
          <p>Under</p>
          <p>Construction</p>
        </span>
      </span> */}

      <div className="flex flex-col text-stone-100 text-center space-y-4 lg:text-xl">
        <p>
          Please be patient as we build this store to be your one-stop shop.
        </p>

        <p className="text-sm font-extralight lg:text-xl">
          - LM Collection by Liphiwe Mzingelwa
        </p>
      </div>
    </main>
  );
}
