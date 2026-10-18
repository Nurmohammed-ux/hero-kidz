"use server";

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

const cartCollection = dbConnect(collections.CART);

export const handleCart = async ({ product, inc = true }) => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) return { success: false };

    const query = { email: user?.email, productId: product?._id };
    const isAdded = await cartCollection.findOne(query);

    // Safely calculate final price (handling potential null discounts)
    const basePrice = Number(product.price) || 0;
    const discountPercent = Number(product.discount) || 0;
    const finalPrice =
      discountPercent > 0
        ? basePrice - (basePrice * discountPercent) / 100
        : basePrice;

    if (isAdded) {
      const updateData = {
        $inc: {
          quantity: inc ? 1 : -1,
        },
      };
      const result = await cartCollection.updateOne(query, updateData);
      return { success: Boolean(result.modifiedCount) };
    } else {
      const newData = {
        productId: product?._id,
        email: user?.email,
        title: product.title,
        price: finalPrice, // Correctly calculated final price
        discount: product.discount ?? 0,
        quantity: 1,
        image: product.image,
        username: user?.name,
      };
      const result = await cartCollection.insertOne(newData);
      return { success: Boolean(result.insertedId) };
    }
  } catch (error) {
    console.error("Error in handleCart:", error);
    return { success: false };
  }
};
// if you didn't router.refresh() in cartItem you can use cache in getCart then revalidatePath in deleteItemFromCart before final return

export const getCart = async () => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) return [];

    const query = { email: user?.email };
    const result = await cartCollection.find(query).toArray();
    return result;
  } catch (error) {
    console.error("Error in getCart:", error);
    return [];
  }
};

export const deleteItemFromCart = async (id) => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) return { success: false };
    if (!id || id.length !== 24) {
      return { success: false };
    }

    const query = {
      _id: new ObjectId(id),
      email: user.email,
    };

    const result = await cartCollection.deleteOne(query);
    return { success: Boolean(result.deletedCount) };
  } catch (error) {
    console.error("Error in deleteItemFromCart:", error);
    return { success: false };
  }
};

export const clearCart = async () => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) return [];

    const query = { email: user?.email };
    const result = await cartCollection.deleteMany(query);
    return result;
  } catch (error) {
    console.error("Error in clearCart:", error);
    return [];
  }
};
