import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Admin route protection
    if (req.nextUrl.pathname.startsWith("/admin")) {
      const isAdmin = req.nextauth.token?.isAdmin
      
      if (!isAdmin) {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/demo-app/:path*",
    "/account/:path*",
    "/file-upload/:path*",
    "/admin/:path*",
  ],
}