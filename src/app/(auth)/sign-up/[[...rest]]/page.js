"use client";

import { SignUp } from "@clerk/clerk-react";
import React from "react";

function page() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      <h1 className="relative bottom-5 text-2xl"> Join CodeChain Today </h1>
      <SignUp />
    </div>
  );
}

export default page;
