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
  } catch (error) {
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

    const id = cvDocument.id;
    const query: any = { userId };

    // Safely construct query based on ID type
    if (id) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        query._id = id;
      } else {
        query.uuid = id;
      }
    }

    const updateData = {
      userId,
      title: cvDocument.title || "Untitled Resume",
      settings: cvDocument.settings,
      sections: cvDocument.sections,
      uuid: id, // Always store the frontend ID as uuid
    };

    // Upsert logic
    const resume = await Resume.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, upsert: true },
    );

    // Link it to the user if it's new
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
  } catch (error: any) {
    console.error("[Save Resume Error]:", error);
    return NextResponse.json(
      {
        error: error.message,
        details: error.stack,
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
