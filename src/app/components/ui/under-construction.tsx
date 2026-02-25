export default function Construction() {
  return (
    <main className="fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center-safe space-y-4 backdrop-blur-md backdrop-brightness-50 z-10">
      {/* <p className="text-white font-extrabold text-4xl">
        ⚠️🚨 Under Construction 🚨⚠️
      </p> */}

      <p className="text-white font-extrabold text-6xl">Under Construction</p>

      {/* ...probably need to update DaisyUI for this to work */}
      {/* <span className="text-rotate duration-2000">
        <span className="text-white font-extrabold text-5xl justify-items-center">
          <p>Under</p>
          <p>Construction</p>
        </span>
      </span> */}

      <div className="flex flex-col text-stone-100">
        <p>
          Please be patient as we build this store to be your one-stop shop.
        </p>

        <p className="text-center text-sm font-extralight">
          - LM Collection by Liphiwe Mzingelwa
        </p>
      </div>
    </main>
  );
}
