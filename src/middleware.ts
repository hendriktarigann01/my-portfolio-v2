// Tujuan      : Route middleware — redirect invalid paths, block scanner bots
// Caller      : Next.js (otomatis, runs sebelum route handler)
// Dependensi  : next/server
// Main Exports: middleware, config
// Side Effects: redirect / rewrite response

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Known static routes (tanpa dynamic [slug])
const KNOWN_ROUTES = new Set(["/", "/works"]);

// Known dynamic route prefixes
const DYNAMIC_PREFIXES = ["/works/"];

// Paths that are always valid (assets, api, next internals)
const ALWAYS_ALLOW = [
  "/api/",
  "/_next/",
  "/fonts/",
  "/sounds/",
  "/assets/",
  "/illustration/",
];

// Common bot/scanner paths to block early
const BLOCK_PATTERNS = [
  /^\/(wp-admin|wp-login|wp-content|wp-includes)/i,
  /^\/(\.env|\.git|\.well-known\/)/i,
  /^\/(phpmyadmin|adminer|phpinfo)/i,
  /\.(php|asp|aspx|jsp|cgi)$/i,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets & internals
  if (ALWAYS_ALLOW.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Skip files with extensions (favicon.ico, manifest.json, .svg, .png, etc)
  if (/\.\w+$/.test(pathname)) {
    return NextResponse.next();
  }

  // Block common scanner/bot paths → return 404 immediately
  if (BLOCK_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return NextResponse.rewrite(new URL("/not-found-page", request.url));
  }

  // Known exact routes → allow
  if (KNOWN_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  // Known dynamic prefixes → allow (slug validation happens in page component)
  if (DYNAMIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Unknown route → let Next.js handle with not-found
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
