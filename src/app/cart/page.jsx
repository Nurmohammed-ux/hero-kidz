import Link from "next/link";
import { getCart } from "@/action/server/cart";
import { FaArrowLeft, FaShoppingBag } from "react-icons/fa";
import CartItem from "@/components/cards/CartItem";

const CartPage = async () => {
  const rawCartItems = await getCart();

  // Convert MongoDB ObjectId to string to prevent Client Component serialization warnings
  const cartItems = rawCartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
    productId: item.productId ? item.productId.toString() : item._id.toString(),
  }));

  // Calculate total price safely
  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return acc + price * qty;
  }, 0);

  const shipping = subtotal > 0 ? 50 : 0; // Example flat shipping cost
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFF9EF] flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF0D6] text-4xl">
            🛒
          </div>
          <h1 className="text-2xl font-extrabold text-[#3C352D]">
            Your Cart is Empty!
          </h1>
          <p className="mt-2 text-sm text-[#776B5D]">
            Looks like you haven&apos;t added any fun toys or tools for your
            little explorers yet.
          </p>
          <div className="mt-8">
            <Link
              href="/products"
              className="btn h-12 w-full rounded-xl border-none bg-primary text-base font-bold text-white shadow-md transition hover:bg-primary"
            >
              Explore Toys & Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-10 px-6">
      <div className="">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-[#FFF0D6] px-4 py-1.5 text-sm font-bold text-primary">
              Shopping Bag 🎒
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-[#3C352D] sm:text-4xl">
              Your Hero Cart ({cartItems.length})
            </h1>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary transition hover:underline"
          >
            <FaArrowLeft className="text-sm" /> Continue Shopping
          </Link>
        </div>

        {/* Content Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          {/* Right: Order Summary Card */}
          {/* Right: Order Summary Card */}
          <div className="h-fit rounded-3xl bg-white p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-extrabold text-[#3C352D] border-b border-gray-100 pb-4">
              Order Summary
            </h2>

            {/* Individual Item Breakdown */}
            <div className="mt-4 max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-gray-50">
              {cartItems.map((item) => {
                const itemPrice = Number(item.price) || 0;
                const itemQty = Number(item.quantity) || 1;
                const itemTotal = itemPrice * itemQty;

                return (
                  <div
                    key={item._id}
                    className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#3C352D] truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#776B5D]">
                        Qty:{" "}
                        <span className="font-bold text-[#F28C38]">
                          {itemQty}
                        </span>{" "}
                        × ৳{itemPrice.toFixed(2)}
                      </p>
                    </div>
                    <span className="font-bold text-[#3C352D] shrink-0">
                      ৳{itemTotal.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Totals Section */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 text-sm text-[#776B5D]">
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
                <h4>Total Amount</h4>
                <p className="text-[#F28C38]">৳ {total.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={cartItems.length === 0 ? "#" : "/checkout"}
                aria-disabled={cartItems.length === 0}
                tabIndex={cartItems.length === 0 ? -1 : undefined}
                className={`btn h-13 w-full rounded-xl border-none bg-primary text-base font-bold text-white shadow-md transition flex items-center justify-center gap-2 ${
                  cartItems.length === 0
                    ? "opacity-50 pointer-events-none cursor-not-allowed"
                    : "hover:shadow-lg"
                }`}
              >
                <FaShoppingBag /> Proceed to Checkout
              </Link>
            </div>

            <div className="mt-4 text-center text-sm text-gray-400">
              🔒 Safe & Secure Checkout for Little Heroes
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
