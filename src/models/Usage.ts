import mongoose, { Schema } from "mongoose";

const UsageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    promptTokens: { type: Number, default: 0 },
    completionTokens: { type: Number, default: 0 },
    totalTokens: { type: Number, default: 0 },
    model: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// Force refresh model to pick up schema changes in dev
if (mongoose.models.Usage) {
  delete (mongoose.models as any).Usage;
}

export default mongoose.model("Usage", UsageSchema);
