"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { status } = useSession();
  const isLogin = status === "authenticated";
  const path = usePathname();

  const { title, image, price, discount, ratings, reviews, sold } = product;

  const addToCart = () => {
    if (isLogin) {
      Swal.fire({
        title: "Added to Cart! 🛒",
        html: `Added <b>${title}</b> to your shopping cart.`,
        icon: "success",
        confirmButtonText: "Continue Shopping",
        confirmButtonColor: "oklch(65% 0.23 35)",
        customClass: {
          popup: "rounded-3xl p-6 font-sans",
          confirmButton: "rounded-xl font-bold px-6 py-3 text-white shadow-md",
        },
        buttonsStyling: true,
      });
    } else {
      router.push(`/login?callbackUrl=${path}`);
    }
  };

  // Calculate discount price if discount exists
  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  return (
    <div className="card bg-base-100 border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group flex flex-col justify-between">
      {/* Edge-to-Edge Image Container at the Top */}
      <div className="relative w-full h-80 overflow-hidden bg-muted/20">
        {/* Discount Badge (Top Right) */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 z-10 px-5 py-1 text-sm font-bold text-white bg-primary rounded-full shadow-md">
            {discount}% OFF
          </span>
        )}

        {/* Sold Count Badge (Top Left) */}
        {sold && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[11px] font-medium text-muted-foreground bg-background/90 backdrop-blur-md rounded-lg border border-border/50 shadow-xs">
            Sold: {sold}
          </span>
        )}

        {/* Product Image with Hover Zoom */}
        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Card Body Content */}
      <div className="p-5 flex flex-col grow space-y-3">
        {/* Ratings & Reviews Row */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-md font-semibold">
            <FaStar className="h-3.5 w-3.5 fill-amber-500" />
            <span>{ratings}</span>
          </div>
          <span>({reviews} reviews)</span>
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-foreground text-xl line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-2xl font-extrabold text-primary">
            ৳{discountedPrice}
          </span>
          {discount > 0 && (
            <span className="text-base text-muted-foreground line-through">
              ৳{price}
            </span>
          )}
        </div>

        {/* Action Buttons (View Details & Add to Cart) */}
        <div className="grid grid-cols-2 gap-2 pt-4 mt-auto">
          <Link
            href={`/products/${product._id}`}
            className="btn btn-lg btn-outline btn-primary hover:bg-primary rounded-xl flex items-center justify-center gap-1.5 text-sm font-semibold"
          >
            <FaEye className="h-4.5 w-4.5" />
            Details
          </Link>

          <button
            onClick={() => addToCart()}
            className="btn btn-lg btn-primary rounded-xl flex items-center justify-center gap-1.5 text-sm font-semibold shadow-sm hover:bg-white hover:text-primary hover:shadow-md hover:shadow-primary/30"
          >
            <FaShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
