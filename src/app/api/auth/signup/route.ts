import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/services/authService";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    console.log(`[Signup] Attempting signup for: ${email}`);

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      console.log(`[Signup] User already exists: ${email}`);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const newUser = await createUser(email, password);
    console.log(`[Signup] Successfully created user: ${newUser.email}`);

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Server error during signup";
    console.error("[Signup Error]:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
