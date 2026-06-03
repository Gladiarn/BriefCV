import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Resume from "@/models/Resume";

const JWT_SECRET = process.env.JWT_SECRET || "your-fallback-secret";

async function getUserIdFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch (_error) {
    return null;
  }
}

export async function PATCH(req: Request) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, title } = await req.json();
    if (!id || !title) {
      return NextResponse.json(
        { error: "ID and Title are required" },
        { status: 400 },
      );
    }

    await dbConnect();

    const resume = await Resume.findOneAndUpdate(
      { $or: [{ _id: id }, { uuid: id }], userId },
      { title },
      { new: true },
    );

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Resume renamed successfully",
      resume,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Server error during rename";
    console.error("[Rename Resume Error]:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
