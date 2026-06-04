import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Resume from "@/models/Resume";

export async function GET() {
  try {
    await dbConnect();

    // Aggregating stats
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();
    
    // Distinct template usage
    const templatesUsedCount = await Resume.distinct("settings.templateId").then(t => t.length);

    // AI Utilization (Assuming Resume sections might contain AI generated content)
    // For now, let's count resumes that have at least one AI-related field or just total resumes as a proxy
    const aiResumes = await Resume.countDocuments({ 
        "sections.experience.aiGenerated": { $exists: true } 
    });

    return NextResponse.json({
      totalUsers,
      totalResumes,
      templatesUsedCount,
      aiUtilization: aiResumes
    });
  } catch (error) {
    console.error("[Admin Stats Error]:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
