"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaLock,
  FaTruck,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { createOrder } from "@/action/server/order";
import { useSession } from "next-auth/react";
import Logo from "./Logo";

const Checkout = ({ cartItems = [] }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const session = useSession();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0,
  );
  const shipping = subtotal > 0 ? 100.0 : 0.0; // Flat shipping rate
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      Swal.fire(
        "Cart is empty",
        "Add some items before checking out!",
        "warning",
      );
      return;
    }
    // In handleCheckoutSubmit inside Checkout.jsx:

    const payload = {
      fullName: session?.data?.user?.name || formData.fullName,
      email: session?.data?.user?.email || formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      paymentMethod: formData.paymentMethod || "cod",
    };

    const confirm = await Swal.fire({
      title: "Confirm Order?",
      text: "Are you ready to place this order for your little hero?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "oklch(65% 0.23 35)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, place order!",
    });

    if (!confirm.isConfirmed) return;

    try {
      setSubmitting(true);

      // Call your secure server action
      const res = await createOrder(payload);

      if (res && res.success) {
        await Swal.fire({
          title: "Order Placed Successfully! 🎉",
          text: "Thank you for shopping with Hero Kidz. Your order is on its way!",
          icon: "success",
          confirmButtonColor: "oklch(65% 0.23 35)",
        });

        router.refresh(); // Refresh client/server component state
        router.push("/"); // Redirect to home page
      } else {
        Swal.fire(
          "Error",
          res?.message || "Could not place order. Please try again.",
          "error",
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "Something went wrong during checkout. Please try again.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (session.status == "loading") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xs">
        {/* Centered Brand / Loading Container */}
        <div className="flex flex-col items-center space-y-6 p-8 rounded-3xl bg-base-100 shadow-xl border border-border/40 animate-in fade-in zoom-in duration-300">
          {/* Animated Logo Wrapper */}
          <div className="relative flex items-center justify-center p-4">
            {/* Outer Ring Pulse */}
            <div className="absolute inset-0 rounded-3xl bg-primary/20 animate-ping" />

            {/* Render your custom Logo component */}
            <div className="relative z-10 scale-125 transform">
              <Logo />
            </div>
          </div>

          {/* Loading Subtext / Message */}
          <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase pt-2">
            Loading fun toys for you...
          </p>

          {/* Bouncing Loading Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-[#3C352D]">
          Express Checkout 🚀
        </h1>
        <p className="mt-4 text-lg text-[#776B5D]">
          Complete your shipping details to deliver joy to your little hero.
        </p>
      </div>

      <form
        onSubmit={handleCheckoutSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Shipping & Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-[#3C352D] flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <FaTruck className="text-primary" /> Shipping Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-[#776B5D] uppercase mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={session?.data?.user?.name}
                    readOnly
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-[#776B5D] uppercase mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={session?.data?.user?.email}
                    readOnly
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-[#776B5D] uppercase mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <FaPhone />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX XXXXXX"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-[#776B5D] uppercase mb-1">
                  Street Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 pt-3 text-gray-400">
                    <FaMapMarkerAlt />
                  </span>
                  <textarea
                    name="address"
                    required
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / Apartment, Street, Area"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm resize-none"
                  ></textarea>
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-bold text-[#776B5D] uppercase mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Dhaka"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-sm font-bold text-[#776B5D] uppercase mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="1212"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-[#3C352D] mb-4 border-b border-gray-100 pb-4">
              Payment Method
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-primary transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  defaultChecked
                  className="text-primary focus:ring-primary"
                />
                <div>
                  <p className="font-bold text-[#3C352D] text-sm">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-sm text-gray-400">
                    Pay securely when your package arrives at your doorstep.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Card (No Scroll) */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 h-fit rounded-3xl bg-white p-6 sm:p-8 shadow-md border border-gray-100">
            <h2 className="text-xl font-extrabold text-[#3C352D] border-b border-gray-100 pb-4">
              Order Summary ({cartItems.length} items)
            </h2>

            {/* Item List Preview - Clean full list without scrollbars */}
            <div className="mt-4 space-y-3 divide-y divide-gray-50">
              {cartItems.map((item) => {
                const itemPrice = Number(item.price) || 0;
                const itemQty = Number(item.quantity) || 1;
                return (
                  <div
                    key={item._id}
                    className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#3C352D] truncate">
                        {item.title}
                      </p>
                      <p className="text-sm text-[#776B5D]">
                        Qty:{" "}
                        <span className="font-bold text-primary">
                          {itemQty}
                        </span>{" "}
                        × ৳{itemPrice.toFixed(2)}
                      </p>
                    </div>
                    <span className="font-bold text-[#3C352D] shrink-0">
                      ৳{(itemPrice * itemQty).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Calculation Totals */}
            <div className="mt-6 pt-4 border-t border-gray-100 space-y-3 text-sm text-[#776B5D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#3C352D]">
                  ৳{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-[#3C352D]">
                  ৳{shipping.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-extrabold text-[#3C352D]">
                <span>Total Amount</span>
                <span className="text-primary">৳{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={submitting || cartItems.length === 0}
                className="btn h-13 w-full rounded-xl border-none bg-primary text-base font-bold text-white shadow-md transition hover:bg-[#e07b2f] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="animate-pulse">Processing Order...</span>
                ) : (
                  <>
                    <FaLock className="text-sm" /> Place Order Now
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 text-center text-sm text-gray-400">
              🔒 Safe & Secure Checkout for Little Heroes
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
