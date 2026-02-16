export default function ContactForm() {
  return (
    <form className="flex flex-col space-y-3 items-center-safe">
      <input
        type="text"
        name="customer-name"
        id="customer-name"
        placeholder="Full name..."
        className="w-full outline outline-stone-300 focus:outline-stone-500 focus:outline-2 rounded-sm px-3 py-2"
      />
      <div className="flex gap-4 w-full">
        <input
          type="text"
          name="customer-name"
          id="customer-cellphone"
          placeholder="Cellphone..."
          className="w-4/8 outline outline-stone-300 focus:outline-stone-500 focus:outline-2 rounded-sm px-3 py-2"
        />
        <div className="divide-y text-stone-400 text-xs md:text-[14pt] self-center">
          or
        </div>
        <input
          type="email"
          name="customer-email"
          id="customer-email"
          placeholder="Email..."
          className="w-full outline outline-stone-300 focus:outline-stone-500 focus:outline-2 rounded-sm px-3 py-2"
        />
      </div>
      <textarea
        name="customer-comment"
        id="customer-comment"
        placeholder="Comment..."
        className="w-full outline outline-stone-300 focus:outline-stone-500 focus:outline-2 rounded-sm px-3 py-2 h-32 resize-none"
      />
      <button className="btn my-5 px-10">Submit</button>
    </form>
  );
}
