import dbConnect from "@/lib/db";
import LoginLog from "@/models/LoginLog";

export const logLogin = async (userId: string) => {
  try {
    await dbConnect();
    await LoginLog.create({ userId });
  } catch (error) {
    console.error("Failed to log login:", error);
  }
};
