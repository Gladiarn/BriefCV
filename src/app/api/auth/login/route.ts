import { NextResponse } from "next/server";
import {
  findUserByEmail,
  generateToken,
  verifyPassword,
} from "@/services/authService";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    console.log(`[Login] Attempting login for: ${email}`);

    const user = await findUserByEmail(email);

    if (!user) {
      console.log(`[Login] User not found: ${email}`);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      console.log(`[Login] Password mismatch for: ${email}`);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = generateToken(user._id.toString(), user.email);
    console.log(`[Login] Successful login for: ${email}`);

    const response = NextResponse.json({
      message: "Logged in",
      user: { email: user.email, name: user.name },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("[Login Error]:", error);
    return NextResponse.json(
      { error: error.message || "Server error during login" },
      { status: 500 },
    );
  }
}
