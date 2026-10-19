import { getOrders } from "@/action/server/order";
import UpdateAddressModal from "@/components/modal/UpdateAddressModal";
import Image from "next/image";
import Link from "next/link";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaTruck,
  FaEdit,
} from "react-icons/fa";

// Helper function for status styling
const getStatusBadge = (status = "pending") => {
  const lowerStatus = status.toLowerCase();

  switch (lowerStatus) {
    case "completed":
    case "delivered":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <FaCheckCircle className="h-3 w-3" /> Delivered
        </span>
      );
    case "processing":
    case "shipped":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800 border border-blue-200">
          <FaTruck className="h-3 w-3" /> On The Way
        </span>
      );
    case "pending":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-amber-100 text-amber-800 border border-amber-200">
          <FaClock className="h-3 w-3" /> Processing
        </span>
      );
  }
};

const MyOrderPage = async () => {
  const response = await getOrders();
  const orders = response?.orders || [];

  return (
    <div className="min-h-screen text-[#3C352D] font-sans pb-16 pt-10 px-8">
      <div>
        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#EAE3D2]">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-wider mb-2 border border-[#F28C38]/20">
              <FaShoppingBag className="h-3 w-3" /> Order History
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#3C352D]">
              My Hero Orders
            </h1>
          </div>

          <p className="text-base font-bold text-[#726b64]">
            Total Orders:{" "}
            <span className="text-primary text-base">{orders.length}</span>
          </p>
        </div>

        {/* ORDERS LIST */}
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl border border-[#EFE8DC] shadow-xs hover:shadow-md transition duration-200 overflow-hidden"
              >
                {/* ORDER HEADER BAR */}
                <div className="bg-[#FAF8F5] p-6 border-b border-[#EFE8DC] flex flex-wrap items-center justify-between gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-15 h-15 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                      <FaBoxOpen size={30} />
                    </div>
                    <div>
                      <p className="text-sm text-[#776B5D] font-bold uppercase tracking-wider">
                        Order #{order._id.slice(-8)}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-sm text-[#776B5D]">
                        <FaCalendarAlt className="h-3 w-3 text-primary" />
                        <span>
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "Recent Order"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* ORDER CONTENT */}
                <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  {/* ITEMS PREVIEW */}
                  <div className="lg:col-span-7 space-y-3">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-2 rounded-2xl hover:bg-[#FAF8F5] transition"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <Image
                            src={item.image || "https://placehold.co/100x100"}
                            alt={item.title || "Hero Toy"}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-[#3C352D] truncate">
                            {item.title}
                          </h4>
                          <p className="text-sm text-[#776B5D] mt-0.5">
                            Qty:{" "}
                            <span className="font-semibold text-[#3C352D]">
                              {item.quantity}
                            </span>{" "}
                            × ৳{item.price}
                          </p>
                        </div>

                        <div className="text-right font-bold text-sm text-[#3C352D]">
                          ৳
                          {(Number(item.price) || 0) *
                            (Number(item.quantity) || 1)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SHIPPING & SUMMARY */}
                  <div className="lg:col-span-5 bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#EFE8DC] space-y-3">
                    <div className="text-sm text-[#776B5D]">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold uppercase text-[#3C352D] flex items-center gap-1.5">
                          <FaMapMarkerAlt className="text-primary" /> Shipping
                          Address
                        </p>
                      </div>

                      <p className="font-semibold text-[#3C352D]">
                        {order.shippingAddress?.fullName}
                      </p>
                      <p className="line-clamp-2">
                        {order.shippingAddress?.address},{" "}
                        {order.shippingAddress?.city}
                        {order.shippingAddress?.postalCode
                          ? ` - ${order.shippingAddress.postalCode}`
                          : ""}
                      </p>
                      <p className="mt-1">📞 {order.shippingAddress?.phone}</p>

                      {/* EDIT SHIPPING ADDRESS MODAL (Active for Pending Orders) */}
                      <div className="mt-2 pt-2 border-t border-[#EAE3D2]/60">
                        <UpdateAddressModal order={order} />
                      </div>
                    </div>

                    <div className="border-t border-[#EAE3D2] pt-3 flex items-center justify-between text-sm">
                      <span className="font-bold text-[#776B5D]">
                        Payment Method:
                      </span>
                      <span className="font-extrabold uppercase text-[#3C352D] bg-white px-2.5 py-0.5 rounded-lg border border-gray-200 text-sm">
                        {order.paymentMethod || "COD"}
                      </span>
                    </div>

                    <div className="border-t border-[#EAE3D2] pt-3 flex items-center justify-between text-base">
                      <span className="font-extrabold text-[#3C352D]">
                        Total Amount:
                      </span>
                      <span className="font-extrabold text-primary text-lg">
                        ৳{order.pricing?.totalAmount || order.totalAmount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl border border-[#EFE8DC] p-12 text-center max-w-md mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-2xl">
              <FaShoppingBag />
            </div>
            <h3 className="text-xl font-extrabold text-[#3C352D]">
              No Orders Found
            </h3>
            <p className="text-sm text-[#776B5D] mt-2 leading-relaxed">
              Looks like you haven&apos;t placed any orders yet. Discover our
              latest STEM toys and start building!
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-[#d97525] text-white font-bold text-sm transition shadow-md"
            >
              Start Shopping Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrderPage;