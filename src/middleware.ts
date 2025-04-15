import { clerkMiddleware } from "@clerk/nextjs/server";

const isPublicRoute = (path: string) => {
  return ["/", "/sign-in", "/sign-up"].includes(path);
};

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const path = req.nextUrl.pathname;

  // Handle users who aren't authenticated
  if (!userId && !isPublicRoute(path)) {
    return Response.redirect(new URL("/sign-in", req.url));
  }

  // Handle users who are authenticated
  if (userId && isPublicRoute(path)) {
    return Response.redirect(new URL("/questions", req.url));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
