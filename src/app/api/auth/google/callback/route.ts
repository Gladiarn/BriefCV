import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  updateRefreshToken,
} from "@/services/authService";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", req.url));
  }

  try {
    // 1. Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.AUTH_GOOGLE_ID!,
        client_secret: process.env.AUTH_GOOGLE_SECRET!,
        redirect_uri:
          process.env.GOOGLE_REDIRECT_URI ||
          "http://localhost:3000/api/auth/google/callback",
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenResponse.json();

    if (tokens.error) {
      console.error("[Google Callback Error]:", tokens.error);
      return NextResponse.redirect(
        new URL("/login?error=token_exchange_failed", req.url),
      );
    }

    // 2. Get user info
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      },
    );

    const googleUser = await userResponse.json();

    // 3. Upsert user in DB
    await dbConnect();
    let user = await User.findOne({
      $or: [{ googleId: googleUser.id }, { email: googleUser.email }],
    });

    if (!user) {
      user = await User.create({
        email: googleUser.email,
        name: googleUser.name,
        googleId: googleUser.id,
      });
    } else if (!user.googleId) {
      // Link existing email account to Google
      user.googleId = googleUser.id;
      if (!user.name) user.name = googleUser.name;
      await user.save();
    }

    // 4. Issue our tokens
    const accessToken = generateAccessToken(user._id.toString(), user.email);
    const refreshToken = generateRefreshToken(user._id.toString(), user.email);

    await updateRefreshToken(user._id.toString(), refreshToken);

    const response = NextResponse.redirect(new URL("/", req.url));

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
    console.error("[Google Callback Exception]:", error);
    return NextResponse.redirect(
      new URL("/login?error=callback_exception", req.url),
    );
  }
}
