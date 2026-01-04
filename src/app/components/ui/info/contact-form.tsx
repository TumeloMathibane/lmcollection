export default function ContactForm() {
  return (
    <form className="flex flex-col space-y-3 items-center-safe w-full">
      <input
        type="text"
        name="customer-name"
        id="customer-name"
        placeholder="Full name..."
        className="input input-sm md:input-lg xl:input-md w-full"
      />
      <div className="flex gap-4 w-full">
        <input
          type="text"
          name="customer-name"
          id="customer-cellphone"
          placeholder="Cellphone..."
          className="input input-sm md:input-lg xl:input-md w-4/8"
        />
        <div className="divide-y text-stone-400 text-xs md:text-[14pt] self-center">
          or
        </div>
        <input
          type="email"
          name="customer-email"
          id="customer-email"
          placeholder="Email..."
          className="input input-sm md:input-lg xl:input-md w-full"
        />
      </div>
      <textarea
        name="customer-comment"
        id="customer-comment"
        placeholder="Comment..."
        className="textarea textarea-md md:textarea-md w-full"
      />
      <button className="btn my-5">Submit</button>
    </form>
  );
}
