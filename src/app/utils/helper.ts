import md5 from "md5";

export function generateSignature(data: object, passphrase?: string): string {
  let procString = "";
  Object.entries(data).map((item) => {
    if (item[1] !== "")
      procString += `${item[0]}=${encodeURIComponent(item[1].trim()).replace(/%20/g, "+")}&`;
  });

  procString = procString.slice(0, -1);
  if (passphrase !== null)
    procString += `&passphrase=${encodeURIComponent(passphrase ?? "").replace(/%20/g, "+")}`;

  // console.log("Data: ", data);
  // console.log("passphrase: ", passphrase);
  // console.log("procString: ", procString);

  return md5(procString);
}
