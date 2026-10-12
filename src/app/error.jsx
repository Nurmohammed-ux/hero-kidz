"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error for debugging/monitoring
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-6">
      {" "}
      <div className="max-w-lg w-full text-center">
        {" "}
        <div className="mb-6">
          {" "}
          <div className="text-7xl font-bold text-error">500 </div>{" "}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Something went wrong
        </h1>
        <p className="text-base-content/70 mb-8">
          We couldn&apos;t complete your request. Something unexpected happened.
          Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => reset()} className="btn btn-primary">
            Try Again
          </button>

          <Link href="/" className="btn btn-outline">
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
