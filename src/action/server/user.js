"use server";

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

const userCollection = dbConnect(collections.USERS || "users");

export const updateUserAddress = async (formData) => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user?.email) {
      return { success: false, message: "Unauthorized" };
    }

    const { fullName, phone, address, city, postalCode } = formData;

    if (!address?.trim() || !city?.trim()) {
      return { success: false, message: "Address and city are required." };
    }

    // Update user's default shipping address in MongoDB
    const result = await userCollection.updateOne(
      { email: user.email },
      {
        $set: {
          shippingAddress: {
            fullName: fullName?.trim() || user.name || "",
            phone: phone?.trim() || "",
            address: address.trim(),
            city: city.trim(),
            postalCode: postalCode?.trim() || "",
          },
          updatedAt: new Date(),
        },
      },
      { upsert: true }, // Creates document if it doesn't exist yet
    );

    return {
      success: true,
      message: "Address updated successfully!",
    };
  } catch (error) {
    console.error("Error updating address:", error);
    return { success: false, message: "Server error while updating address" };
  }
};
