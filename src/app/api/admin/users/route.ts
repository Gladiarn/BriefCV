import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import LoginLog from "@/models/LoginLog";
import User from "@/models/User";
import { createUser, findUserByEmail } from "@/services/authService";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [{ email: { $regex: search, $options: "i" } }];
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query, "email role createdAt resumes")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Fetch latest login for these users
    const userIds = users.map((u) => u._id);
    const latestLogins = await LoginLog.aggregate([
      { $match: { userId: { $in: userIds } } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$userId",
          lastLogin: { $first: "$createdAt" },
        },
      },
    ]);

    const loginMap = new Map(
      latestLogins.map((l) => [l._id.toString(), l.lastLogin]),
    );

    const usersWithStats = users.map((user) => ({
      ...user,
      lastLogin: loginMap.get(user._id.toString()) || null,
      resumeCount: user.resumes?.length || 0,
    }));

    return NextResponse.json({
      users: usersWithStats,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("[Admin Users Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 },
      );
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const newUser = await createUser(email, password, role);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("[Admin Create User Error]:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
