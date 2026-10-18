import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoute = ["/dashboard", "/cart", "/checkout"];
// This function can be marked `async` if using `await` inside
export async function proxy(req) {
  const token = await getToken({ req });
  const isAuthenticated = Boolean(token);
  const reqPath = req.nextUrl.pathname;
  const isPrivateReq = privateRoute.some((route) => reqPath.startsWith(route));

  if (!isAuthenticated && isPrivateReq) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${reqPath}`, req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/cart/:path*", "/checkout/:path*"],
};
