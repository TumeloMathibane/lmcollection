// app/api/items/route.ts

export async function POST(request: Request) {
  try {
    const body = (await request.json()) || []; // For JSON data
    console.log("(notify) Received data:", body);

    return Response.json(
      { message: "(notify) Data received successfully", data: body },
      { status: 200 }
    );
  } catch (error) {
    console.error("(notify) Error: ", error);
  }
}
