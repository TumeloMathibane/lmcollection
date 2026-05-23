'use client';

import { FaWhatsappSquare } from "react-icons/fa";

export default function WhatsappBtn({message}: {message?: string}) {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER; // Include country code, no "+" or "-"

  const handleSend = () => {
    // URL encode the message to handle spaces and special characters
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message!)}`;
    window.open(url, "_blank");
    // console.log(message);
  };

  return (
    <button
      onClick={handleSend}
      className="p-1 border border-[#25D366] rounded-sm text-stone-800 hover:cursor-pointer flex justify-center items-center-safe space-x-4"
    >
      <FaWhatsappSquare size={"2em"} color="#25D366" />

      <span className="font-extrabold">Checkout to WhatsApp</span>
    </button>
  );
}
