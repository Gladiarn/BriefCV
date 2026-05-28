import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your-access-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ||
  process.env.AUTH_SECRET ||
  "your-refresh-secret";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const updateRefreshToken = async (
  userId: string,
  token: string | null,
) => {
  await dbConnect();
  await User.findByIdAndUpdate(userId, { refreshToken: token });
};

export const generateAccessToken = (userId: string, email: string) => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "30m" });
};

export const generateRefreshToken = (userId: string, email: string) => {
  return jwt.sign({ userId, email }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as {
      userId: string;
      email: string;
    };
  } catch (error) {
    return null;
  }
};

export const generateToken = (userId: string, email: string) => {
  return generateAccessToken(userId, email);
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
