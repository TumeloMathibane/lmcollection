// middleware.ts (in root of project, same level as app folder)
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuth = !!token;
  const isAuthPage = request.nextUrl.pathname.startsWith("/admin/auth");
  const isOpen = Date.now() >= new Date("2026-04-01 12:00").getTime();

  if (!isOpen) {
    return NextResponse.redirect(new URL("/coming-soon", request.url));
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Redirect unauthenticated users to signin
  if (!isAuth && !isAuthPage) {
    let from = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }

    return NextResponse.redirect(
      new URL(
        `/admin/auth/signin?from=${encodeURIComponent(from)}`,
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

// Specify which routes to protect
// Specify which routes to protect
export const config = {
  matcher: ["/"],
};
