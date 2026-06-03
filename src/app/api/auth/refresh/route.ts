import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "@/services/authService";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 },
      );
    }

    // Database comparison
    await dbConnect();
    const user = await User.findById(payload.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json(
        { error: "Refresh token mismatch or revoked" },
        { status: 401 },
      );
    }

    const accessToken = generateAccessToken(payload.userId, payload.email);

    const response = NextResponse.json({
      message: "Token refreshed",
      user: { email: payload.email },
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 30, // 30 mins
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Server error during token refresh";
    console.error("[Refresh Error]:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
