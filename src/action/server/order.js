"use server";

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";

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
