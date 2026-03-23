import Return from "@/components/ui/return";

export default function Page() {
  const passphrase = process.env.PAYFAST_SALT_PASSPHRASE || "";

  return (
    <div className="flex-1 flex flex-col min-h-[75dvh]">
      <div className="flex-1 flex justify-center-safe items-center-safe px-4">
        <Return passphrase={passphrase} />
      </div>
    </div>
  );
}
