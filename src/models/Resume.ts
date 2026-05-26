import mongoose, { Schema } from "mongoose";

const ResumeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    uuid: {
      type: String,
      unique: true,
      sparse: true,
    },
    title: {
      type: String,
      required: true,
      default: "Untitled Resume",
    },
    settings: {
      templateId: { type: String, required: true },
      layoutStructure: { type: String, required: true },
      columnMapping: {
        leftColumn: [String],
        middleColumn: [String],
        rightColumn: [String],
        mainColumn: [String],
      },
      design: {
        primaryColor: { type: String, default: "#ec4899" },
        fontSize: { type: String, default: "md" },
        spacing: { type: String, default: "normal" },
        fontFamily: { type: String, default: "sans" },
        sectionGap: { type: Number, default: 24 },
      },
    },
    sections: {
      type: Map,
      of: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    // Add this to prevent the StrictModeError during development reloads
    strict: false,
  },
);

// Force refresh model to pick up schema changes in dev
if (mongoose.models.Resume) {
  delete (mongoose.models as any).Resume;
}

export default mongoose.model("Resume", ResumeSchema);
