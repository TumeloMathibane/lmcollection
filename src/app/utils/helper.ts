import md5 from "md5";

export function generateSignature(data: object, passphrase?: string): string {
  let procString = "";
  Object.entries(data).map(([key, val]) => {
    if (val !== "")
      procString += `${key}=${encodeURIComponent(val).replace(/%20/g, "+")}&`;
  });

  procString = procString.slice(0, -1);
  if (passphrase !== null)
    procString += `&passphrase=${encodeURIComponent(passphrase ?? "").replace(/%20/g, "+")}`;

  return md5(procString);
}

export function objectToString(data: object): string {
  let output = "";

  Object.entries(data).map(
    ([key, val]) =>
      (output += `${key}=${encodeURIComponent(val).replace(/%20/g, "+")}&`)
  );

  output = output.slice(0, -1);

  return output;
}

export function generatePaymentId(
  orderId: string,
  passphrase?: string
): string | void {
  const date = new Date();
  const encryptString = md5(date.toLocaleDateString() + orderId + passphrase);
  let paymentId: string = "";
  for (let i = 0; i < encryptString.length; i++) {
    if (i % 2 !== 0) paymentId += encryptString[i];
  }

  return paymentId;
}

export function verifySignature(data: string): boolean {
  // convert to object for clearer processing...
  const processedData = Object.fromEntries(
    data.split("&").map((item) => item.split("="))
  );

  // create a new data string without the signature field...
  let dataString = "";
  for (const key in processedData) {
    if (processedData.hasOwnProperty(key) && key !== "signature")
      dataString += `${key}=${processedData[key]?.trim().replace(/%20/g, "+")}&`;
  }
  dataString = dataString.slice(0, -1);

  // confirm the signature...
  if (process.env.PAYGATE_SALT_PASSPHRASE)
    dataString += `&passphrase=${process.env.PAYGATE_SALT_PASSPHRASE?.trim().replace(/%20/g, "+")}`;

  return processedData["signature"] === md5(dataString);
}
