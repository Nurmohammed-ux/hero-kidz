"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import GoogleLoginBtn from "@/components/buttons/GoogleLoginBtn";
import Logo from "@/components/layouts/Logo";

export default function LoginPage() {
  const params = useSearchParams();
  const callBack = params.get("callbackUrl") || "/";
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        Swal.fire({
          title: "Successful!",
          text: "You successfully login into Hero Kidz!",
          icon: "success",
        });
        router.push(callBack);
        router.refresh();
      } else {
        Swal.fire("error", "Invalid email or password");
      }
    } catch {
      Swal.fire("error", "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF9EF] flex items-center justify-center p-4 sm:p-8">
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

            {/* Made the image bigger here */}
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

        {/* Right: Login Form */}
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
                Welcome back! 👋
              </span>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[#303030] sm:text-4xl">
                Let’s Sign You In
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Sign in to discover more fun for your little ones.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="Enter your email"
                  className="input input-bordered h-13 w-full rounded-xl border-gray-200 bg-[#FFFCF8] focus:border-primary focus:outline-none"
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
                    placeholder="Enter your password"
                    className="input input-bordered h-13 w-full rounded-xl border-gray-200 bg-[#FFFCF8] pr-12 focus:border-primary focus:outline-none"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-primary"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn h-13 w-full rounded-xl border-none bg-primary text-base font-bold text-white shadow-md transition hover:bg-primary hover:shadow-lg"
              >
                Login to Your Account
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
              <span className="text-xs text-gray-400">NEW TO HERO KIDZ?</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href={`/register?callbackUrl=${callBack.slice(1)}`}
                className="font-bold text-primary transition hover:underline"
              >
                Register
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
