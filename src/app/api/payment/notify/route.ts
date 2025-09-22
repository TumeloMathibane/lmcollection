// app/api/items/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text(); // For JSON data
    const resolvedBody = await Promise.resolve(body); // Resolve the Promise
    console.log(
      "(notify - resolvedBody) Received data:",
      decodeURIComponent(resolvedBody).split("&")
    );

    return NextResponse.json(
      { message: "(notify) Data received successfully", data: resolvedBody },
      { status: 200 }
    );
  } catch (error) {
    console.error("(notify) Error: ", error);
    return NextResponse.json(
      { error: "(notify) An error occurred" },
      { status: 500 }
    );
  }
}
