import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/services/authService";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  console.log("[Auth Me] Token found:", !!token);

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: {
      id: decoded.userId,
      email: decoded.email,
    },
  });
}
