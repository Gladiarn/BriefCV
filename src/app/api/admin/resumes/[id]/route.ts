import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Resume from "@/models/Resume";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;

    const deletedResume = await Resume.findByIdAndDelete(id);
    if (!deletedResume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("[Admin Delete Resume Error]:", error);
    return NextResponse.json(
      { error: "Failed to delete resume" },
      { status: 500 },
    );
  }
}
