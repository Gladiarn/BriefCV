import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Resume from "@/models/Resume";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }

    const total = await Resume.countDocuments(query);
    const resumes = await Resume.find(query, "title userId createdAt")
      .populate("userId", "email")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      resumes,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("[Admin Resumes Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch resumes" },
      { status: 500 },
    );
  }
}
