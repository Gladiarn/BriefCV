import { NextResponse } from "next/server";
import {
  findUserByEmail,
  generateAccessToken,
  generateRefreshToken,
  updateRefreshToken,
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

    if (!user.password) {
      console.log(
        `[Login] Attempted password login for Google-only user: ${email}`,
      );
      return NextResponse.json(
        { error: "Please use Google login for this account" },
        { status: 400 },
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

    const accessToken = generateAccessToken(user._id.toString(), user.email);
    const refreshToken = generateRefreshToken(user._id.toString(), user.email);

    await updateRefreshToken(user._id.toString(), refreshToken);

    console.log(`[Login] Successful login for: ${email}`);

    const response = NextResponse.json({
      message: "Logged in",
      user: { email: user.email, name: user.name },
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 30, // 30 mins
      sameSite: "none",
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "none",
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Server error during login";
    console.error("[Login Error]:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
