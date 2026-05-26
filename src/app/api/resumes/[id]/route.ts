import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Resume from "@/models/Resume";
import User from "@/models/User";

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

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    // Delete the resume
    const resume = await Resume.findOneAndDelete({
      $or: [{ _id: id }, { uuid: id }],
      userId,
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }
    // Remove reference from user
    await User.findByIdAndUpdate(userId, {
      $pull: { resumes: resume._id },
    });

    return NextResponse.json({ message: "Resume deleted successfully" });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Server error during delete";
    console.error("[Delete Resume Error]:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
