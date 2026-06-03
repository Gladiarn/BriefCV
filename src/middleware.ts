import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin") && path !== "/admin/login") {
    const accessToken = request.cookies.get("accessToken")?.value;

    // We only check for the existence of the token in middleware to avoid edge runtime errors.
    // Full signature verification will be done on the server-side page components.
    if (!accessToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  return NextResponse.next();
}
