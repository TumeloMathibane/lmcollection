import ContactForm from "@/components/ui/info/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us",
};

export default function Contact() {
  return (
    <main className="flex-1 p-2 space-y-3 pt-5">
      <div className="w-full h-full space-y-5">
        <h1 className="text-4xl font-bold text-stone-900 text-center">
          Contact us
        </h1>

        <div className="md:max-w-[70%] md:place-self-center">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
