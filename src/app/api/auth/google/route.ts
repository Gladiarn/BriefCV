import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const googleId = process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID;

  if (!googleId) {
    console.error("[OAuth] Missing AUTH_GOOGLE_ID environment variable");
    return NextResponse.json(
      { error: "OAuth configuration missing on server. Check Vercel environment variables." },
      { status: 500 }
    );
  }

  // Log part of the ID for debugging in Vercel logs (safe)
  console.log(`[OAuth] Initiating with Client ID: ${googleId.substring(0, 5)}...${googleId.substring(googleId.length - 5)} (Length: ${googleId.length})`);

  const url = new URL(req.url);
  const origin = `${url.protocol}//${url.host}`;

  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri:
      process.env.GOOGLE_REDIRECT_URI ||
      `${origin}/api/auth/google/callback`,
    client_id: googleId,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };


  const qs = new URLSearchParams(options);

  return NextResponse.redirect(`${rootUrl}?${qs.toString()}`);
}
