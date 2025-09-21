import ContactForm from "@/app/ui/info/ContactForm";

export default function Contact() {
  return (
    <main className="min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em] p-2 space-y-3">
      <h1 className="text-4xl font-bold text-stone-900 text-center">
        Contact us
      </h1>
      <div className="xl:w-[70%] place-items-center-safe">
        {/* <p>This is the Contact page</p> */}
        <ContactForm />
      </div>
    </main>
  );
}
