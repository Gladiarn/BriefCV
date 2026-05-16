import mongoose, { type Document, Schema } from "mongoose";

export interface IResume extends Document {
  userId: string;
  metadata: {
    fullName: string;
    targetRole: string;
  };
  experience: {
    company: string;
    position: string;
    description: string;
    optimizedBullets: string[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    metadata: {
      fullName: { type: String, required: true },
      targetRole: { type: String, required: true },
    },
    experience: [
      {
        company: { type: String, required: true },
        position: { type: String, required: true },
        description: { type: String, required: true },
        optimizedBullets: [{ type: String }],
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Resume ||
  mongoose.model<IResume>("Resume", ResumeSchema);
