import mongoose, { Schema } from "mongoose";

const LoginLogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "365d", // Optional: automatically delete logs older than 1 year
    },
  },
  {
    timestamps: true,
  },
);

if (mongoose.models.LoginLog) {
  delete (mongoose.models as any).LoginLog;
}

export default mongoose.model("LoginLog", LoginLogSchema);
