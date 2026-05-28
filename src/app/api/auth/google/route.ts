import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const googleId = (
    process.env.AUTH_GOOGLE_ID ||
    process.env.GOOGLE_CLIENT_ID ||
    ""
  ).trim();

  if (!googleId) {
    console.error("[OAuth] Missing AUTH_GOOGLE_ID environment variable");
    return NextResponse.json(
      {
        error:
          "OAuth configuration missing on server. Check Vercel environment variables.",
      },
      { status: 500 },
    );
  }

  // Robust origin detection for Vercel
  const host = req.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  console.log(
    `[OAuth] Initiating from ${origin} with Client ID: ${googleId.substring(0, 5)}... (Length: ${googleId.length})`,
  );

  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  // If GOOGLE_REDIRECT_URI is set but points to localhost while we are on production, ignore it
  let redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (redirectUri?.includes("localhost") && !host.includes("localhost")) {
    redirectUri = undefined;
  }

  const options = {
    redirect_uri: redirectUri || `${origin}/api/auth/google/callback`,
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
