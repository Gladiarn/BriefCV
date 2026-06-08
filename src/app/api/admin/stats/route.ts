import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import LoginLog from "@/models/LoginLog";
import Resume from "@/models/Resume";
import Usage from "@/models/Usage";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    const range = searchParams.get("range") || "7d";

    const startDate = new Date();
    if (range === "30d") startDate.setDate(startDate.getDate() - 30);
    else if (range === "1y") startDate.setFullYear(startDate.getFullYear() - 1);
    else startDate.setDate(startDate.getDate() - 7);

    // Dynamic format based on range
    const dateFormat = range === "1y" ? "%Y-%m" : "%Y-%m-%d";

    // Aggregating stats
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();

    // Distinct template usage
    const templatesUsedCount = await Resume.distinct(
      "settings.templateId",
    ).then((t) => t.length);

    // AI Utilization: Total tokens consumed
    const aiStats = await Usage.aggregate([
      { $group: { _id: null, totalTokens: { $sum: "$totalTokens" } } },
    ]);
    const totalTokens = aiStats.length > 0 ? aiStats[0].totalTokens : 0;
    const totalUsageCount = await Usage.countDocuments();

    const dailyUsage = await Usage.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: "$createdAt" } },
          tokens: { $sum: "$totalTokens" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dailyUsers = await User.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dailyResumes = await Resume.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Helper to fill missing dates
    const fillMissingDates = (
      data: Record<string, string | number>[],
      key: string,
      range: string,
    ) => {
      const result = [];
      const endDate = new Date();
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dateStr =
          range === "1y"
            ? currentDate
                .toISOString()
                .slice(0, 7) // YYYY-MM
            : currentDate.toISOString().slice(0, 10); // YYYY-MM-DD

        const existing = data.find((d) => d.date === dateStr);
        result.push({ date: dateStr, [key]: existing ? existing[key] : 0 });

        if (range === "1y") currentDate.setMonth(currentDate.getMonth() + 1);
        else currentDate.setDate(currentDate.getDate() + 1);
      }
      return result;
    };

    // Activity for calendar (last 90 days)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const activityCalendar = await LoginLog.aggregate([
      { $match: { createdAt: { $gte: ninetyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json({
      totalUsers,
      totalResumes,
      templatesUsedCount,
      aiUtilization: totalTokens,
      dailyUsage: fillMissingDates(
        dailyUsage.map((d) => ({ date: d._id, tokens: d.tokens })),
        "tokens",
        range,
      ),
      dailyUsers: fillMissingDates(
        dailyUsers.map((d) => ({ date: d._id, count: d.count })),
        "count",
        range,
      ),
      dailyResumes: fillMissingDates(
        dailyResumes.map((d) => ({ date: d._id, count: d.count })),
        "count",
        range,
      ),
      activityCalendar: activityCalendar.map((d) => ({
        date: d._id,
        count: d.count,
      })),
      totalUsageCount,
    });
  } catch (error) {
    console.error("[Admin Stats Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
