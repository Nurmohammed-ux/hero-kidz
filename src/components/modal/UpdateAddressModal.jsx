"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { updateOrderAddress } from "@/action/server/order";
import { FaEdit, FaMapMarkerAlt, FaTimes, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";

const UpdateAddressModal = ({ order, onAddressUpdated }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize state directly from props/session without an useEffect
  const [formData, setFormData] = useState({
    fullName: order.shippingAddress?.fullName || session?.user?.name || "",
    phone: order.shippingAddress?.phone || "",
    address: order.shippingAddress?.address || "",
    city: order.shippingAddress?.city || "",
    postalCode: order.shippingAddress?.postalCode || "",
  });

  const handleOpenModal = () => {
    // Reset form values to latest order data when modal opens
    setFormData({
      fullName: order.shippingAddress?.fullName || session?.user?.name || "",
      phone: order.shippingAddress?.phone || "",
      address: order.shippingAddress?.address || "",
      city: order.shippingAddress?.city || "",
      postalCode: order.shippingAddress?.postalCode || "",
    });
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateOrderAddress(order._id, formData);

      if (res.success) {
        Swal.fire({
          toast: true,
          position: "center",
          icon: "success",
          title: "Shipping address updated!",
          showConfirmButton: false,
          timer: 2000,
          background: "#3C352D",
          color: "#ffffff",
          iconColor: "#F28C38",
        });

        setIsOpen(false);
        if (onAddressUpdated) onAddressUpdated();
      } else {
        Swal.fire({
          icon: "error",
          title: "Cannot Update",
          text: res.message,
          confirmButtonColor: "#F28C38",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update shipping address.",
        confirmButtonColor: "#F28C38",
      });
    } finally {
      setLoading(false);
    }
  };

  // Only allow editing if status is pending
  if (order.status !== "pending") return null;

  return (
    <>
      {/* TRIGGER BUTTON */}
      <button
        onClick={handleOpenModal}
        className="text-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer mt-2"
      >
        <FaEdit className="h-3 w-3" /> Edit Delivery Address
      </button>

      {/* MODAL OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative border border-[#E0D8CC]">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-[#3C352D] transition cursor-pointer"
            >
              <FaTimes className="h-3.5 w-3.5" />
            </button>

            {/* HEADER */}
            <div className="flex items-center gap-2 text-primary mb-4">
              <FaMapMarkerAlt className="h-5 w-5" />
              <h3 className="font-extrabold text-base text-[#3C352D]">
                Update Shipping Address
              </h3>
            </div>
            <p className="text-xs text-[#776B5D] mb-4">
              Order ID:{" "}
              <span className="font-bold text-[#3C352D]">
                #{order._id.slice(-8)}
              </span>
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* READ ONLY: FULL NAME */}
              <div>
                <label className="block text-[11px] font-bold text-[#776B5D] uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  readOnly
                  value={formData.fullName}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-100/80 text-gray-500 text-sm cursor-not-allowed select-none font-medium"
                />
              </div>

              {/* READ ONLY: PHONE NUMBER */}
              <div>
                <label className="block text-[11px] font-bold text-[#776B5D] uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  readOnly
                  value={formData.phone}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-100/80 text-gray-500 text-sm cursor-not-allowed select-none font-medium"
                />
              </div>

              {/* EDITABLE: STREET ADDRESS */}
              <div>
                <label className="block text-[11px] font-bold text-[#776B5D] uppercase mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#F28C38] text-sm bg-white text-[#3C352D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* EDITABLE: CITY */}
                <div>
                  <label className="block text-[11px] font-bold text-[#776B5D] uppercase mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#F28C38] text-sm bg-white text-[#3C352D]"
                  />
                </div>

                {/* EDITABLE: POSTAL CODE */}
                <div>
                  <label className="block text-[11px] font-bold text-[#776B5D] uppercase mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#F28C38] text-sm bg-white text-[#3C352D]"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-xs text-[#3C352D] cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-[#d97525] text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
                >
                  <FaSave className="h-3 w-3" />
                  {loading ? "Saving..." : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateAddressModal;
