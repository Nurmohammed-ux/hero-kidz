import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

const GoogleLoginBtn = () => {
  const params = useSearchParams();

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: params.get("callbackUrl") || "/",
    });
  };
  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn h-13 w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-base font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.14C3.15 21.36 7.23 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.18C.43 8.12 0 9.8 0 12s.43 3.88 1.18 5.38l4.09-3.14z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.15 2.64 1.18 6.62l4.09 3.14c.95-2.85 3.6-4.96 6.73-4.96z"
          />
        </svg>
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleLoginBtn;
