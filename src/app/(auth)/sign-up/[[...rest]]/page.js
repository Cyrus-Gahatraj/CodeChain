"use client";

import { SignUp } from "@clerk/nextjs";
import React from "react";
import clerkAppearance from "@/app/(auth)/clerkAppearance";

function SignUpPage() {
  return (
    <div className="w-full flex-1 flex flex-col gap-2 items-center justify-center pb-30 min-h-screen bg-gradient-to-t from-stone-900 to-neutral-800">
      <h1 className="relative bottom-5 text-2xl text-white">
        Create your account
      </h1>
      <SignUp
        appearance={clerkAppearance}
      />
    </div>
  );
}

export default SignUpPage;
