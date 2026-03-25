import Return from "@/components/ui/return";

export default async function Page() {
  const passphrase = process.env.PAYFAST_SALT_PASSPHRASE || "";
  let checkStatus: boolean = false;
  let serverData: { [key: string]: string } = {};

  try {
    const response = await fetch(
      process.env.VERCEL_ENV === "production" ?
        `https://${process.env.VERCEL_URL}/notify`
      : "https://d1r891fk-4000.eun1.devtunnels.ms/notify",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Error fetching payment status: ${response.statusText}`);
    }
    const data = await response.json();

    let pfString: string = "";
    Object.entries(data.message).map(
      ([key, val]) =>
        key !== "signature" &&
        (pfString += `${key}=${encodeURIComponent(String(val).trim()).replace(/%20/g, "+")}&`),
    );
    if (pfString.endsWith("&")) {
      pfString = pfString.slice(0, -1);
    }
    if (passphrase) {
      pfString += `&passphrase=${encodeURIComponent(String(passphrase).trim()).replace(/%20/g, "+")}`;
    }

    // * CHECK 4: validate data through POST request to payfast server (server to server comms.)
    const paymentStatus = await fetch(
      "https://sandbox.payfast.co.za/eng/query/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: pfString,
      },
    );
    if (!paymentStatus.ok) {
      throw new Error(
        `Error validating payment status with Payfast server: ${paymentStatus.statusText}`,
      );
    }
    const check4 = (await paymentStatus.text()) === "VALID";

    checkStatus = check4;
    serverData = data.message;
    // console.log("Payment status check completed - ", {
    //   checkStatus,
    //   serverData,
    // });
  } catch (error) {
    console.error("Store Error - ", error);
  }

  return (
    <div className="flex-1 flex flex-col min-h-[75dvh]">
      <div className="flex-1 flex justify-center-safe items-center-safe px-4">
        <Return
          checkStatus={checkStatus}
          serverData={serverData}
          passphrase={passphrase}
        />
      </div>
    </div>
  );
}
