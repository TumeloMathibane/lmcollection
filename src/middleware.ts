import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isOpen =
    // process.env.VERCEL_ENV === "production"
    process.env.NEXT_PUBLIC_LAUNCH_DATE
      ? Date.now() >
        new Date(`${process.env.NEXT_PUBLIC_LAUNCH_DATE}`).getTime()
      : false;

  // -------------------------
  // 1. Launch mode
  // -------------------------
  if (!isOpen && pathname !== "/coming-soon") {
    const url = request.nextUrl.clone();
    url.pathname = "/coming-soon";
    return NextResponse.redirect(url);
  } else if (isOpen && pathname === "/coming-soon") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // -------------------------
  // 2. Admin authentication
  // -------------------------
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/auth")) {
    const token = await getToken({ req: request });
    const isAuth = !!token;

    if (!isAuth) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/auth/signin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
