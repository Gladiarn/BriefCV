import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { updateRefreshToken, verifyAccessToken } from "@/services/authService";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (token) {
    const payload = verifyAccessToken(token);
    if (payload) {
      await updateRefreshToken(payload.userId, null);
    }
  }

  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
