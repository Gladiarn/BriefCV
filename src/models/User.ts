import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    // References to user's resumes
    resumes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Resume",
      },
    ],
  },
  {
    timestamps: true,
    strict: false,
  },
);

if (mongoose.models.User) {
  delete (mongoose.models as any).User;
}

export default mongoose.model("User", UserSchema);
