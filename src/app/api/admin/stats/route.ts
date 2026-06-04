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

    // Daily usage for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyUsage = await Usage.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                tokens: { $sum: "$totalTokens" }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    return NextResponse.json({
      totalUsers,
      totalResumes,
      templatesUsedCount,
      aiUtilization: totalTokens,
      dailyUsage: dailyUsage.map(d => ({ date: d._id, tokens: d.tokens }))
    });

  } catch (error) {
    console.error("[Admin Stats Error]:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
