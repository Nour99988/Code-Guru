import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export const config = { matcher: ["/api/signup/", "/signup/", "/profile/", "/login/", "/"] };

export async function middleware(request, response) {
  if (
    request.nextUrl?.pathname.startsWith("/signup") ||
    request.nextUrl?.pathname.startsWith("/login") ||
    request.nextUrl?.pathname.startsWith("/api/signup") ||
    request.nextUrl?.pathname.startsWith("/api//login")
  ) {
    if (request.cookies.has("accesstoken")) {
      const url = request.nextUrl.clone();
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }
  if (request.nextUrl?.pathname.startsWith("/profile") || request.nextUrl?.pathname.startsWith("/logout")) {
    if (request.cookies.has("accesstoken")) {
      return NextResponse.next();
    } else {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
  if (request.nextUrl?.pathname.startsWith("/profile")) {
    if (request.cookies.has("accesstoken")) {
      return NextResponse.next();
    } else {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
}
