import { NextResponse } from "next/server";
import {
  createUser,
  findUserByEmail,
  generateAccessToken,
  generateRefreshToken,
  updateRefreshToken,
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

    console.log(`[Signup] Attempting signup for: ${email}`);

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      console.log(`[Signup] User already exists: ${email}`);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // Strictly enforce 'user' role for all new signups to prevent privilege escalation
    const newUser = await createUser(email, password, "user");
    console.log(`[Signup] Successfully created user: ${newUser.email}`);

    const accessToken = generateAccessToken(
      newUser._id.toString(),
      newUser.email,
      newUser.role,
    );
    const refreshToken = generateRefreshToken(
      newUser._id.toString(),
      newUser.email,
      newUser.role,
    );

    await updateRefreshToken(newUser._id.toString(), refreshToken);

    const response = NextResponse.json(
      {
        message: "User created",
        user: { email: newUser.email, name: newUser.name, role: newUser.role },
      },
      { status: 201 },
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 30, // 30 mins
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Server error during signup";
    console.error("[Signup Error]:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
