import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALWAYS_ALLOW = [
  "/api/",
  "/_next/",
  "/fonts/",
  "/sounds/",
  "/assets/",
  "/illustration/",
];

const BLOCK_PATTERNS = [
  /^\/(wp-admin|wp-login|wp-content|wp-includes)/i,
  /^\/(\.env|\.git|\.well-known\/)/i,
  /^\/(phpmyadmin|adminer|phpinfo)/i,
  /\.(php|asp|aspx|jsp|cgi)$/i,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (ALWAYS_ALLOW.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  if (/\.\w+$/.test(pathname)) {
    return NextResponse.next();
  }

  if (BLOCK_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
