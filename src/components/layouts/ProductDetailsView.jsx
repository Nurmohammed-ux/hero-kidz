"use client";
import { useState } from "react";
import Image from "next/image";
import {
  FaStar,
  FaShoppingCart,
  FaCheckCircle,
  FaQuestionCircle,
  FaShieldAlt,
  FaTruck,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const ProductDetailsView = ({ product, banglaFontClass }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const router = useRouter();
  const path = usePathname();
  const { status } = useSession();
  const isLogin = status === "authenticated";

  if (!product) return null;

  const {
    title,
    bangla,
    image,
    price,
    discount,
    description,
    qna,
    reviews,
    sold,
    ratings,
    info,
  } = product;

  const addToCart = () => {
    if (isLogin) {
      Swal.fire({
      title: "Added to Cart! 🛒",
      html: `Added <b>${quantity}</b> x <b>${title}</b> to your shopping cart.`,
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

  // Calculate discounted price
  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="px-6 lg:px-8 py-10">
      {/* Top Section: Image & Main Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left: Product Image Showcase */}
        <div className="relative w-full h-120 lg:h-160 rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
          {discount > 0 && (
            <span className="absolute top-4 right-4 z-10 px-4 py-1.5 text-sm font-extrabold text-white bg-primary rounded-full shadow-md animate-pulse">
              {discount}% OFF
            </span>
          )}
          {sold && (
            <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-background/90 backdrop-blur-md rounded-xl border border-border/50">
              🔥 Sold: {sold} units
            </span>
          )}
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right: Product Meta & Purchase Options */}
        <div className="flex flex-col space-y-6">
          {/* Bengali Title / Subtitle */}
          {bangla && (
            <h2
              className={`${banglaFontClass} text-6xl sm:text-5xl font-bold text-primary font-heading tracking-wide`}
            >
              {bangla}
            </h2>
          )}

          {/* English Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {title}
          </h1>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-600 px-3 py-1 rounded-lg font-bold text-sm">
              <FaStar className="h-4 w-4 fill-amber-500" />
              <span>{ratings}</span>
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              ({reviews} customer reviews)
            </span>
          </div>

          {/* Price Tag */}
          <div className="flex items-baseline gap-3 pt-4 border-t border-gray-300 border-dashed">
            <span className="text-3xl sm:text-4xl font-black text-primary">
              ৳{discountedPrice}
            </span>
            {discount > 0 && (
              <span className="text-lg text-muted-foreground line-through font-semibold">
                ৳{price}
              </span>
            )}
            <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600">
              In Stock & Ready
            </span>
          </div>

          {/* Key Highlights / Info Bullets */}
          {info && info.length > 0 && (
            <div className="bg-muted/30 rounded-xl pt-4 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Key Features
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {info.map((item, idx) => (
                  <li
                    key={idx}
                    className={`${banglaFontClass} flex items-center gap-2 text-lg text-foreground font-medium`}
                  >
                    <FaCheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity Counter & Add To Cart */}
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-foreground">
                Quantity:
              </span>
              <div className="flex items-center border border-border rounded-xl bg-base-100 overflow-hidden shadow-xs">
                <button
                  onClick={handleDecrement}
                  className="px-3.5 py-2.5 text-muted-foreground hover:bg-muted transition-colors"
                >
                  <FaMinus className="h-3 w-3" />
                </button>
                <span className="px-4 text-base font-bold text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="px-3.5 py-2.5 text-muted-foreground hover:bg-muted transition-colors"
                >
                  <FaPlus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <button
                onClick={() => addToCart()}
                className="btn btn-lg btn-primary rounded-2xl shadow-md hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 font-bold hover:bg-white hover:text-primary"
              >
                <FaShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <button
                onClick={() =>
                  alert(`Proceeding to checkout for ${quantity}x ${title}`)
                }
                className="btn btn-lg btn-outline border-primary text-primary hover:bg-primary hover:text-white rounded-2xl font-bold"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/40 text-xs text-muted-foreground">
            <div className="flex items-center gap-2.5">
              <FaShieldAlt className="h-5 w-5 text-primary shrink-0" />
              <span>100% Child-Safe & Non-Toxic Material</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FaTruck className="h-5 w-5 text-primary shrink-0" />
              <span>Fast Delivery Across Bangladesh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tabs Section (Description & QnA) */}
      <div className="mt-16 bg-base-100 rounded-xl p-6 sm:p-10 shadow-sm">
        {/* Tab Headers */}
        <div className="flex items-center gap-4 border-b border-gray-300 border-dashed pb-6">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-2 text-lg font-bold transition-all relative ${
              activeTab === "description"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Detailed Description
            {activeTab === "description" && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("qna")}
            className={`pb-2 text-lg font-bold transition-all relative ${
              activeTab === "qna"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Questions & Answers ({qna?.length || 0})
            {activeTab === "qna" && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-6">
          {activeTab === "description" ? (
            <div
              className={`${banglaFontClass} prose max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-xl lg:text-2xl`}
            >
              {description}
            </div>
          ) : (
            <div className="space-y-4">
              {qna && qna.length > 0 ? (
                qna.map((item, index) => (
                  <div
                    key={index}
                    className="collapse collapse-plus bg-muted/20 border border-gray-300 rounded-xl"
                  >
                    <input type="checkbox" defaultChecked={index === 0} />
                    <div className="collapse-title text-base font-bold text-foreground flex items-center gap-2">
                      <FaQuestionCircle className="text-primary h-4 w-4 shrink-0" />
                      {item.question}
                    </div>
                    <div className="collapse-content text-sm sm:text-base text-muted-foreground font-medium pl-6">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No questions found for this product.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsView;
