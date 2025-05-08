import { NextResponse } from "next/server";
import { createRouteMatcher, clerkMiddleware } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/questions(.*)",
  "/profile(.*)",
  "/profile/reviews(.*)",
  "/profile/bookmarks(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const path = req.nextUrl.pathname;

  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (userId && ["/", "/sign-in", "/sign-up"].includes(path)) {
    return NextResponse.redirect(new URL("/questions", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api/webhook/register|_next/static|_next/image|favicon.ico).*)",
  ],
};
