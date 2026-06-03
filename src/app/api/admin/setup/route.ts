import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/db";
import { hashPassword } from "@/services/authService";

export async function GET() {
  try {
    await dbConnect();

    const email = "ianne@gmail.com";
    const password = "iicczzbb_123";

    // Explicitly hash with the same function used in the service
    const hashedPassword = await hashPassword(password);
    console.log("[Setup] Hashed password:", hashedPassword);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          password: hashedPassword,
          role: "admin",
          name: "Admin",
        },
      },
      { upsert: true, new: true },
    );

    console.log(
      "[Setup] User updated in DB:",
      updatedUser.email,
      updatedUser.password,
    );

    return NextResponse.json({
      message: "Admin user set up successfully",
      user: { email: updatedUser.email, role: updatedUser.role },
    });
  } catch (error) {
    console.error("[Setup] Error:", error);
    return NextResponse.json(
      {
        error:
          "Setup failed: " +
          (error instanceof Error ? error.message : "Unknown"),
      },
      { status: 500 },
    );
  }
}
