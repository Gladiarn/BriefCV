import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your-fallback-secret";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (userId: string, email: string) => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "7d" });
};

export const createUser = async (email: string, password: string) => {
  await dbConnect();
  const hashedPassword = await hashPassword(password);
  const user = await User.create({ email, password: hashedPassword });
  return user;
};

export const findUserByEmail = async (email: string) => {
  await dbConnect();
  return await User.findOne({ email });
};
