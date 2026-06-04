import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Resume from "@/models/Resume";
import Usage from "@/models/Usage";

export async function GET() {
  try {
    await dbConnect();

    // Aggregating stats
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();
    
    // Distinct template usage
    const templatesUsedCount = await Resume.distinct("settings.templateId").then(t => t.length);

    // AI Utilization: Total tokens consumed
    const aiStats = await Usage.aggregate([
        { $group: { _id: null, totalTokens: { $sum: "$totalTokens" } } }
    ]);
    const totalTokens = aiStats.length > 0 ? aiStats[0].totalTokens : 0;

    return NextResponse.json({
      totalUsers,
      totalResumes,
      templatesUsedCount,
      aiUtilization: totalTokens // Sending total tokens consumed as utilization
    });

  } catch (error) {
    console.error("[Admin Stats Error]:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
