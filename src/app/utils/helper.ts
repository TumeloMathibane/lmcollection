import type { Product } from "@/(overview)/collection/products/types";
import md5 from "md5";

export function generateSignature(data: object, passphrase?: string): string {
  let procString = "";
  Object.entries(data).map(([key, val]) => {
    if (val !== "") {
      procString += `${key}=${encodeURIComponent(String(val).trim()).replace(/%20/g, "+")}&`;
    }
  });

  procString = procString.slice(0, -1);
  if (passphrase !== null) {
    procString += `&passphrase=${encodeURIComponent(
      String(passphrase).trim() ?? "",
    ).replace(/%20/g, "+")}`;
  }

  return md5(procString);
}

export function objectToString(data: object): string {
  let output = "";

  Object.entries(data).map(
    ([key, val]) =>
      (output += `${encodeURIComponent(key)}=${encodeURIComponent(String(val).trim()).replace(/%20/g, "+").replace(/\(/g, "%28").replace(/\)/g, "%29")}&`),
  );
  output = output.slice(0, -1);

  return output;
}

export function generatePaymentId(
  orderId: string,
  cartTotal: number,
  passphrase?: string,
): string | void {
  const encryptString = md5(orderId + cartTotal + passphrase);
  let paymentId: string = "";
  for (let i = 0; i < encryptString.length; i++) {
    if (i % 2 !== 0) {
      paymentId += encryptString[i];
    }
  }

  return paymentId;
}

export function dynamicPricedItem(
  item: Product,
): { prices: number[] | undefined; totalValue: number } | undefined {
  if (!item.dynamic_pricing) {
    return undefined;
  }

  const prices = item.additional_options
    .find((i) => i.label === item.pricing_by)
    ?.value.split(",")
    .map((i) => Number(i.split("=")[1].trim()));

  const totalVal = Number(
    prices?.reduce((total, price) => total + Number(price), 0),
  );

  return { prices: prices, totalValue: totalVal };
}
