import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export function middleware(request: NextRequest) {
  if(typeof window === "undefined"){
    return;
  }
  const token = window.localStorage.getItem("token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  try {
    jwt.verify(token, JWT_SECRET)
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/shops/:path*", "/users/:path*"],
}

