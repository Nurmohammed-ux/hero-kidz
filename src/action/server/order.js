"use server";

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";
import { ObjectId } from "mongodb"; 
import { revalidatePath } from "next/cache"; 

const orderCollection = dbConnect(collections.Order);

export const createOrder = async (payload) => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) return { success: false, message: "Unauthorized" };

    // 1. Fetch user cart directly on server (source of truth)
    const cart = await getCart();
    if (!cart || cart.length === 0) {
      return { success: false, message: "Cart is empty" };
    }

    // 2. Validate required shipping fields from payload
    const { fullName, email, phone, address, city, paymentMethod } =
      payload || {};

    if (
      !fullName?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !city?.trim()
    ) {
      return {
        success: false,
        message: "Missing required shipping information",
      };
    }

    // 3. Recalculate totals on server to avoid tampered prices
    const subtotal = cart.reduce(
      (acc, item) =>
        acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0,
    );
    const shipping = subtotal > 0 ? 50 : 0;
    const totalAmount = subtotal + shipping;

    // 4. Construct a clean, sanitized order object
    const newOrder = {
      userId: user.id || user.email,
      userEmail: user.email,
      shippingAddress: {
        fullName: fullName.trim(),
        email: email?.trim() || user.email,
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        postalCode: payload.postalCode?.trim() || "",
      },
      items: cart.map((item) => ({
        productId: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      pricing: {
        subtotal,
        shipping,
        totalAmount,
      },
      paymentMethod: paymentMethod || "cod",
      status: "pending",
      createdAt: new Date(),
    };

    // 5. Insert order
    const result = await orderCollection.insertOne(newOrder);

    // 6. Clear cart after successful order creation
    if (result.insertedId) {
      await clearCart();
    }

    // 📧 Send Invoice Email
    await sendEmail({
      to: user.email,
      subject: "Your Order Invoice - Hero Kidz",
      html: orderInvoiceTemplate({
        orderId: result.insertedId.toString(),
        items: cart,
        subtotal,
        shipping,
        totalAmount,
        shippingAddress: newOrder.shippingAddress,
      }),
    });
    return {
      success: Boolean(result.insertedId),
    };
  } catch (error) {
    console.error("Error in createOrder:", error);
    return { success: false, message: "Server error" };
  }
};

export const getOrders = async () => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) return { success: false, message: "Unauthorized" };

    const query = { userEmail: user.email };
    const rawOrders = await orderCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const orders = rawOrders.map((order) => ({
      ...order,
      _id: order._id.toString(),
      createdAt: order.createdAt
        ? new Date(order.createdAt).toISOString()
        : new Date().toISOString(),
      items:
        order.items?.map((item) => ({
          ...item,
          productId: item.productId?.toString() || "",
        })) || [],
    }));

    return {
      success: true,
      orders,
    };
  } catch (error) {
    console.error("Error in getOrders:", error);
    return { success: false, message: "Server error" };
  }
};

export const updateOrderAddress = async (orderId, newShippingAddress) => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user?.email) {
      return { success: false, message: "Unauthorized" };
    }

    // Ensure orderId exists and is valid 24-char hex string
    if (!orderId || !ObjectId.isValid(orderId)) {
      return { success: false, message: "Invalid Order ID" };
    }

    const { fullName, phone, address, city, postalCode } =
      newShippingAddress || {};

    if (
      !fullName?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !city?.trim()
    ) {
      return {
        success: false,
        message: "Please fill in all required shipping fields.",
      };
    }

    const queryId = new ObjectId(orderId);

    // 1. Fetch the order to verify ownership and check status
    const existingOrder = await orderCollection.findOne({ _id: queryId });

    if (!existingOrder) {
      return { success: false, message: "Order not found." };
    }

    // Verify user owns this order
    if (
      existingOrder.userEmail !== user.email &&
      existingOrder.userId !== user.email
    ) {
      return { success: false, message: "Permission denied." };
    }

    // Prevent address updates if order is not pending
    if (existingOrder.status !== "pending") {
      return {
        success: false,
        message: `Cannot update address. Order is already ${existingOrder.status}.`,
      };
    }

    // 2. Update shipping address in MongoDB
    const updateResult = await orderCollection.updateOne(
      { _id: queryId },
      {
        $set: {
          "shippingAddress.fullName": fullName.trim(),
          "shippingAddress.phone": phone.trim(),
          "shippingAddress.address": address.trim(),
          "shippingAddress.city": city.trim(),
          "shippingAddress.postalCode": postalCode?.trim() || "",
          updatedAt: new Date(),
        },
      },
    );

    // Revalidate order page cache so the UI updates automatically
    revalidatePath("/orders");

    return {
      success: updateResult.modifiedCount > 0,
      message:
        updateResult.modifiedCount > 0
          ? "Order shipping address updated successfully!"
          : "No changes were made to the address.",
    };
  } catch (error) {
    console.error("Error in updateOrderAddress:", error);
    return {
      success: false,
      message: error.message || "Server error while updating address.",
    };
  }
};
