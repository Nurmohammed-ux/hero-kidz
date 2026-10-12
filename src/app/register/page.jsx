"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postUser } from "@/action/server/auth";
import GoogleLoginBtn from "@/components/buttons/GoogleLoginBtn";
import Logo from "@/components/layouts/Logo";

export default function RegisterPage() {
  const params = useSearchParams();
  const callBack = params.get("callbackUrl") || "/";
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const payLoad = {
      name,
      email,
      password,
    };

    // Add your registration logic here
    try {
      const res = await postUser(payLoad);
      if (res.acknowledged) {
        await Swal.fire({
          title: "Success! 🎉",
          text: "User created successfully. Please login.",
          icon: "success",
          confirmButtonColor: "oklch(65% 0.23 35)",
          confirmButtonText: "Go to Login",
        });
        router.push(callBack);
      } else {
        Swal.fire({
          title: "Registration Failed",
          text: "Could not create your account. Please try again.",
          icon: "error",
          confirmButtonColor: "oklch(65% 0.23 35)",
        });
      }
    } catch {
      Swal.fire({
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "oklch(65% 0.23 35)",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF9EF] flex items-center justify-center p-4">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
        {/* Left: Hero Image */}
        <section className="relative hidden min-h-162.5 lg:items-center lg:justify-center overflow-hidden bg-[#FFF0D6] p-8 lg:flex lg:flex-col">
          <div className="absolute left-54 top-8 z-10">
            <Link href="/">
              <Image
                src="/assets/logo.png"
                alt="Hero Kidz logo"
                width={145}
                height={100}
                className="h-auto w-32 object-contain"
                priority
              />
            </Link>
          </div>

          <div className="absolute left-10 top-36 h-20 w-20 rounded-full bg-[#FFD166]/50 blur-2xl" />
          <div className="absolute bottom-20 right-10 h-32 w-32 rounded-full bg-[#FFB5A7]/50 blur-2xl" />

          <div className="relative z-10 mt-12 flex justify-center items-center flex-col">
            <h2 className="text-4xl font-extrabold leading-tight text-[#3C352D] text-center">
              Little Toys,
              <br />
              <span className="text-primary">Big Smiles!</span>
            </h2>

            <p className="mt-4 text-center text-base leading-7 text-[#776B5D] max-w-sm">
              Discover a world of fun, creativity, and wonderful adventures for
              your little ones.
            </p>

            <div className="my-6">
              <Image
                src="/assets/hero.png"
                alt="Hero Kidz illustration"
                width={240}
                height={320}
                className="h-auto w-52 object-contain"
                priority
              />
            </div>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-sm font-semibold text-[#776B5D] shadow-sm">
              <span>🧸</span> Play, learn, grow, and smile!
            </div>
          </div>
        </section>

        {/* Right: Register Form */}
        <section className="flex min-h-162.5 items-center justify-center px-6 py-10 sm:px-12 lg:px-14">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left flex flex-col justify-center items-center">
              <Link href="/" className="inline-block lg:hidden">
                <Image
                  src="/assets/logo.png"
                  alt="Hero Kidz logo"
                  width={145}
                  height={100}
                  className="h-auto w-32 object-contain"
                  priority
                />
              </Link>

              <span className="inline-block rounded-full bg-[#FFF0D6] px-4 py-2 text-sm font-bold text-[#D97722]">
                Join the fun! 🎉
              </span>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[#303030] sm:text-4xl">
                Create an Account
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Sign up to start your journey with Hero Kidz.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name Input Field */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered h-13 w-full rounded-xl border-gray-200 bg-[#FFFCF8] focus:border-[oklch(65% 0.23 35)] focus:outline-none"
                  autoComplete="name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Choose a email"
                  className="input input-bordered h-13 w-full rounded-xl border-gray-200 bg-[#FFFCF8] focus:border-[oklch(65% 0.23 35)] focus:outline-none"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="input input-bordered h-13 w-full rounded-xl border-gray-200 bg-[#FFFCF8] pr-12 focus:border-[oklch(65% 0.23 35)] focus:outline-none"
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[oklch(65% 0.23 35)]"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn h-13 w-full rounded-xl border-none bg-primary text-base font-bold text-white shadow-md transition hover:bg-primary hover:shadow-lg mt-2"
              >
                Create Account
              </button>
            </form>

            {/* Divider between Login Button and Google Login Button */}
            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Google Login Button */}
            <Suspense
              fallback={
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xs">
                  {/* Centered Brand / Loading Container */}
                  <div className="flex flex-col items-center space-y-6 p-8 rounded-3xl bg-base-100 shadow-xl border border-border/40 animate-in fade-in zoom-in duration-300">
                    {/* Animated Logo Wrapper */}
                    <div className="relative flex items-center justify-center p-4">
                      {/* Outer Ring Pulse */}
                      <div className="absolute inset-0 rounded-3xl bg-primary/20 animate-ping" />

                      {/* Render your custom Logo component */}
                      <div className="relative z-10 scale-125 transform">
                        <Logo />
                      </div>
                    </div>

                    {/* Loading Subtext / Message */}
                    <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase pt-2">
                      Loading fun toys for you...
                    </p>

                    {/* Bouncing Loading Dots */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" />
                    </div>
                  </div>
                </div>
              }
            >
              <GoogleLoginBtn />
            </Suspense>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">
                ALREADY HAVE AN ACCOUNT?
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-primary transition hover:underline"
              >
                Login
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-gray-400">
              Made with ❤️ for little explorers
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
