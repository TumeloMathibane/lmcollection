export default function ContactForm() {
  return (
    <form className="flex flex-col space-y-3 items-center-safe w-full">
      <input
        type="text"
        name="customer-name"
        id="customer-name"
        placeholder="Name & surname..."
        className="input input-sm md:input-lg xl:input-md"
      />
      <input
        type="text"
        name="customer-name"
        id="customer-cellphone"
        placeholder="Cellphone..."
        className="input input-sm md:input-lg xl:input-md"
      />
      <div className="divider text-stone-400 w-[80%] self-center">OR</div>
      <input
        type="email"
        name="customer-email"
        id="customer-email"
        placeholder="Email..."
        className="input input-sm md:input-lg xl:input-md"
      />
      <textarea
        name="customer-comment"
        id="customer-comment"
        placeholder="Comment..."
        className="textarea textarea-md md:textarea-md"
      />
      <button className="btn">Submit</button>
    </form>
  );
}
