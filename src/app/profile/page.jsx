"use client";

import { updateUserAddress } from "@/action/server/user";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaSave,
  FaUser,
  FaPhone,
  FaCity,
} from "react-icons/fa";
import Swal from "sweetalert2";

const ProfileAddressPage = ({ initialAddress }) => {
  const [formData, setFormData] = useState({
    fullName: initialAddress?.fullName || "",
    phone: initialAddress?.phone || "",
    address: initialAddress?.address || "",
    city: initialAddress?.city || "",
    postalCode: initialAddress?.postalCode || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateUserAddress(formData);

      if (res.success) {
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "success",
          title: "Address saved successfully!",
          showConfirmButton: false,
          timer: 2000,
          background: "#3C352D",
          color: "#ffffff",
          iconColor: "#F28C38",
        });
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Could not update address.",
        confirmButtonColor: "#F28C38",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#3C352D] font-sans py-10 px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#EFE8DC]">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EAE3D2]">
          <div className="w-12 h-12 rounded-2xl bg-[#F28C38]/15 text-primary flex items-center justify-center text-xl font-bold">
            <FaMapMarkerAlt />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#3C352D]">
              Shipping Address Settings
            </h1>
            <p className="text-xs text-[#776B5D] mt-0.5">
              Update your default delivery address for faster checkout.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#776B5D] uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Maya Rahman"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#776B5D] uppercase mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+880 1700 000000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#776B5D] uppercase mb-1">
              Street Address *
            </label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="House 12, Road 5, Dhanmondi"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#776B5D] uppercase mb-1">
                City *
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

            <div>
              <label className="block text-xs font-bold text-[#776B5D] uppercase mb-1">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="1205"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary hover:bg-[#d97525] text-white font-bold text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                "Saving..."
              ) : (
                <>
                  <FaSave className="h-4 w-4" /> Save Address
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileAddressPage;
