"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  const { email, password, name } = payload;
  if (!email || !password) return null;

  const isExist = await dbConnect(collections.USERS).findOne({ email });
  if (isExist) return null;

  const newUser = {
    provider: "credentials",
    email,
    password: await bcrypt.hash(password, 14),
    name,
    role: "user",
  };

  const result = await dbConnect(collections.USERS).insertOne(newUser);

  if (result.acknowledged) {
    return { ...result, insertedId: result.insertedId.toString() };
  }
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) return null;

  const user = await dbConnect(collections.USERS).findOne({ email });
  if (!user || !user.password) return null; // Ensure user exists and has a password

  const isMatched = await bcrypt.compare(password, user.password);
  if (isMatched) {
    // 🛠️ FIX: Convert MongoDB ObjectId to string to prevent serialization errors
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role || "user",
    };
  } else {
    return null;
  }
};