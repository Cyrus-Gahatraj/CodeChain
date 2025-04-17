"use client";

import React from "react";
import "./button.css"
import { cn } from "@/lib/utils";

function Button({ text, handleClick, className }) {
  return (
    <button
      className={cn(
        "btn-primary",
        "rounded-full",
        "shadow-2xl/30",
        "bg-[#eb5e28]",
        "border-2",
        "border-[#eb5e28]",
        className
      )}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default Button;
