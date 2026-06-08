import { NextResponse } from "next/server";
import {
  findUserByEmail,
  generateAccessToken,
  generateRefreshToken,
  updateRefreshToken,
  verifyPassword,
} from "@/services/authService";
import { logLogin } from "@/services/logService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "Please use Google login for this account" },
        { status: 400 },
      );
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const accessToken = generateAccessToken(
      user._id.toString(),
      user.email,
      user.role,
    );
    const refreshToken = generateRefreshToken(
      user._id.toString(),
      user.email,
      user.role,
    );

    await updateRefreshToken(user._id.toString(), refreshToken);
    await logLogin(user._id.toString());

    const response = NextResponse.json({
      message: "Logged in",
      user: { email: user.email, name: user.name, role: user.role },
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 30,
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (e) {
    return NextResponse.json(
      { error: "Server error during login" },
      { status: 500 },
    );
  }
}
