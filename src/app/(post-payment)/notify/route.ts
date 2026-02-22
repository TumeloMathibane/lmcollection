import { generatePaymentId } from "@/utils/helper";
import md5 from "md5";
import dns from "node:dns/promises";

let paymentValidation: string;

export async function POST(req: Request) {
  try {
    const response = await req.text();

    if (!response) {
      throw new Error(`Error: ${Response.error}`);
    }

    //* check no. 1: create object and string for signature verification
    const pfObject = Object.fromEntries(
      response
        .split("&")
        .map((i) =>
          i.split("=").map((j) => decodeURIComponent(j.replace(/\+/g, " "))),
        ),
    );
    let pfString = "";
    Object.entries(pfObject).map(
      ([key, value]) =>
        key !== "signature" &&
        (pfString += `${key}=${encodeURIComponent(String(value).trim()).replace(/%20/g, "+")}&`),
    );
    if (process.env.PAYGATE_SALT_PASSPHRASE) {
      pfString += `passphrase=${encodeURIComponent(String(process.env.PAYGATE_SALT_PASSPHRASE).trim()).replace(/%20/g, "+")}`;
    }
    if (pfString.endsWith("&")) {
      pfString = pfString.slice(0, -1);
    }
    const check_signature = md5(pfString) === pfObject.signature;

    //* check no. 2: dns lookup for verifying request is from payfast
    let check_host = false;
    const hostnames = [
      "www.payfast.co.za",
      "w1w.payfast.co.za",
      "w2w.payfast.co.za",
      "sandbox.payfast.co.za",
    ];
    for (const hostname of hostnames) {
      const addresses = await dns.resolve(hostname);
      if (addresses.includes(req.headers.get("x-forwarded-for") as string)) {
        check_host = true;
        break;
      }
    }

    //* check no. 3: verify gross amount, by checking paymentId, to see if customer is correctly invoiced
    const newPaymentId = generatePaymentId(
      pfObject["item_name"],
      Number(pfObject["amount_gross"]),
      process.env.PAYGATE_SALT_PASSPHRASE,
    );
    const check_amount = newPaymentId === pfObject["m_payment_id"];

    //* check no. 4: verify information received from gateway and confirming the order with the server before confirming the order with the client...
    const verifyRes = await fetch(
      "https://sandbox.payfast.co.za/eng/query/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: pfString,
      },
    );
    const verifyResText = await verifyRes.text();
    const check_info = verifyResText === "VALID";

    if (check_signature && check_host && check_amount && check_info) {
      paymentValidation = "PASS";
    } else {
      paymentValidation = `FAIL (signature: ${check_signature}, host: ${check_host}, amount: ${check_amount}, info: ${check_info})`;
    }

    return Response.json({
      status: 200,
    });
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function GET() {
  return Response.json({
    status: 200,
    message: paymentValidation,
  });
}
