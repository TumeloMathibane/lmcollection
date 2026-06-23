// app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");
const convex = new ConvexHttpClient("https://clean-ant-257.convex.cloud", {
  logger: true,
});

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = await convex.query(api.users.getUserByEmail, {
      email: email,
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user in Convex
    const userId = await convex.mutation(api.users.createUser, {
      name: name,
      email: email,
      hashedPassword: hashedPassword,
      role: "user",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        name: name,
        email: email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: (error as string) || "Failed to create account" },
      { status: 500 },
    );
  }
}
