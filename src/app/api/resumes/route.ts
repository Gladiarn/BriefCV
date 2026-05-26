import jwt from "jsonwebtoken";
import mongoose from "mongoose";
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

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cvDocument = await req.json();
    await dbConnect();

    const resumeId = cvDocument.id;
    const query: { userId: string; _id?: string; uuid?: string } = { userId };

    // Safely construct query based on ID type
    if (resumeId) {
      if (mongoose.Types.ObjectId.isValid(resumeId)) {
        query._id = resumeId;
      } else {
        query.uuid = resumeId;
      }
    }

    const updateData = {
      userId,
      title: cvDocument.title || "Untitled Resume",
      settings: cvDocument.settings,
      sections: cvDocument.sections,
      uuid: resumeId,
    };

    // Upsert logic
    const resume = await Resume.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, upsert: true },
    );

    // Link it to the user
    await User.findByIdAndUpdate(userId, {
      $addToSet: { resumes: resume._id },
    });

    return NextResponse.json(
      {
        message: "Resume saved successfully",
        id: resume._id,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Server error during save";
    console.error("[Save Resume Error]:", message);
    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });

    return NextResponse.json(resumes);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Server error fetching resumes";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
