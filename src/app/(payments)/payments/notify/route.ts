import { verifySignature } from "@/utils/helper";

export async function POST(req: Request) {
  try {
    const response = await req.text();

    if (!response) throw new Error(`Error: ${Response.error}`);

    console.log(req.headers);

    if (verifySignature(response))
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
    message: "GET request: Hello, World!",
  });
}
