"use client";

import { SignIn } from "@clerk/nextjs";
import React from "react";
import clerkAppearance from "@/app/(auth)/clerkAppearance";

function SignInPage() {
  return (
    <div className="w-full flex-1 flex flex-col gap-2 items-center justify-center pb-30 min-h-screen bg-gradient-to-t from-stone-900 to-neutral-800">
      <h1 className="relative bottom-5 text-2xl font-medium text-white">
        Welcome back
      </h1>
      <SignIn
        appearance={clerkAppearance}
      />
    </div>
  );
}

export default SignInPage;
