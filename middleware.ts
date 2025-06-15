// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Add paths that require authentication
const protectedPaths = ["/account", "/checkout"]
// Add paths that require admin access
const adminPaths = ["/admin"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path))

  // Get the user from the session
  const user = request.cookies.get("user")?.value

  // If it's a protected path and there's no user, redirect to login
  if (isProtectedPath && !user) {
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // If it's an admin path, check for admin role
  if (isAdminPath) {
    if (!user) {
      const url = new URL("/login", request.url)
      url.searchParams.set("from", pathname)
      return NextResponse.redirect(url)
    }

    try {
      const userData = JSON.parse(user)
      if (userData.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
