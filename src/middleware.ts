import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --------------------------
  //    Admin authentication
  // --------------------------
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
