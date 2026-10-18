"use client";

import { handleCart } from "@/action/server/cart";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
  const router = useRouter();
  const { status } = useSession();
  const isLogin = status === "authenticated";
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async () => {
    setIsLoading(true);
    if (isLogin) {
      const result = await handleCart({ product, inc: true });
      if (result.success) {
        Swal.fire({
          title: "Added to Cart! 🛒",
          html: `Added <b>${product.title}</b> to your shopping cart.`,
          icon: "success",
          confirmButtonText: "Continue Shopping",
          confirmButtonColor: "oklch(65% 0.23 35)",
          customClass: {
            popup: "rounded-3xl p-6 font-sans",
            confirmButton:
              "rounded-xl font-bold px-6 py-3 text-white shadow-md",
          },
          buttonsStyling: true,
        });
        setIsLoading(false);
      }
    } else {
      router.push(`/login?callbackUrl=${path}`);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={() => addToCart()}
      disabled={status === "loading" || isLoading || product.quantity === 0}
      className="btn btn-lg btn-primary rounded-xl flex items-center justify-center gap-1.5 text-sm font-semibold shadow-sm hover:bg-white hover:text-primary hover:shadow-md hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FaShoppingCart className="h-4 w-4" />
      {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
    </button>
  );
};

export default CartButton;
