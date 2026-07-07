import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("ycomp_role")?.value;
  const hasCustomerSession = request.cookies.has("ycomp_session");

  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && role !== "admin" && role !== "manager") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/account") && !hasCustomerSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"]
};
