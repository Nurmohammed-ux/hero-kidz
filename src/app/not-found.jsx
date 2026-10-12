import Link from "next/link";
import { FaExclamationTriangle, FaHome, FaSearch } from "react-icons/fa";

const Error404 = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      {/* Playful Icon / Illustration Container */}
      <div className="relative mb-8">
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <FaExclamationTriangle className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
        </div>
        <span className="absolute -top-2 right-1/4 bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md rotate-12">
          Oops! 404
        </span>
      </div>

      {/* Heading & Subtitle */}
      <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight mb-4">
        Page Not Found
      </h1>

      <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto mb-8 font-medium">
        Looks like this toy rolled away! The page you are looking for might have
        been removed or is temporarily unavailable.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-md">
        <Link
          href="/"
          className="btn btn-primary btn-lg rounded-2xl shadow-md hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 font-bold w-full sm:w-auto px-6"
        >
          <FaHome className="w-5 h-5" />
          Back to Home
        </Link>

        <Link
          href="/products"
          className="btn btn-outline btn-lg border-primary text-primary hover:bg-primary hover:text-white rounded-2xl font-bold w-full sm:w-auto px-6"
        >
          <FaSearch className="w-4 h-4" />
          Explore All Toys
        </Link>
      </div>
    </div>
  );
};

export default Error404;
