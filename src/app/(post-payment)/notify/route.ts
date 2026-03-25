import dns from "node:dns/promises";

let paymentValidation: object;

export async function POST(req: Request) {
  try {
    const response = await req.text();

    if (!response) {
      throw new Error(`Error: ${Response.error}`);
    }

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

    // * CHECK 2: check if domain of sender is from expected payfast host
    if (!check_host) {
      throw new Error("Error: Request not from PayFast");
    }
    paymentValidation = Object.fromEntries(new URLSearchParams(response));
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
