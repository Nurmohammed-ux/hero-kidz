"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { handleCart, deleteItemFromCart } from "@/action/server/cart";
import Swal from "sweetalert2";

const CartItem = ({ item }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Handle item deletion
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Remove item?",
      text: "Do you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F28C38",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    if (confirm.isConfirmed) {
      try {
        setLoading(true);
        const res = await deleteItemFromCart(item._id);

        if (res.success) {
          router.refresh();
          Swal.fire({
            toast: true,
            position: "center",
            icon: "success",
            title: "Item removed from cart",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire("Error", "Could not remove item from cart.", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Something went wrong.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle quantity update with confirmation popup
  const handleQuantityChange = async (increment) => {
    // 1. Prevent going above 10 quantity
    if (increment && Number(item.quantity) >= 10) {
      Swal.fire({
        icon: "info",
        title: "Maximum Limit Reached",
        text: "You cannot add more than 10 quantities of a single item for your little hero!",
        confirmButtonColor: "#F28C38",
      });
      return;
    }

    // 2. If quantity is 1 and user clicks minus, trigger deletion confirmation
    if (!increment && Number(item.quantity) <= 1) {
      handleDelete();
      return;
    }

    // 3. Ask for confirmation BEFORE changing quantity
    const actionText = increment ? "increase" : "decrease";
    const confirm = await Swal.fire({
      title: `${increment ? "Increase" : "Decrease"} quantity?`,
      text: `Do you want to ${actionText} the quantity for "${item.title}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#F28C38",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionText} it!`,
    });

    // If user cancels, stop here
    if (!confirm.isConfirmed) return;

    // 4. Proceed with updating cart on server
    try {
      setLoading(true);
      const res = await handleCart({
        product: {
          _id: item.productId || item._id,
          price: item.price,
          title: item.title,
          image: item.image,
        },
        inc: increment,
      });

      if (res.success) {
        router.refresh();

        // Show toast notification for success
        Swal.fire({
          toast: true,
          position: "center",
          icon: "success",
          title: "Quantity updated successfully!",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } else {
        Swal.fire("Error", "Could not update cart quantity.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-white p-4 sm:p-6 shadow-sm transition hover:shadow-md ${
        loading ? "opacity-55 pointer-events-none" : ""
      }`}
    >
      {/* Product Image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#FFF9EF] border border-gray-100 flex items-center justify-center">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title || "Product image"}
            fill
            sizes="96px"
            className="object-contain p-2"
          />
        ) : (
          <span className="text-2xl">🧸</span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-bold text-[#3C352D] text-lg line-clamp-1">
          {item.title}
        </h3>
        <p className="mt-1 text-sm font-semibold text-primary">
          ৳{Number(item.price || 0).toFixed(2)}
        </p>
        <div className="mt-2 text-xs text-gray-400">
          Seller / Added by: {item.username || "Hero Kidz Store"}
        </div>
      </div>

      {/* Quantity Controls & Total */}
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
        {/* Quantity Increment/Decrement Buttons */}
        <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-2 py-1.5 border border-gray-200">
          <button
            type="button"
            onClick={() => handleQuantityChange(false)}
            disabled={item.quantity <= 1 || loading}
            aria-label="Decrease quantity"
            className="h-7 w-7 flex items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm transition hover:text-primary hover:bg-primary/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600"
          >
            <FaMinus className="text-[10px]" />
          </button>

          <span className="w-6 text-center font-bold text-[#3C352D]">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => handleQuantityChange(true)}
            disabled={item.quantity >= 10 || loading}
            aria-label="Increase quantity"
            className="h-7 w-7 flex items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm transition hover:bg-primary/20 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600"
          >
            <FaPlus className="text-[10px]" />
          </button>
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-400">Total</div>
          <div className="font-extrabold text-[#3C352D]">
            ৳{(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}
          </div>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          aria-label="Remove item"
          className="rounded-lg p-2.5 text-red-300 transition hover:bg-red-100 hover:text-red-700"
        >
          <FaTrash className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
